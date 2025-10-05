import { useState, useEffect } from 'react';
import { Swords, Shield, Search, Zap, AlertTriangle } from 'lucide-react';
import { web3Service } from '../lib/web3';
import { useWeb3 } from '../contexts/Web3Context';
import { VictoryEffect, DefeatEffect } from './VictoryEffect';

interface BattleArenaProps {
  playerStats: any;
  onBattleComplete: () => void;
}

export function BattleArena({ playerStats, onBattleComplete }: BattleArenaProps) {
  const { account } = useWeb3();
  const [opponents, setOpponents] = useState<any[]>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [battleDetails, setBattleDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [battling, setBattling] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [victoryReward, setVictoryReward] = useState<string>('');
  const [showDefeat, setShowDefeat] = useState(false);
  const [defeatPenalty, setDefeatPenalty] = useState<string>('');

  const calculateLeagueByBattleScore = (battleScore: number): string => {
    if (battleScore < 5000) return 'Bronce';
    if (battleScore < 15000) return 'Plata';
    if (battleScore < 50000) return 'Oro';
    return 'Diamante';
  };

  const searchForOpponents = async () => {
    if (!account) {
      setMessage({ type: 'error', text: 'Please connect your wallet first' });
      return;
    }

    if (!canAttackNow()) {
      setMessage({ type: 'info', text: 'You are still in cooldown. Wait or reset cooldown to search for opponents.' });
      return;
    }

    setSearching(true);
    setMessage(null);
    setOpponents([]);

    try {
      console.log('🔍 Searching for opponents...');
      console.log('📍 Your address:', account);

      // Call the contract to find opponents
      const result = await web3Service.findFairOpponents(5);
      console.log('📦 Raw result from contract:', result);

      // Handle result format - could be array or object
      let addresses: string[] = [];
      let powers: bigint[] = [];

      if (Array.isArray(result)) {
        // Result is [addresses[], powers[]]
        addresses = result[0] || [];
        powers = result[1] || [];
      } else if (result && typeof result === 'object') {
        // Result might be an object with properties
        addresses = (result as any).addresses || (result as any)[0] || [];
        powers = (result as any).powers || (result as any)[1] || [];
      }

      console.log('📋 Parsed results:', {
        addressCount: addresses.length,
        powerCount: powers.length,
        addresses: addresses,
        powers: powers.map(p => p.toString())
      });

      if (!addresses || addresses.length === 0) {
        console.log('⚠️ No opponents returned from contract');
        setMessage({ type: 'info', text: 'No suitable opponents found. Try depositing more gold or try again later!' });
        return;
      }

      // Filter out your own address
      const filteredAddresses: string[] = [];
      const filteredPowers: bigint[] = [];

      for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].toLowerCase() !== account.toLowerCase()) {
          filteredAddresses.push(addresses[i]);
          filteredPowers.push(powers[i]);
        } else {
          console.log('⏭️ Skipping own address:', addresses[i]);
        }
      }

      console.log('🎯 Filtered opponents:', filteredAddresses.length);

      if (filteredAddresses.length === 0) {
        setMessage({ type: 'info', text: 'No other players available to battle. Invite friends or try again later!' });
        return;
      }

      // Load detailed info for each opponent
      const opponentsData = await Promise.all(
        filteredAddresses.map(async (addr: string, idx: number) => {
          try {
            console.log(`🔄 Loading opponent ${idx + 1}/${filteredAddresses.length}:`, addr);
            const profile = await web3Service.getPlayerProfile(addr);
            const battleScore = Number(profile.battleScore);
            const correctLeague = calculateLeagueByBattleScore(battleScore);

            const opponentData = {
              address: addr,
              power: filteredPowers[idx],
              level: Number(profile.level),
              kingdomSize: Number(web3Service.formatTokenAmount(profile.kingdomSize)),
              league: correctLeague,
              winRate: Number(profile.winRate),
              canAttack: profile.canBeAttacked
            };

            console.log(`✓ Opponent ${idx + 1} loaded:`, {
              address: addr,
              league: correctLeague,
              level: opponentData.level,
              power: filteredPowers[idx].toString(),
              canAttack: opponentData.canAttack
            });

            return opponentData;
          } catch (error) {
            console.error(`✗ Failed to load opponent ${addr}:`, error);
            return null;
          }
        })
      );

      const validOpponents = opponentsData.filter(o => o !== null);
      setOpponents(validOpponents);

      if (validOpponents.length === 0) {
        setMessage({ type: 'info', text: 'Could not load opponent details. Try again!' });
      } else {
        console.log(`✅ ${validOpponents.length} opponents ready for battle!`);
        setMessage({ type: 'success', text: `Found ${validOpponents.length} opponents! Select one to view battle details.` });
      }
    } catch (error: any) {
      console.error('❌ Search error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to find opponents. Please try again.' });
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (selectedOpponent && account) {
      loadBattleDetails();
    }
  }, [selectedOpponent, account]);

  const loadBattleDetails = async () => {
    if (!selectedOpponent || !account) return;

    try {
      console.log('📊 Loading battle details for:', selectedOpponent);
      const details = await web3Service.getBattleDetails(account, selectedOpponent);

      const battleInfo = {
        attackerPower: details.attackerPower,
        defenderPower: details.defenderPower,
        attackerLevel: Number(details.attackerLevel),
        defenderLevel: Number(details.defenderLevel),
        winProbability: Number(details.winProbability),
        canAttack: details.canAttack,
        isFairMatch: details.isFairMatch
      };

      console.log('📊 Battle details loaded:', {
        yourPower: battleInfo.attackerPower.toString(),
        opponentPower: battleInfo.defenderPower.toString(),
        winProbability: battleInfo.winProbability + '%',
        canAttack: battleInfo.canAttack,
        isFairMatch: battleInfo.isFairMatch
      });

      setBattleDetails(battleInfo);

      if (!battleInfo.canAttack) {
        setMessage({
          type: 'info',
          text: 'This opponent cannot be attacked right now. They may be protected or you may not meet requirements.'
        });
      }
    } catch (error) {
      console.error('❌ Error loading battle details:', error);
      setMessage({ type: 'error', text: 'Failed to load battle details. Please try again.' });
    }
  };

  const attack = async (defenderAddress: string) => {
    if (!account) {
      setMessage({ type: 'error', text: 'Please connect your wallet' });
      return;
    }

    if (!canAttackNow()) {
      setMessage({ type: 'error', text: 'You are still in cooldown period!' });
      return;
    }

    setBattling(true);
    setMessage(null);

    try {
      console.log('⚔️ Initiating attack on:', defenderAddress);
      const tx = await web3Service.attackPlayer(defenderAddress);
      console.log('📝 Transaction hash:', tx.hash);

      // Parse battle result from transaction logs
      const battleEvent = tx.logs.find((log: any) => {
        try {
          const parsed = web3Service.getContract().interface.parseLog(log);
          return parsed?.name === 'BattleResult';
        } catch {
          return false;
        }
      });

      if (!battleEvent) {
        console.error('⚠️ BattleResult event not found in transaction logs');
        setMessage({ type: 'error', text: 'Battle completed but result unclear. Please refresh.' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        onBattleComplete();
        return;
      }

      const parsed = web3Service.getContract().interface.parseLog(battleEvent);
      const won = parsed?.args?.attackerWon;
      const reward = parsed?.args?.battleReward;

      console.log('🎲 Battle Result:', {
        won,
        reward: reward?.toString(),
        timestamp: parsed?.args?.timestamp?.toString()
      });

      if (won) {
        const rewardAmount = web3Service.formatTokenAmount(reward);
        console.log('🏆 VICTORY! Reward:', rewardAmount);
        setVictoryReward(rewardAmount);
        setShowVictory(true);
        setMessage({
          type: 'success',
          text: `Victory! You claimed ${parseFloat(rewardAmount).toLocaleString()} tokens!`
        });
      } else {
        // Find penalty from BattlePenalty event
        const penaltyEvent = tx.logs.find((log: any) => {
          try {
            const parsed = web3Service.getContract().interface.parseLog(log);
            return parsed?.name === 'BattlePenalty';
          } catch {
            return false;
          }
        });

        let penaltyAmount = '0';
        if (penaltyEvent) {
          const parsedPenalty = web3Service.getContract().interface.parseLog(penaltyEvent);
          penaltyAmount = web3Service.formatTokenAmount(parsedPenalty?.args?.penalty || 0n);
          console.log('💀 DEFEAT! Penalty from event:', penaltyAmount);
        } else {
          // Fallback: calculate 0.1% penalty
          try {
            const userInfo = await web3Service.getContract().userInfo(account);
            penaltyAmount = web3Service.formatTokenAmount(userInfo.amount / 1000n);
            console.log('💀 DEFEAT! Calculated penalty:', penaltyAmount);
          } catch (err) {
            console.error('Failed to calculate penalty:', err);
            penaltyAmount = '0';
          }
        }

        setDefeatPenalty(penaltyAmount);
        setShowDefeat(true);
        setMessage({
          type: 'error',
          text: 'Defeat! Your attack was repelled. Strengthen your kingdom and try again!'
        });
      }

      // Wait for effects to display, then update
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('🔄 Updating player stats...');
      onBattleComplete();

      // Clear selection and search for new opponents
      setSelectedOpponent(null);
      setBattleDetails(null);

      // Wait a bit before searching again
      await new Promise(resolve => setTimeout(resolve, 1000));
      await searchForOpponents();

    } catch (error: any) {
      console.error('❌ Battle error:', error);

      let errorMessage = 'Battle failed. ';
      if (error.message?.includes('cooldown')) {
        errorMessage = 'You are still in cooldown period!';
      } else if (error.message?.includes('user rejected')) {
        errorMessage = 'Transaction cancelled by user.';
      } else if (error.message?.includes('insufficient')) {
        errorMessage = 'Insufficient balance or minimum stake not met (100 tokens required).';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setBattling(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPower = (power: bigint) => {
    return web3Service.formatTokenAmount(power);
  };

  const canAttackNow = () => {
    if (!playerStats) return false;
    const now = Math.floor(Date.now() / 1000);
    return playerStats.nextAttackTime <= now;
  };

  const resetCooldown = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await web3Service.resetCooldown();
      setMessage({ type: 'success', text: 'Cooldown reset! You can attack immediately.' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      onBattleComplete();
    } catch (error: any) {
      console.error('Reset cooldown error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to reset cooldown' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <VictoryEffect
        show={showVictory}
        onComplete={() => setShowVictory(false)}
        title="VICTORY!"
        subtitle={`+${parseFloat(victoryReward).toLocaleString()} Tokens Claimed`}
      />

      <DefeatEffect
        show={showDefeat}
        onComplete={() => setShowDefeat(false)}
        penalty={parseFloat(defeatPenalty).toLocaleString()}
      />

      <div className="relative card-gradient rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/161709/castle-france-architecture-baroque-161709.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Battle Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95"></div>
        </div>
        <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Battle Arena</h2>
            <p className="text-slate-400">Challenge opponents and raid their kingdoms for glory and rewards</p>
          </div>
          <div className="p-4 bg-red-500/10 rounded-full">
            <img
              src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759443102234-d2da677b14254fbd6572b17d225c416c.png"
              alt="Battle"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
            message.type === 'error' ? 'bg-red-500/20 border border-red-500/30' :
            'bg-blue-500/20 border border-blue-500/30'
          }`}>
            <p className={`${
              message.type === 'success' ? 'text-green-400' :
              message.type === 'error' ? 'text-red-400' :
              'text-blue-400'
            }`}>{message.text}</p>
          </div>
        )}

        <div className="space-y-3 relative z-10">
          <div className="flex gap-4">
            <button
              onClick={searchForOpponents}
              disabled={searching || !canAttackNow()}
              className="btn-primary flex items-center space-x-2 flex-1"
            >
              <Search className="w-5 h-5" />
              <span>{searching ? 'Searching for Opponents...' : 'Find Opponents'}</span>
            </button>

            {!canAttackNow() && (
              <button
                onClick={resetCooldown}
                disabled={loading}
                className="btn-secondary flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>{loading ? 'Resetting...' : 'Reset Cooldown (Cost Tokens)'}</span>
              </button>
            )}
          </div>

          {playerStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-xs text-slate-500">Your Level</p>
                <p className="text-sm font-semibold text-slate-200">{playerStats.level}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Your Power</p>
                <p className="text-sm font-semibold text-blue-400">{parseFloat(web3Service.formatTokenAmount(playerStats.power)).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Battle Score</p>
                <p className="text-sm font-semibold text-purple-400">{playerStats.battleScore?.toString() || '0'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Can Attack</p>
                <p className={`text-sm font-semibold ${canAttackNow() ? 'text-green-400' : 'text-red-400'}`}>
                  {canAttackNow() ? 'Ready' : 'Cooldown'}
                </p>
              </div>
            </div>
          )}
        </div>

        {!canAttackNow() && (
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <p className="text-amber-400 text-sm">You need to wait for the cooldown period to end before attacking again.</p>
          </div>
        )}
        </div>
      </div>

      {searching && (
        <div className="card-gradient rounded-xl p-8 text-center">
          <div className="animate-pulse space-y-4">
            <Search className="w-12 h-12 text-amber-400 mx-auto animate-spin" />
            <p className="text-slate-400">Searching the kingdom for worthy opponents...</p>
          </div>
        </div>
      )}

      {!searching && opponents.length === 0 && (
        <div className="card-gradient rounded-xl p-8 text-center">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">No opponents found yet</p>
          <p className="text-sm text-slate-500">Click "Find Opponents" to search for players to battle</p>
        </div>
      )}

      {opponents.length > 0 && (
        <div>
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm font-semibold">
              ⚔️ Found {opponents.length} opponent{opponents.length > 1 ? 's' : ''}! Click on a card to see battle details.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {opponents.map((opponent) => (
            <div
              key={opponent.address}
              className={`card-gradient rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedOpponent === opponent.address ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => setSelectedOpponent(opponent.address)}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500">Opponent</p>
                  <p className="font-mono text-lg text-amber-400">{formatAddress(opponent.address)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  opponent.league === 'Bronce' ? 'bg-orange-900/50 text-orange-400' :
                  opponent.league === 'Plata' ? 'bg-slate-600/50 text-slate-300' :
                  opponent.league === 'Oro' ? 'bg-yellow-600/50 text-yellow-400' :
                  'bg-cyan-600/50 text-cyan-400'
                }`}>
                  {opponent.league}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-500">Level</p>
                  <p className="text-xl font-bold text-slate-200">{opponent.level}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Win Rate</p>
                  <p className="text-xl font-bold text-slate-200">{opponent.winRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Power</p>
                  <p className="text-lg font-bold text-blue-400">{parseFloat(formatPower(opponent.power)).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Kingdom</p>
                  <p className="text-lg font-bold text-green-400">{Math.floor(opponent.kingdomSize)}</p>
                </div>
              </div>

              {selectedOpponent === opponent.address && battleDetails && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Win Probability</span>
                      <span className={`text-lg font-bold ${
                        battleDetails.winProbability >= 70 ? 'text-green-400' :
                        battleDetails.winProbability >= 50 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>{battleDetails.winProbability}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          battleDetails.winProbability >= 70 ? 'bg-gradient-to-r from-green-600 to-green-400' :
                          battleDetails.winProbability >= 50 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                          'bg-gradient-to-r from-red-600 to-red-400'
                        }`}
                        style={{ width: `${battleDetails.winProbability}%` }}
                      ></div>
                    </div>
                  </div>

                  {!battleDetails.canAttack && (
                    <div className="mb-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-sm text-red-400">
                      This opponent is currently protected or cannot be attacked
                    </div>
                  )}

                  {!battleDetails.isFairMatch && (
                    <div className="mb-3 p-2 bg-amber-500/20 border border-amber-500/30 rounded text-sm text-amber-400">
                      Warning: This is not a fair match. Proceed with caution!
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      attack(opponent.address);
                    }}
                    disabled={battling || !battleDetails.canAttack || !canAttackNow()}
                    className={`w-full flex items-center justify-center space-x-2 ${
                      battling || !battleDetails.canAttack || !canAttackNow()
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                  >
                    <img
                      src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759443477308-f5953e6d2089fb8f2ed461e64546754b.png"
                      alt="Attack"
                      className="w-5 h-5 object-contain"
                    />
                    <span>{battling ? 'Attacking...' : 'Launch Attack'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}
