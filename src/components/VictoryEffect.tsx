import { useEffect, useState } from 'react';
import { Crown, Sparkles, Trophy, Coins, Shield, Swords, X, Wallet } from 'lucide-react';

interface VictoryEffectProps {
  show: boolean;
  onComplete?: () => void;
  title?: string;
  subtitle?: string;
  duration?: number;
}

export function VictoryEffect({ show, onComplete, title = 'VICTORY!', subtitle, duration = 3000 }: VictoryEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; rotation: number }>>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Victory Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-amber-900/40 animate-pulse"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        >
          {particle.id % 4 === 0 && <Sparkles className="w-4 h-4 text-yellow-400 opacity-80" />}
          {particle.id % 4 === 1 && <Crown className="w-5 h-5 text-amber-400 opacity-70" />}
          {particle.id % 4 === 2 && <Coins className="w-4 h-4 text-yellow-300 opacity-75" />}
          {particle.id % 4 === 3 && <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full" />}
        </div>
      ))}

      <div className="relative z-10 text-center animate-victory-appear">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/20 via-yellow-500/30 to-amber-600/20 blur-xl animate-pulse"></div>

          <div className="relative bg-gradient-to-b from-amber-900/90 via-yellow-900/80 to-amber-900/90 border-4 border-amber-500/50 rounded-2xl px-12 py-8 shadow-2xl">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl animate-pulse"></div>
                <Crown className="w-16 h-16 text-yellow-400 relative animate-bounce-slow" />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 mb-2 animate-text-shimmer medieval-text">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl text-amber-200 font-semibold tracking-wide">
                {subtitle}
              </p>
            )}

            <div className="flex items-center justify-center space-x-2 mt-4">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex justify-center space-x-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-12 bg-gradient-to-t from-amber-600 to-yellow-400 rounded-full animate-victory-bars"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-500/20 to-transparent animate-pulse"></div>
    </div>
  );
}

interface SuccessEffectProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
  icon?: React.ReactNode;
}

export function SuccessEffect({ show, onComplete, message = 'Success!', icon }: SuccessEffectProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-success-appear">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/30 blur-2xl animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-green-900/95 to-emerald-900/95 border-2 border-green-500/50 rounded-xl px-8 py-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            {icon || <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />}
            <div>
              <p className="text-2xl font-bold text-green-300">{message}</p>
              <div className="flex space-x-1 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DefeatEffectProps {
  show: boolean;
  onComplete?: () => void;
  penalty?: string;
  duration?: number;
}

export function DefeatEffect({ show, onComplete, penalty, duration = 3000 }: DefeatEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; rotation: number }>>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 30,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-red-900/30 to-slate-900/40 animate-pulse"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-sink-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        >
          {particle.id % 5 === 0 && <X className="w-3 h-3 text-red-500 opacity-60" />}
          {particle.id % 5 === 1 && <Shield className="w-4 h-4 text-slate-500 opacity-50" />}
          {particle.id % 5 === 2 && <div className="w-2 h-2 bg-slate-600 rounded-full opacity-70" />}
          {particle.id % 5 === 3 && <div className="w-1 h-3 bg-red-800 opacity-60" />}
          {particle.id % 5 === 4 && <div className="w-2 h-2 bg-gradient-to-br from-slate-700 to-slate-900 rounded-sm" />}
        </div>
      ))}

      <div className="relative z-10 text-center animate-defeat-appear">
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-900/20 via-slate-800/30 to-red-900/20 blur-xl animate-pulse"></div>

          <div className="relative bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 border-4 border-red-900/50 rounded-2xl px-12 py-8 shadow-2xl animate-shake-slow">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="relative animate-broken-shield">
                <div className="absolute inset-0 bg-red-800 blur-xl opacity-50"></div>
                <div className="relative flex items-center space-x-2">
                  <Shield className="w-12 h-12 text-slate-600 opacity-70" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <X className="w-16 h-16 text-red-600 animate-pulse" strokeWidth={3} />
                  </div>
                  <Swords className="w-12 h-12 text-slate-600 opacity-70" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
              <div className="w-8 h-1 bg-red-900"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 mb-2 defeat-text-shadow medieval-text opacity-90">
              DEFEAT
            </h1>

            {penalty && (
              <p className="text-xl text-red-400 font-semibold tracking-wide opacity-80">
                -{penalty} Tokens Lost
              </p>
            )}

            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-red-900 rounded-full animate-pulse opacity-60"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm font-semibold tracking-wide">
              Your attack was repelled...
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-center space-x-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-8 bg-gradient-to-t from-slate-700 to-slate-600 rounded-full animate-defeat-bars opacity-70"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/10 to-transparent"></div>
    </div>
  );
}

interface RewardEffectProps {
  show: boolean;
  onComplete?: () => void;
  amount: string;
  duration?: number;
}

export function RewardEffect({ show, onComplete, amount, duration = 2500 }: RewardEffectProps) {
  const [coins, setCoins] = useState<Array<{ id: number; x: number; y: number; delay: number; rotation: number; size: number }>>([]);

  useEffect(() => {
    if (show) {
      const newCoins = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: 40 + Math.random() * 20,
        y: -10 + Math.random() * 20,
        delay: Math.random() * 0.8,
        rotation: Math.random() * 360,
        size: 0.7 + Math.random() * 0.6
      }));
      setCoins(newCoins);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-amber-900/20"></div>

      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-coin-collect"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            animationDelay: `${coin.delay}s`,
            transform: `rotate(${coin.rotation}deg) scale(${coin.size})`
          }}
        >
          {coin.id % 3 === 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-md opacity-60"></div>
              <Coins className="w-6 h-6 text-yellow-400 relative" />
            </div>
          )}
          {coin.id % 3 === 1 && (
            <div className="w-5 h-5 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-200"></div>
          )}
          {coin.id % 3 === 2 && (
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-sm opacity-50"></div>
              <Sparkles className="w-4 h-4 text-amber-300 relative" />
            </div>
          )}
        </div>
      ))}

      <div className="relative z-10 text-center animate-reward-appear">
        <div className="relative inline-block">
          <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/20 via-amber-400/30 to-yellow-500/20 blur-2xl animate-pulse-glow"></div>

          <div className="relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-chest-open">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-60 animate-pulse"></div>
                <Wallet className="w-20 h-20 text-amber-500 relative drop-shadow-2xl" strokeWidth={1.5} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Sparkles className="w-10 h-10 text-yellow-300 animate-spin-slow" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/95 via-yellow-900/90 to-amber-900/95 border-4 border-yellow-500/60 rounded-2xl px-16 py-10 shadow-2xl mt-6">
              <div className="flex items-center justify-center space-x-4 mb-3">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <Trophy className="w-6 h-6 text-amber-400 animate-bounce-slow" />
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>

              <div className="relative">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2 tracking-wider">
                  REWARD CLAIMED
                </h2>
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 animate-pulse"></div>
              </div>

              <div className="relative mt-2">
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 animate-text-shimmer medieval-text">
                  +{parseFloat(amount).toLocaleString()}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 blur-2xl opacity-20"></div>
              </div>

              <p className="text-lg text-amber-300 font-semibold mt-2 tracking-wide">
                Tokens
              </p>

              <div className="flex justify-center space-x-1 mt-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              <Coins className="w-5 h-5 text-yellow-400 animate-bounce" style={{ animationDelay: '0s' }} />
              <Coins className="w-5 h-5 text-amber-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <Coins className="w-5 h-5 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/40 via-amber-500/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
}
