import { Trophy, Swords, Target, Crown, Award, Timer } from 'lucide-react';
import { LeagueIcon } from './LeagueIcon';
import { LevelProgressBar } from './LevelProgressBar';

interface PlayerStatsProps {
  stats: any;
  loading: boolean;
}

export function PlayerStats({ stats, loading }: PlayerStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="stat-card animate-pulse">
            <div className="h-20 bg-slate-700/50 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'Bronce': return 'from-orange-800 to-orange-900';
      case 'Plata': return 'from-slate-400 to-slate-500';
      case 'Oro': return 'from-yellow-400 to-yellow-600';
      case 'Diamante': return 'from-cyan-400 to-blue-500';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getAvatarByLevel = (level: number) => {
    if (level >= 1 && level <= 20) {
      return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759451631514-8a96da91b66cc8b0c774f32598d69601.png';
    } else if (level >= 21 && level <= 50) {
      return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759451834426-363886d1a676982aba4cae98ede73e29.png';
    } else if (level >= 51 && level <= 80) {
      return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759452139396-85c6a18bd540874e07ad4cd15b5c5b63.png';
    } else if (level >= 81 && level <= 100) {
      return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759452350556-3cd0e38b337245ca742f64add3bdf7c8.png';
    }
    return 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759451631514-8a96da91b66cc8b0c774f32598d69601.png';
  };

  const calculateNextAttackTime = () => {
    const now = Math.floor(Date.now() / 1000);
    const cooldownEnd = stats.nextAttackTime;

    if (cooldownEnd <= now) {
      return 'Ready to Attack!';
    }

    const remaining = cooldownEnd - now;
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-6">
      <LevelProgressBar currentLevel={stats.level} battleScore={stats.battleScore} />

      <div className={`card-gradient rounded-2xl p-8 bg-gradient-to-r ${getLeagueColor(stats.league)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={getAvatarByLevel(stats.level)}
              alt={`Level ${stats.level} Avatar`}
              className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Level {stats.level}</h2>
              <div className="flex items-center space-x-2">
                <LeagueIcon league={stats.league} className="w-16 h-16" />
                <p className="text-xl text-white/80">{stats.league} League</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Crown className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-sm text-white/70">Battle Score</p>
            <p className="text-2xl font-bold text-white">{stats.battleScore}</p>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <p className="text-sm text-white/70">Kingdom Size</p>
            <p className="text-2xl font-bold text-white">{Math.floor(stats.kingdomSize)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Swords className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-3xl font-bold text-blue-400">{stats.totalBattles}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-300">Total Battles</h3>
          <p className="text-sm text-slate-500 mt-1">Battles fought in the arena</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-3xl font-bold text-green-400">{stats.battlesWon}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-300">Victories</h3>
          <p className="text-sm text-slate-500 mt-1">Battles won successfully</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-3xl font-bold text-purple-400">{stats.winRate}%</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-300">Win Rate</h3>
          <p className="text-sm text-slate-500 mt-1">Your success percentage</p>
        </div>

        <div className="stat-card lg:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Timer className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-300">Next Attack Available</h3>
                <p className="text-sm text-slate-500">Cooldown period for battles</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-400">{calculateNextAttackTime()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center space-x-2">
          <Award className="w-6 h-6" />
          <span>Your Journey</span>
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Current Level</span>
            <span className="font-bold text-amber-400">Level {stats.level}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">League Standing</span>
            <div className="flex items-center space-x-2">
              <LeagueIcon league={stats.league} className="w-12 h-12" />
              <span className={`font-bold bg-gradient-to-r ${getLeagueColor(stats.league)} bg-clip-text text-transparent`}>
                {stats.league}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Kingdom Territory</span>
            <span className="font-bold text-blue-400">{Math.floor(stats.kingdomSize)} Tiles</span>
          </div>
        </div>
      </div>
    </div>
  );
}
