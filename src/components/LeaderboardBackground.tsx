export function LeaderboardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900"></div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent"></div>
        <svg className="absolute top-0 left-1/2 transform -translate-x-1/2" width="200" height="80" viewBox="0 0 200 80" fill="none">
          <path d="M20 80 L100 20 L180 80" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.15"/>
          <path d="M40 80 L100 35 L160 80" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.1"/>
          <circle cx="100" cy="25" r="15" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.2"/>
          <circle cx="100" cy="25" r="10" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.15"/>
        </svg>
      </div>

      <div className="absolute top-12 left-8 opacity-20">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
          <rect x="10" y="40" width="40" height="30" rx="2" fill="#f59e0b"/>
          <rect x="15" y="45" width="30" height="20" rx="1" fill="#fbbf24"/>
          <circle cx="30" cy="55" r="8" fill="#f59e0b"/>
          <path d="M30 47 L30 30 L20 20 L40 20 L30 30" fill="#fbbf24"/>
          <circle cx="30" cy="55" r="3" fill="#fef3c7"/>
        </svg>
      </div>

      <div className="absolute top-12 right-8 opacity-20">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
          <rect x="10" y="40" width="40" height="30" rx="2" fill="#f59e0b"/>
          <rect x="15" y="45" width="30" height="20" rx="1" fill="#fbbf24"/>
          <circle cx="30" cy="55" r="8" fill="#f59e0b"/>
          <path d="M30 47 L30 30 L20 20 L40 20 L30 30" fill="#fbbf24"/>
          <circle cx="30" cy="55" r="3" fill="#fef3c7"/>
        </svg>
      </div>

      <div className="absolute top-1/3 left-12 opacity-15">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <rect x="30" y="60" width="40" height="60" rx="2" fill="url(#marble-gradient-1)"/>
          <rect x="35" y="55" width="30" height="10" fill="#9ca3af"/>
          <rect x="25" y="115" width="50" height="5" fill="#6b7280"/>
          <defs>
            <linearGradient id="marble-gradient-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e5e7eb"/>
              <stop offset="50%" stopColor="#d1d5db"/>
              <stop offset="100%" stopColor="#9ca3af"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-1/3 right-12 opacity-15">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <rect x="30" y="60" width="40" height="60" rx="2" fill="url(#marble-gradient-2)"/>
          <rect x="35" y="55" width="30" height="10" fill="#9ca3af"/>
          <rect x="25" y="115" width="50" height="5" fill="#6b7280"/>
          <defs>
            <linearGradient id="marble-gradient-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e5e7eb"/>
              <stop offset="50%" stopColor="#d1d5db"/>
              <stop offset="100%" stopColor="#9ca3af"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-1/4 opacity-25">
        <svg width="150" height="180" viewBox="0 0 150 180" fill="none">
          <rect x="50" y="80" width="50" height="100" rx="3" fill="url(#marble-gradient-center)"/>
          <rect x="45" y="75" width="60" height="10" fill="#d1d5db"/>
          <rect x="40" y="175" width="70" height="5" fill="#9ca3af"/>

          <rect x="60" y="90" width="30" height="40" fill="#f59e0b" opacity="0.3"/>
          <circle cx="75" cy="110" r="12" fill="#fbbf24" opacity="0.4"/>

          <defs>
            <linearGradient id="marble-gradient-center" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3f4f6"/>
              <stop offset="50%" stopColor="#e5e7eb"/>
              <stop offset="100%" stopColor="#d1d5db"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {[1, 2, 3].map((num, i) => (
        <div
          key={num}
          className="absolute animate-float-slow opacity-10"
          style={{
            top: `${30 + i * 15}%`,
            left: `${15 + i * 25}%`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          <div className="text-6xl font-bold text-amber-400/30" style={{
            textShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
            fontFamily: 'Georgia, serif'
          }}>
            #{num}
          </div>
        </div>
      ))}

      <div className="absolute top-20 left-1/3 w-1 h-32 bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent blur-sm"></div>
      <div className="absolute top-20 right-1/3 w-1 h-32 bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent blur-sm"></div>

      <div className="absolute top-16 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
      <div className="absolute top-24 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-pulse shadow-lg shadow-amber-400/50" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-32 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>

      <div className="absolute bottom-12 left-8 opacity-20">
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
          <rect x="10" y="15" width="80" height="20" rx="2" fill="#f59e0b" opacity="0.3"/>
          <path d="M15 25 L30 15 L40 20 L50 12 L60 18 L70 10 L85 20" stroke="#fbbf24" strokeWidth="2" fill="none"/>
          <circle cx="30" cy="15" r="2" fill="#fef3c7"/>
          <circle cx="50" cy="12" r="2" fill="#fef3c7"/>
          <circle cx="70" cy="10" r="2" fill="#fef3c7"/>
        </svg>
      </div>

      <div className="absolute bottom-12 right-8 opacity-20">
        <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
          <rect x="10" y="15" width="80" height="20" rx="2" fill="#f59e0b" opacity="0.3"/>
          <rect x="20" y="10" width="8" height="20" fill="#fbbf24"/>
          <rect x="35" y="15" width="8" height="15" fill="#fbbf24"/>
          <rect x="50" y="8" width="8" height="22" fill="#f59e0b"/>
          <rect x="65" y="12" width="8" height="18" fill="#fbbf24"/>
          <rect x="80" y="18" width="8" height="12" fill="#fbbf24"/>
        </svg>
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-8" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="marble-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#d1d5db" strokeWidth="1"/>
            <circle cx="30" cy="30" r="3" fill="#9ca3af" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#marble-pattern)" />
      </svg>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/60"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.12),transparent_50%)]"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] border-2 border-amber-500/15 rounded-lg"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] border border-yellow-500/10 rounded-lg"></div>
    </div>
  );
}
