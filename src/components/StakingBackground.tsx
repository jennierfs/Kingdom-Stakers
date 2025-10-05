export function StakingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 opacity-20">
          <div className="w-full h-full border-4 border-emerald-500 rounded-lg transform rotate-45"></div>
          <div className="absolute inset-2 border-2 border-amber-500 rounded-lg"></div>
        </div>

        <div className="absolute top-20 right-16 w-16 h-16 opacity-20">
          <div className="w-full h-full border-4 border-amber-500 rounded-lg transform rotate-12"></div>
        </div>

        <div className="absolute bottom-20 left-20 w-24 h-24 opacity-20">
          <div className="w-full h-full border-4 border-emerald-500 rounded-lg transform -rotate-12"></div>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

      <svg className="absolute inset-0 w-full h-full opacity-12" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vault-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vault-grid)" />
      </svg>

      <div className="absolute top-8 right-8 opacity-25">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="#10b981" strokeWidth="2"/>
          <circle cx="30" cy="30" r="22" stroke="#f59e0b" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="16" stroke="#10b981" strokeWidth="1"/>
          <path d="M30 14 L30 46 M14 30 L46 30" stroke="#f59e0b" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="4" fill="#10b981"/>
        </svg>
      </div>

      <div className="absolute bottom-8 left-8 opacity-25">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="10" y="20" width="60" height="50" rx="4" stroke="#10b981" strokeWidth="2" fill="none"/>
          <rect x="15" y="25" width="50" height="40" rx="2" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
          <circle cx="40" cy="45" r="12" stroke="#10b981" strokeWidth="2" fill="none"/>
          <circle cx="40" cy="45" r="8" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
          <path d="M40 10 L40 20 M40 70 L40 80" stroke="#10b981" strokeWidth="2"/>
        </svg>
      </div>

      <div className="absolute top-1/2 left-12 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mb-1 flex items-center space-x-1"
            style={{ transform: `translateY(${i * 8}px)` }}
          >
            <div className="w-8 h-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-sm border border-amber-500"></div>
            <div className="w-8 h-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-sm border border-amber-500"></div>
            <div className="w-8 h-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-sm border border-amber-500"></div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 right-12 opacity-20">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="mb-1 flex items-center space-x-1"
            style={{ transform: `translateY(${i * 10}px)` }}
          >
            <div className="w-10 h-8 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-sm border border-emerald-600"></div>
            <div className="w-10 h-8 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-sm border border-emerald-600"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>

      <div className="absolute top-1/4 left-1/4">
        <svg width="200" height="150" viewBox="0 0 200 150" fill="none" className="opacity-15">
          <circle cx="30" cy="30" r="3" fill="#10b981"/>
          <circle cx="80" cy="30" r="3" fill="#10b981"/>
          <circle cx="130" cy="30" r="3" fill="#10b981"/>
          <circle cx="170" cy="30" r="3" fill="#f59e0b"/>

          <circle cx="30" cy="70" r="3" fill="#10b981"/>
          <circle cx="80" cy="70" r="3" fill="#f59e0b"/>
          <circle cx="130" cy="70" r="3" fill="#10b981"/>
          <circle cx="170" cy="70" r="3" fill="#10b981"/>

          <circle cx="30" cy="110" r="3" fill="#f59e0b"/>
          <circle cx="80" cy="110" r="3" fill="#10b981"/>
          <circle cx="130" cy="110" r="3" fill="#10b981"/>
          <circle cx="170" cy="110" r="3" fill="#10b981"/>

          <line x1="30" y1="30" x2="80" y2="30" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="80" y1="30" x2="130" y2="30" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="130" y1="30" x2="170" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>

          <line x1="30" y1="30" x2="30" y2="70" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="80" y1="30" x2="80" y2="70" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="130" y1="30" x2="130" y2="70" stroke="#10b981" strokeWidth="1" opacity="0.5"/>

          <line x1="30" y1="70" x2="80" y2="70" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="80" y1="70" x2="130" y2="70" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>

          <line x1="80" y1="70" x2="80" y2="110" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
          <line x1="130" y1="70" x2="130" y2="110" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
        </svg>
      </div>

      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute bottom-24 right-1/4 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/50"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)]"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-emerald-500/20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-amber-500/15 rounded-full"></div>
    </div>
  );
}
