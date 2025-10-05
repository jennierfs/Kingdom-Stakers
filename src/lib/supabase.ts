import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getTutorialProgress(walletAddress: string) {
  const { data, error } = await supabase
    .from('tutorial_progress')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching tutorial progress:', error);
    return null;
  }

  return data;
}

export async function saveTutorialProgress(walletAddress: string, completed: boolean, skipped: boolean) {
  const { data, error } = await supabase
    .from('tutorial_progress')
    .upsert({
      wallet_address: walletAddress.toLowerCase(),
      completed,
      skipped,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'wallet_address'
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving tutorial progress:', error);
    throw error;
  }

  return data;
}

export async function getBattleHistory(playerAddress: string) {
  const { data, error } = await supabase
    .from('battle_history')
    .select('*')
    .eq('player_address', playerAddress.toLowerCase())
    .order('battle_timestamp', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching battle history:', error);
    return [];
  }

  return data || [];
}

export async function saveBattleHistory(battle: {
  player_address: string;
  opponent_address: string;
  is_attacker: boolean;
  won_battle: boolean;
  battle_reward: number;
  block_number: number;
  transaction_hash: string;
  battle_timestamp: string;
}) {
  const { data, error } = await supabase
    .from('battle_history')
    .upsert({
      player_address: battle.player_address.toLowerCase(),
      opponent_address: battle.opponent_address.toLowerCase(),
      is_attacker: battle.is_attacker,
      won_battle: battle.won_battle,
      battle_reward: battle.battle_reward,
      block_number: battle.block_number,
      transaction_hash: battle.transaction_hash,
      battle_timestamp: battle.battle_timestamp
    }, {
      onConflict: 'transaction_hash'
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving battle history:', error);
    throw error;
  }

  return data;
}
