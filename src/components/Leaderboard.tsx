import { useState, useEffect } from 'react';
import { Trophy, Crown, TrendingUp, Award } from 'lucide-react';
import { web3Service } from '../lib/web3';
import { LeagueIcon } from './LeagueIcon';
import { LeaderboardBackground } from './LeaderboardBackground';

interface LeaderboardProps {
  currentPlayer: string;
}

export function Leaderboard({ currentPlayer }: LeaderboardProps) {
  const [topPlayers, setTopPlayers] = useState<any[]>([]);
  const [gameStats, setGameStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<number>(0);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const calculateLeagueByBattleScore = (battleScore: number): string => {
    if (battleScore < 5000) return 'Bronce';
    if (battleScore < 15000) return 'Plata';
    if (battleScore < 50000) return 'Oro';
    return 'Diamante';
  };

  const loadLeaderboard = async () => {
    try {
      const [addresses, powers, levels] = await web3Service.getTopPlayers(10);
      const stats = await web3Service.getGameStats();

      const playersData = await Promise.all(
        addresses.map(async (addr: string, idx: number) => {
          try {
            const profile = await web3Service.getPlayerProfile(addr);
            const battleScore = Number(profile.battleScore);
            const correctLeague = calculateLeagueByBattleScore(battleScore);

            return {
              address: addr,
              power: powers[idx],
              level: Number(levels[idx]),
              kingdomSize: Number(web3Service.formatTokenAmount(profile.kingdomSize)),
              league: correctLeague,
              winRate: Number(profile.winRate),
              battlesWon: Number(profile.battlesWon)
            };
          } catch {
            return null;
          }
        })
      );

      setTopPlayers(playersData.filter(p => p !== null));
      setGameStats({
        totalPlayers: Number(stats.totalPlayers),
        activePlayers: Number(stats.activePlayers),
        totalBattles: Number(stats.totalBattles),
        totalKingdomSize: Number(web3Service.formatTokenAmount(stats.totalKingdomSize)),
        strongestPlayer: stats.strongestPlayer,
        leagueCounts: stats.leagueCounts.map((c: bigint) => Number(c))
      });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPower = (power: bigint) => {
    return parseFloat(web3Service.formatTokenAmount(power)).toLocaleString();
  };

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'Bronce': return 'from-orange-800 to-orange-900';
      case 'Plata': return 'from-slate-400 to-slate-500';
      case 'Oro': return 'from-yellow-400 to-yellow-600';
      case 'Diamante': return 'from-cyan-400 to-blue-500';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 1) return <Award className="w-6 h-6 text-slate-400" />;
    if (rank === 2) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="text-slate-400 font-bold">#{rank + 1}</span>;
  };

  const leagues = ['All', 'Bronce', 'Plata', 'Oro', 'Diamante'];

  if (loading) {
    return (
      <div className="card-gradient rounded-2xl p-8">
        <p className="text-slate-400">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative card-gradient rounded-2xl p-8 overflow-hidden">
        <LeaderboardBackground />

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Leaderboard</h2>
            <p className="text-slate-400">The mightiest kingdoms in the realm</p>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-full">
            <img
              src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759453383307-e12ad95f0669ad09313bb62e4c10faf2.png"
              alt="Ranking"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {gameStats && (
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <p className="text-sm text-slate-400">Total Players</p>
              <p className="text-2xl font-bold text-blue-400">{gameStats.totalPlayers}</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <p className="text-sm text-slate-400">Active Players</p>
              <p className="text-2xl font-bold text-green-400">{gameStats.activePlayers}</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <p className="text-sm text-slate-400">Total Battles</p>
              <p className="text-2xl font-bold text-purple-400">{gameStats.totalBattles}</p>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <p className="text-sm text-slate-400">Kingdoms Size</p>
              <p className="text-2xl font-bold text-amber-400">{gameStats.totalKingdomSize}</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex gap-2 mb-6 overflow-x-auto pb-2">
          {leagues.map((league, idx) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(idx)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedLeague === idx
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx > 0 && <LeagueIcon league={league} className="w-12 h-12" />}
              <span>{league}</span>
              {gameStats && idx > 0 && (
                <span className="text-xs opacity-75">
                  ({gameStats.leagueCounts[idx - 1] || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {topPlayers
          .filter(player => selectedLeague === 0 || player.league === leagues[selectedLeague])
          .map((player, index) => (
            <div
              key={player.address}
              className={`card-gradient rounded-xl p-6 transition-all hover:scale-102 ${
                player.address.toLowerCase() === currentPlayer.toLowerCase()
                  ? 'ring-2 ring-amber-500'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-800 rounded-full">
                    {getRankIcon(index)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <p className="font-mono text-lg font-semibold text-slate-200">
                        {formatAddress(player.address)}
                      </p>
                      {player.address.toLowerCase() === currentPlayer.toLowerCase() && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded">
                          YOU
                        </span>
                      )}
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getLeagueColor(player.league)}`}>
                        <LeagueIcon league={player.league} className="w-12 h-12" />
                        <span>{player.league}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-slate-500">Power</p>
                        <p className="font-semibold text-amber-400">{formatPower(player.power)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Level</p>
                        <p className="font-semibold text-blue-400">{player.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Kingdom</p>
                        <p className="font-semibold text-green-400">{Math.floor(player.kingdomSize)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Win Rate</p>
                        <p className="font-semibold text-purple-400">{player.winRate}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-bold text-green-400">{player.battlesWon}</span>
                  <span className="text-sm text-slate-500">wins</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {topPlayers.length === 0 && (
        <div className="card-gradient rounded-xl p-12 text-center">
          <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No players in this league yet. Be the first to rise!</p>
        </div>
      )}
    </div>
  );
}
