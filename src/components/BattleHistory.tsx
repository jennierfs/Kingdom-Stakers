import { Clock, Trophy, Skull, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BattleHistoryBackground } from './BattleHistoryBackground';
import { useWeb3 } from '../contexts/Web3Context';
import { useRealtimeBattles } from '../hooks/useRealtimeBattles';

interface BattleRecord {
  id: number;
  timestamp: string;
  opponent: string;
  result: 'victory' | 'defeat';
  powerChange: number;
  tokensChange: number;
  myPower: number;
  opponentPower: number;
}

interface BattleHistoryProps {
  battles?: BattleRecord[];
}

export function BattleHistory({ battles = [] }: BattleHistoryProps) {
  const { account, isConnected } = useWeb3();
  const { battles: realtimeBattles, loading } = useRealtimeBattles(account);

  const battleRecords: BattleRecord[] = realtimeBattles.map((battle, index) => {
    const isAttacker = battle.attacker_address.toLowerCase() === account?.toLowerCase();
    const wonBattle = isAttacker ? battle.attacker_won : !battle.attacker_won;
    const opponent = isAttacker ? battle.defender_address : battle.attacker_address;
    const myPower = isAttacker ? Number(battle.attacker_power) : Number(battle.defender_power);
    const opponentPower = isAttacker ? Number(battle.defender_power) : Number(battle.attacker_power);
    const rewardAmount = Number(battle.battle_reward);

    return {
      id: index,
      timestamp: battle.timestamp,
      opponent,
      result: wonBattle ? 'victory' : 'defeat',
      powerChange: wonBattle ? 100 : -50,
      tokensChange: wonBattle ? rewardAmount : -rewardAmount,
      myPower,
      opponentPower
    };
  });
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const displayBattles = battleRecords.length > 0 ? battleRecords : battles;

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const totalBattles = displayBattles.length;
  const victories = displayBattles.filter(b => b.result === 'victory').length;
  const winRate = totalBattles > 0 ? Math.round((victories / totalBattles) * 100) : 0;

  return (
    <div className="relative card-gradient rounded-2xl p-8 overflow-hidden">
      <BattleHistoryBackground />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Battle History</h2>
            <p className="text-slate-400">Your conquest record and battle statistics</p>
          </div>
          <div className="p-4 bg-red-500/10 rounded-full">
            <Clock className="w-10 h-10 text-red-400" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Total Battles</h3>
            <p className="text-3xl font-bold text-blue-400">{totalBattles}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Victories</h3>
            <p className="text-3xl font-bold text-green-400">{victories}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-8 h-8 text-amber-400" />
              <TrendingUp className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Win Rate</h3>
            <p className="text-3xl font-bold text-amber-400">{winRate}%</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Loading battle history...</p>
          </div>
        )}

        <div className="space-y-3">
          {!loading && displayBattles.map((battle) => (
            <div
              key={battle.id}
              className={`rounded-xl p-6 border transition-all hover:scale-[1.02] ${
                battle.result === 'victory'
                  ? 'bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-500/30'
                  : 'bg-gradient-to-r from-red-900/30 to-red-800/20 border-red-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    battle.result === 'victory' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {battle.result === 'victory' ? (
                      <Trophy className="w-6 h-6 text-green-400" />
                    ) : (
                      <Skull className="w-6 h-6 text-red-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`text-lg font-bold ${
                        battle.result === 'victory' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {battle.result === 'victory' ? 'VICTORY' : 'DEFEAT'}
                      </span>
                      <span className="text-slate-400 text-sm">vs</span>
                      <span className="text-amber-400 font-mono text-sm">{formatAddress(battle.opponent)}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(battle.timestamp)}</span>
                      </span>
                      <span>Power: {battle.myPower} vs {battle.opponentPower}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`flex items-center justify-end space-x-2 mb-2 ${
                    battle.powerChange > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {battle.powerChange > 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-bold">
                      {battle.powerChange > 0 ? '+' : ''}{battle.powerChange} Power
                    </span>
                  </div>
                  <div className={`text-sm font-semibold ${
                    battle.tokensChange > 0 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {battle.tokensChange > 0 ? '+' : ''}{battle.tokensChange} Tokens
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && displayBattles.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No battles recorded yet</p>
            <p className="text-slate-500 text-sm mt-2">Start attacking opponents to build your battle history!</p>
          </div>
        )}
      </div>
    </div>
  );
}
