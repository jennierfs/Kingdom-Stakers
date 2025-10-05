import { Swords, Shield, Trophy, TrendingUp } from 'lucide-react';
import { GameInfo } from './GameInfo';
import { useWeb3 } from '../contexts/Web3Context';

export function Hero() {
  const { connect, isConnecting } = useWeb3();

  const handleStartJourney = () => {
    connect();
  };

  const handleViewLeaderboard = () => {
    const leaderboardSection = document.getElementById('leaderboard');
    if (leaderboardSection) {
      leaderboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Medieval Kingdom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 text-glow">
            Forge Your Empire
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Stake Bugs Bunny tokens, build your kingdom, and battle for glory in the ultimate blockchain RPG strategy game
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleStartJourney}
              disabled={isConnecting}
              className="btn-primary text-lg px-8 py-4"
            >
              {isConnecting ? 'Connecting...' : 'Start Your Journey'}
            </button>
            <button
              onClick={handleViewLeaderboard}
              className="btn-secondary text-lg px-8 py-4"
            >
              View Leaderboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card text-center group">
            <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-4 group-hover:bg-amber-500/20 transition-colors">
              <Swords className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Epic Battles</h3>
            <p className="text-slate-400">Challenge players and raid their kingdoms for rewards</p>
          </div>

          <div className="stat-card text-center group">
            <div className="inline-block p-4 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Build Kingdom</h3>
            <p className="text-slate-400">Expand your territory and strengthen your defenses</p>
          </div>

          <div className="stat-card text-center group">
            <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-2">Climb Leagues</h3>
            <p className="text-slate-400">Rise from Bronze to Diamond league for greater rewards</p>
          </div>

          <div className="stat-card text-center group">
            <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4 group-hover:bg-green-500/20 transition-colors">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">Earn Rewards</h3>
            <p className="text-slate-400">Stake tokens and earn passive rewards while you play</p>
          </div>
        </div>
      </div>
    </section>
    <GameInfo />
    </>
  );
}
