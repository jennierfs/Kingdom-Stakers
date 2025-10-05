import { TokenIcon } from './TokenIcon';
import { Coins, Sparkles, Zap } from 'lucide-react';

export function TokenShowcase() {
  return (
    <div className="card-gradient rounded-2xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-400 mb-2">Bugs Bunny Token</h2>
        <p className="text-slate-400">The official currency of the Kingdom</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/20 rounded-xl p-8 border border-amber-500/30">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Bugs Bunny Token</h3>
              <p className="text-sm text-slate-400">Used for staking, battles, and kingdom expansion</p>
            </div>
            <div className="flex justify-center mb-4">
              <TokenIcon size={200} />
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Stake tokens to earn passive rewards</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Use in battles to raid other kingdoms</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Burn tokens to expand your territory</span>
              </div>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Climb leagues for higher rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">Size Variations</h3>
        <div className="flex items-end justify-center gap-8 p-8 bg-slate-900/50 rounded-xl">
          <div className="text-center">
            <TokenIcon size={32} />
            <p className="text-xs text-slate-400 mt-2">32px</p>
          </div>
          <div className="text-center">
            <TokenIcon size={48} />
            <p className="text-xs text-slate-400 mt-2">48px</p>
          </div>
          <div className="text-center">
            <TokenIcon size={64} />
            <p className="text-xs text-slate-400 mt-2">64px</p>
          </div>
          <div className="text-center">
            <TokenIcon size={96} />
            <p className="text-xs text-slate-400 mt-2">96px</p>
          </div>
          <div className="text-center">
            <TokenIcon size={128} />
            <p className="text-xs text-slate-400 mt-2">128px</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">Token Animations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <TokenIcon size={80} className="token-spin" />
            </div>
            <h4 className="font-bold text-slate-200 mb-2">Spin Animation</h4>
            <p className="text-sm text-slate-400">Continuous rotation</p>
            <code className="text-xs text-amber-400 mt-2 block">token-spin</code>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <TokenIcon size={80} className="token-bounce" />
            </div>
            <h4 className="font-bold text-slate-200 mb-2">Bounce Animation</h4>
            <p className="text-sm text-slate-400">Bouncing coin effect</p>
            <code className="text-xs text-amber-400 mt-2 block">token-bounce</code>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <TokenIcon size={80} className="animate-pulse" />
            </div>
            <h4 className="font-bold text-slate-200 mb-2">Pulse Animation</h4>
            <p className="text-sm text-slate-400">Glowing pulse effect</p>
            <code className="text-xs text-amber-400 mt-2 block">animate-pulse</code>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-amber-900/20 to-amber-950/20 rounded-xl border border-amber-500/20">
        <div className="flex items-start space-x-4">
          <Coins className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-2">About Bugs Bunny Token</h4>
            <p className="text-slate-300 leading-relaxed">
              Bugs Bunny is the official game token used throughout Kingdom Stakers. Players stake Bugs Bunny tokens to participate
              in battles, expand their kingdoms, and earn rewards. The token features a unique design that represents
              both medieval power and modern blockchain technology. All Bugs Bunny token transactions are secured on the Core DAO
              blockchain, ensuring transparency and security for all players.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400 mb-1">5 Sizes</div>
          <div className="text-sm text-slate-400">32px to 128px</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400 mb-1">Optimized</div>
          <div className="text-sm text-slate-400">High Quality</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400 mb-1">Scalable</div>
          <div className="text-sm text-slate-400">Any Device</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400 mb-1">Animated</div>
          <div className="text-sm text-slate-400">Multiple Styles</div>
        </div>
      </div>
    </div>
  );
}
