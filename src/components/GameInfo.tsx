import { Shield, Swords, Crown, Coins, Users, TrendingUp } from 'lucide-react';

export function GameInfo() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-400 mb-4">How It Works</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Master the art of staking, building, and conquering to become the ultimate ruler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-blue-500/10 rounded-full mb-6 group-hover:bg-blue-500/20 transition-colors">
              <Coins className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400 mb-3">1. Stake Bugs Bunny</h3>
            <p className="text-slate-400 leading-relaxed">
              Connect your wallet and stake Bugs Bunny tokens to join the game. Your stake determines your kingdom's power and unlocks battle capabilities.
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-green-500/10 rounded-full mb-6 group-hover:bg-green-500/20 transition-colors">
              <Shield className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-3">2. Build Kingdom</h3>
            <p className="text-slate-400 leading-relaxed">
              Expand your territory by investing Bugs Bunny tokens. A larger kingdom increases your defensive strength and battle rewards.
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-red-500/10 rounded-full mb-6 group-hover:bg-red-500/20 transition-colors">
              <Swords className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-3">3. Battle Players</h3>
            <p className="text-slate-400 leading-relaxed">
              Challenge opponents in your league. Win battles to claim rewards and increase your kingdom's power and reputation.
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Users className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-3">4. Join Leagues</h3>
            <p className="text-slate-400 leading-relaxed">
              Progress through Bronze, Silver, Gold, and Diamond leagues. Higher leagues offer better rewards and face stronger opponents.
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-6 group-hover:bg-amber-500/20 transition-colors">
              <TrendingUp className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-amber-400 mb-3">5. Level Up</h3>
            <p className="text-slate-400 leading-relaxed">
              Gain experience through battles and kingdom growth. Higher levels unlock strategic advantages and increase win probability.
            </p>
          </div>

          <div className="card-gradient rounded-xl p-8 text-center group hover:scale-105 transition-all">
            <div className="inline-block p-4 bg-cyan-500/10 rounded-full mb-6 group-hover:bg-cyan-500/20 transition-colors">
              <Crown className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">6. Earn Rewards</h3>
            <p className="text-slate-400 leading-relaxed">
              Collect staking rewards, battle spoils, and league bonuses. The strongest kingdoms earn the greatest treasures.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="card-gradient rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center text-amber-400 mb-6">Game Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Fair Matchmaking</p>
                  <p className="text-sm text-slate-400">Only battle players in your league with similar power levels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Protected Stakes</p>
                  <p className="text-sm text-slate-400">Defenders keep 80% of their stake even after defeat</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Strategic Cooldowns</p>
                  <p className="text-sm text-slate-400">4-hour cooldown between attacks encourages thoughtful gameplay</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Blockchain Secured</p>
                  <p className="text-sm text-slate-400">All actions verified on Core DAO blockchain</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Dynamic Scoring</p>
                  <p className="text-sm text-slate-400">Battle scores adjust based on wins, losses, and opponent strength</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-200">Token Burns</p>
                  <p className="text-sm text-slate-400">Kingdom expansions permanently remove Bugs Bunny tokens from circulation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
