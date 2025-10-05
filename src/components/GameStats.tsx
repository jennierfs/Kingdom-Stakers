import { useState, useEffect } from 'react';
import { Users, Swords, Castle, TrendingUp } from 'lucide-react';
import { web3Service } from '../lib/web3';

export function GameStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const gameStats = await web3Service.getGameStats();
      setStats({
        totalPlayers: Number(gameStats.totalPlayers),
        activePlayers: Number(gameStats.activePlayers),
        totalBattles: Number(gameStats.totalBattles),
        totalKingdomSize: Number(web3Service.formatTokenAmount(gameStats.totalKingdomSize))
      });
    } catch (error) {
      console.error('Error loading game stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-gradient rounded-xl p-6 animate-pulse">
                <div className="h-20 bg-slate-700/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-amber-400 mb-2">Live Game Statistics</h3>
          <p className="text-slate-400">Real-time data from the blockchain</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card-gradient rounded-xl p-6 text-center hover:scale-105 transition-transform">
            <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-3">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400 mb-1">{stats.totalPlayers}</p>
            <p className="text-sm text-slate-400">Total Players</p>
            <p className="text-xs text-green-400 mt-1">{stats.activePlayers} Active</p>
          </div>

          <div className="card-gradient rounded-xl p-6 text-center hover:scale-105 transition-transform">
            <div className="inline-block p-3 bg-red-500/10 rounded-full mb-3">
              <Swords className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400 mb-1">{stats.totalBattles.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Epic Battles</p>
            <p className="text-xs text-slate-500 mt-1">Fought</p>
          </div>

          <div className="card-gradient rounded-xl p-6 text-center hover:scale-105 transition-transform">
            <div className="inline-block p-3 bg-purple-500/10 rounded-full mb-3">
              <Castle className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400 mb-1">{stats.totalKingdomSize.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Kingdom Size</p>
            <p className="text-xs text-slate-500 mt-1">Total Tiles</p>
          </div>

          <div className="card-gradient rounded-xl p-6 text-center hover:scale-105 transition-transform">
            <div className="inline-block p-3 bg-amber-500/10 rounded-full mb-3">
              <TrendingUp className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-amber-400 mb-1">
              {stats.totalBattles > 0 ? ((stats.activePlayers / stats.totalPlayers) * 100).toFixed(0) : '0'}%
            </p>
            <p className="text-sm text-slate-400">Activity Rate</p>
            <p className="text-xs text-slate-500 mt-1">Player Engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
