import { useState } from 'react';
import { Castle, TrendingUp, Coins, AlertCircle } from 'lucide-react';
import { web3Service } from '../lib/web3';
import { SuccessEffect } from './VictoryEffect';

interface KingdomManagerProps {
  playerStats: any;
  onUpdate: () => void;
}

export function KingdomManager({ playerStats, onUpdate }: KingdomManagerProps) {
  const [expanding, setExpanding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const expandKingdom = async () => {
    setExpanding(true);
    setMessage(null);
    try {
      const cost = calculateExpansionCostBigInt();
      const balance = playerStats.power;

      if (balance < cost) {
        setMessage({
          type: 'error',
          text: `Insufficient balance! You need ${Number(cost) / 1e18} tokens but only have ${Number(balance) / 1e18} staked.`
        });
        setExpanding(false);
        return;
      }

      const tx = await web3Service.expandKingdom();
      await tx.wait();
      setShowSuccess(true);
      setMessage({ type: 'success', text: 'Kingdom expanded successfully! Your territory grows stronger!' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate();
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUpdate();
    } catch (error: any) {
      console.error('Expansion error:', error);
      let errorMessage = 'Failed to expand kingdom. ';

      if (error.code === 'CALL_EXCEPTION') {
        errorMessage += 'Insufficient staked tokens for expansion.';
      } else if (error.message?.includes('user rejected')) {
        errorMessage = 'Transaction cancelled by user.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setExpanding(false);
    }
  };

  const calculateExpansionCost = () => {
    if (!playerStats) return '0';
    const kingdomSize = Math.floor(playerStats.kingdomSize);
    const cost = (kingdomSize + 1) * 5;
    console.log('KingdomManager - calculateExpansionCost:', {
      kingdomSize,
      cost,
      rawKingdomSize: playerStats.kingdomSize,
      formula: `(${kingdomSize} + 1) * 5 = ${cost}`
    });
    return cost.toFixed(0);
  };

  const calculateExpansionCostBigInt = () => {
    if (!playerStats) return BigInt(0);
    const kingdomSize = Math.floor(playerStats.kingdomSize);
    const cost = BigInt(kingdomSize + 1) * BigInt(5) * BigInt(10 ** 18);
    console.log('KingdomManager - calculateExpansionCostBigInt:', {
      kingdomSize,
      cost: cost.toString(),
      rawKingdomSize: playerStats.kingdomSize,
      costInTokens: (kingdomSize + 1) * 5
    });
    return cost;
  };

  if (!playerStats) {
    return (
      <div className="card-gradient rounded-2xl p-8">
        <p className="text-slate-400">Loading kingdom data...</p>
      </div>
    );
  }

  const kingdomLevel = Math.floor(playerStats.kingdomSize / 10) + 1;

  const getKingdomImage = () => {
    const size = Math.floor(playerStats.kingdomSize);
    if (size >= 40) return "https://photos.pinksale.finance/file/pinksale-logo-upload/1759539229717-023f1e36b112e38a45dfaf357d7e5502.png";
    if (size >= 20) return "https://photos.pinksale.finance/file/pinksale-logo-upload/1759539198190-e3eb88d07e4394f3be91206272c621b7.png";
    if (size >= 10) return "https://photos.pinksale.finance/file/pinksale-logo-upload/1759539043312-d439379904627bb909c0dfa6dc7ab41e.png";
    return "https://photos.pinksale.finance/file/pinksale-logo-upload/1759539007359-ba3ad5fd4475573bfe1f4816687c045b.png";
  };

  const getKingdomName = () => {
    const size = Math.floor(playerStats.kingdomSize);
    if (size >= 40) return "Epic Kingdom";
    if (size >= 20) return "Large Kingdom";
    if (size >= 10) return "Medium Kingdom";
    return "Small Kingdom";
  };

  return (
    <div className="space-y-6">
      <SuccessEffect
        show={showSuccess}
        onComplete={() => setShowSuccess(false)}
        message="Kingdom Expanded!"
        icon={<Castle className="w-8 h-8 text-green-400 animate-pulse" />}
      />

      <div className="relative card-gradient rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Kingdom Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/95"></div>
        </div>
        <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">{getKingdomName()}</h2>
            <p className="text-slate-400">Expand your territory to increase your power and influence</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-full">
            <img
              src={getKingdomImage()}
              alt="Kingdom"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
            'bg-red-500/20 border border-red-500/30'
          }`}>
            <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <Castle className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">{Math.floor(playerStats.kingdomSize)}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Territory Size</h3>
            <p className="text-sm text-slate-400 mt-1">Total tiles controlled</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-purple-400">{kingdomLevel}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Kingdom Level</h3>
            <p className="text-sm text-slate-400 mt-1">Based on territory size</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <Coins className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-bold text-amber-400">{calculateExpansionCost()}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Expansion Cost</h3>
            <p className="text-sm text-slate-400 mt-1">Tokens required to expand</p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-200 mb-4">Kingdom Benefits</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <p className="text-slate-300 font-semibold">Increased Power</p>
                <p className="text-sm text-slate-400">Larger kingdoms have more influence in battles</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <p className="text-slate-300 font-semibold">Better Rewards</p>
                <p className="text-sm text-slate-400">Earn more from victories with a larger kingdom</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <p className="text-slate-300 font-semibold">League Advancement</p>
                <p className="text-sm text-slate-400">Kingdom size contributes to your overall level</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <p className="text-slate-300 font-semibold">Defensive Strength</p>
                <p className="text-sm text-slate-400">Larger kingdoms are harder to defeat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-400 font-semibold mb-1">How Kingdom Size Works</p>
            <div className="text-sm text-amber-300 space-y-2">
              <p><strong>Automatic:</strong> You get 1 Kingdom Size per 1,000 tokens staked (auto-calculated)</p>
              <p><strong>Manual Expansion:</strong> You can buy additional Kingdom Size for (current + 1) × 5 tokens</p>
              <p className="text-amber-200">⚠️ Manual expansion burns tokens permanently, removing them from circulation!</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-800/50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-400">Your Staked Balance</p>
              <p className="text-xl font-bold text-slate-200">{(Number(playerStats.power) / 1e18).toFixed(2)} Tokens</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Required</p>
              <p className="text-xl font-bold text-amber-400">{calculateExpansionCost()} Tokens</p>
            </div>
          </div>

          <button
            onClick={expandKingdom}
            disabled={expanding || (Number(playerStats.power) < Number(calculateExpansionCostBigInt()))}
            className={`w-full flex items-center justify-center space-x-2 text-lg py-4 rounded-xl font-bold transition-all ${
              expanding || (Number(playerStats.power) < Number(calculateExpansionCostBigInt()))
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            <Castle className="w-6 h-6" />
            <span>{expanding ? 'Expanding Kingdom...' : `Expand Kingdom (${calculateExpansionCost()} Tokens)`}</span>
          </button>
        </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4">Kingdom Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-300">Progress to Kingdom Level {kingdomLevel + 1}</span>
              <span className="text-amber-400 font-semibold">
                {Math.floor(playerStats.kingdomSize) % 10}/10 tiles
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-4 rounded-full transition-all"
                style={{ width: `${(Math.floor(playerStats.kingdomSize) % 10) * 10}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-1">Total Expansions</p>
              <p className="text-2xl font-bold text-slate-200">{Math.floor(playerStats.kingdomSize)}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-1">Kingdom Rank</p>
              <p className="text-2xl font-bold text-slate-200">Level {kingdomLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
