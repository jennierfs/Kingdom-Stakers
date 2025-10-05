import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import { ethers } from "npm:ethers@6.13.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CONTRACT_ABI = [
  "event BattleResult(address indexed attacker, address indexed defender, bool attackerWon, uint256 battleReward, uint256 timestamp)",
  "event BattleDetailsUpdated(address indexed attacker, address indexed defender, uint256 attackerLevel, uint256 defenderLevel, uint256 attackerPower, uint256 defenderPower, bool attackerWon, uint256 reward, uint256 timestamp)",
  "event PlayerStatsUpdated(address indexed player, uint256 level, uint256 totalBattles, uint256 battlesWon, uint256 kingdomSize, uint256 battleScore, uint256 winRate, uint256 timestamp)",
  "event LeaguePromotion(address indexed player, string oldLeague, string newLeague, uint256 newLeagueId, uint256 timestamp)"
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, contractAddress, rpcUrl, fromBlock, toBlock } = await req.json();

    if (action === "sync") {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

      const { data: syncStatus } = await supabase
        .from("contract_sync_status")
        .select("*")
        .eq("contract_address", contractAddress)
        .maybeSingle();

      let startBlock = syncStatus?.last_synced_block || fromBlock || 0;
      const endBlock = toBlock || await provider.getBlockNumber();

      const { error: updateError } = await supabase
        .from("contract_sync_status")
        .upsert({
          contract_address: contractAddress,
          is_syncing: true,
          last_sync_time: new Date().toISOString()
        });

      const CHUNK_SIZE = 1000;
      let processedEvents = 0;

      for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += CHUNK_SIZE) {
        const chunkEnd = Math.min(currentBlock + CHUNK_SIZE - 1, endBlock);

        const battleDetailsFilter = contract.filters.BattleDetailsUpdated();
        const battleDetailsEvents = await contract.queryFilter(
          battleDetailsFilter,
          currentBlock,
          chunkEnd
        );

        for (const event of battleDetailsEvents) {
          const args = event.args!;
          const block = await event.getBlock();

          const battleData = {
            attacker_address: args.attacker.toLowerCase(),
            defender_address: args.defender.toLowerCase(),
            attacker_won: args.attackerWon,
            battle_reward: args.reward.toString(),
            attacker_power: args.attackerPower.toString(),
            defender_power: args.defenderPower.toString(),
            attacker_level: Number(args.attackerLevel),
            defender_level: Number(args.defenderLevel),
            transaction_hash: event.transactionHash,
            block_number: event.blockNumber,
            timestamp: new Date(block.timestamp * 1000).toISOString()
          };

          const { error: battleError } = await supabase
            .from("battles")
            .upsert(battleData, { onConflict: "transaction_hash" });

          if (!battleError) {
            const attackerEvent = {
              player_address: battleData.attacker_address,
              event_type: args.attackerWon ? "battle_won" : "battle_lost",
              event_data: {
                opponent: battleData.defender_address,
                reward: battleData.battle_reward,
                isAttacker: true
              }
            };

            const defenderEvent = {
              player_address: battleData.defender_address,
              event_type: args.attackerWon ? "battle_lost" : "battle_won",
              event_data: {
                opponent: battleData.attacker_address,
                reward: battleData.battle_reward,
                isAttacker: false
              }
            };

            await supabase.from("player_events").insert([attackerEvent, defenderEvent]);
          }

          processedEvents++;
        }

        const playerStatsFilter = contract.filters.PlayerStatsUpdated();
        const playerStatsEvents = await contract.queryFilter(
          playerStatsFilter,
          currentBlock,
          chunkEnd
        );

        for (const event of playerStatsEvents) {
          const args = event.args!;

          const statsData = {
            player_address: args.player.toLowerCase(),
            player_level: Number(args.level),
            total_battles: Number(args.totalBattles),
            battles_won: Number(args.battlesWon),
            kingdom_size: Number(args.kingdomSize),
            battle_score: Number(args.battleScore),
            win_rate: Number(args.winRate),
            updated_at: new Date().toISOString()
          };

          await supabase
            .from("player_stats_cache")
            .upsert(statsData, { onConflict: "player_address" });
        }

        const leaguePromotionFilter = contract.filters.LeaguePromotion();
        const leaguePromotionEvents = await contract.queryFilter(
          leaguePromotionFilter,
          currentBlock,
          chunkEnd
        );

        for (const event of leaguePromotionEvents) {
          const args = event.args!;

          const eventData = {
            player_address: args.player.toLowerCase(),
            event_type: "league_promotion",
            event_data: {
              oldLeague: args.oldLeague,
              newLeague: args.newLeague,
              leagueId: Number(args.newLeagueId)
            }
          };

          await supabase.from("player_events").insert(eventData);
        }
      }

      await supabase
        .from("contract_sync_status")
        .upsert({
          contract_address: contractAddress,
          last_synced_block: endBlock,
          last_sync_time: new Date().toISOString(),
          is_syncing: false
        });

      return new Response(
        JSON.stringify({
          success: true,
          processedEvents,
          syncedBlocks: endBlock - startBlock,
          message: `Synced ${processedEvents} events from block ${startBlock} to ${endBlock}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "listen") {
      const provider = new ethers.WebSocketProvider(rpcUrl);
      const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

      contract.on("BattleDetailsUpdated", async (
        attacker,
        defender,
        attackerLevel,
        defenderLevel,
        attackerPower,
        defenderPower,
        attackerWon,
        reward,
        timestamp,
        event
      ) => {
        const block = await event.getBlock();

        const battleData = {
          attacker_address: attacker.toLowerCase(),
          defender_address: defender.toLowerCase(),
          attacker_won: attackerWon,
          battle_reward: reward.toString(),
          attacker_power: attackerPower.toString(),
          defender_power: defenderPower.toString(),
          attacker_level: Number(attackerLevel),
          defender_level: Number(defenderLevel),
          transaction_hash: event.transactionHash,
          block_number: event.blockNumber,
          timestamp: new Date(block.timestamp * 1000).toISOString()
        };

        await supabase.from("battles").insert(battleData);
      });

      return new Response(
        JSON.stringify({ success: true, message: "Listening for events..." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'sync' or 'listen'" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
