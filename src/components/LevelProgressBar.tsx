import { Swords, Crown } from 'lucide-react';

interface LevelProgressBarProps {
  currentLevel: number;
  battleScore: number;
}

export function LevelProgressBar({ currentLevel, battleScore }: LevelProgressBarProps) {
  const getLevelThreshold = (level: number) => {
    return level * 1000;
  };

  const currentThreshold = getLevelThreshold(currentLevel);
  const nextThreshold = getLevelThreshold(currentLevel + 1);

  const progressInLevel = battleScore - currentThreshold;
  const requiredForNext = nextThreshold - currentThreshold;
  const progressPercentage = Math.min((progressInLevel / requiredForNext) * 100, 100);

  console.log('=== Level Progress Debug ===');
  console.log('Current Level:', currentLevel);
  console.log('Battle Score:', battleScore);
  console.log('Current Threshold:', currentThreshold);
  console.log('Next Threshold:', nextThreshold);
  console.log('Progress in Level:', progressInLevel);
  console.log('Required for Next:', requiredForNext);
  console.log('Progress Percentage:', progressPercentage.toFixed(2) + '%');
  console.log('=== End Level Progress Debug ===');

  return (
    <div className="relative">
      <div className="relative bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-900/40 rounded-2xl p-8 border-4 border-amber-700/50 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="relative">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-amber-300 mb-2 tracking-wider uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Level Progress
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
              <Crown className="w-5 h-5 text-amber-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
          </div>

          <div className="relative mb-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-900/60 to-purple-800/60 px-4 py-2 rounded-lg border-2 border-purple-600/50 shadow-lg">
                <Swords className="w-5 h-5 text-purple-300" />
                <span className="font-bold text-white text-lg">Level {currentLevel}</span>
              </div>

              <div className="text-center flex-1 px-4">
                <p className="text-amber-200 font-semibold text-sm mb-1">Battle Score</p>
                <p className="text-2xl font-bold text-amber-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {battleScore.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-600/60 to-amber-500/60 px-4 py-2 rounded-lg border-2 border-amber-400/50 shadow-lg">
                <Crown className="w-5 h-5 text-amber-200" />
                <span className="font-bold text-white text-lg">Level {currentLevel + 1}</span>
              </div>
            </div>

            <div className="relative h-10 bg-gradient-to-b from-slate-900 to-slate-800 rounded-full border-4 border-amber-800/50 shadow-inner overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div
                className="h-full bg-gradient-to-r from-purple-600 via-amber-500 to-amber-400 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s infinite'
                     }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              </div>

              {progressPercentage > 0 && (
                <div
                  className="absolute top-0 bottom-0 flex items-center transition-all duration-1000"
                  style={{ left: `${Math.min(progressPercentage, 95)}%` }}
                >
                  <Swords className="w-6 h-6 text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }} />
                </div>
              )}

              {progressPercentage >= 95 && (
                <div className="absolute right-2 top-0 bottom-0 flex items-center">
                  <Crown className="w-6 h-6 text-amber-300 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 1))' }} />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span className="text-purple-300 font-semibold">{currentThreshold.toLocaleString()}</span>
              <span className="text-amber-200 font-semibold">
                {progressInLevel.toLocaleString()} / {requiredForNext.toLocaleString()}
              </span>
              <span className="text-amber-300 font-semibold">{nextThreshold.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-amber-200/80 italic">
              {progressPercentage >= 100
                ? "🎉 Ready to Level Up! Continue your journey to advance!"
                : `${(100 - progressPercentage).toFixed(1)}% remaining to next level`}
            </p>
          </div>
        </div>

        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-4 border-t-4 border-amber-600/70" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-r-4 border-t-4 border-amber-600/70" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-4 border-b-4 border-amber-600/70" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-4 border-b-4 border-amber-600/70" />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
