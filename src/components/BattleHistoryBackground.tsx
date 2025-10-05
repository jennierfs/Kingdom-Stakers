export function BattleHistoryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-950/20 to-slate-900"></div>

      <div className="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="paper-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="#1e293b"/>
              <path d="M10 10 L90 10 M10 30 L90 30 M10 50 L90 50 M10 70 L90 70 M10 90 L90 90"
                    stroke="#475569" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paper-texture)"/>
        </svg>
      </div>

      <div className="absolute top-8 left-8 opacity-20">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <rect x="10" y="10" width="100" height="80" rx="4" fill="#78350f" opacity="0.6"/>
          <rect x="15" y="15" width="90" height="70" rx="2" fill="#fef3c7" opacity="0.3"/>

          <path d="M25 30 L50 25 L75 35 L95 30" stroke="#dc2626" strokeWidth="2" fill="none"/>
          <circle cx="25" cy="30" r="3" fill="#dc2626"/>
          <circle cx="50" cy="25" r="3" fill="#dc2626"/>
          <circle cx="75" cy="35" r="3" fill="#dc2626"/>
          <circle cx="95" cy="30" r="3" fill="#dc2626"/>

          <line x1="25" y1="30" x2="50" y2="25" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
          <line x1="50" y1="25" x2="75" y2="35" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
          <line x1="75" y1="35" x2="95" y2="30" stroke="#dc2626" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
        </svg>
      </div>

      <div className="absolute top-8 right-8 opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" rx="3" fill="#78350f" opacity="0.6"/>
          <rect x="15" y="15" width="70" height="70" rx="2" fill="#fef3c7" opacity="0.3"/>

          <text x="30" y="35" fontSize="12" fill="#dc2626" opacity="0.8">W: 12</text>
          <text x="30" y="50" fontSize="12" fill="#6b7280" opacity="0.8">L: 5</text>
          <text x="30" y="65" fontSize="10" fill="#f59e0b" opacity="0.8">71% WR</text>
        </svg>
      </div>

      <div className="absolute bottom-8 left-8 opacity-15">
        <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
          <rect x="10" y="10" width="130" height="100" rx="4" fill="#78350f" opacity="0.5"/>
          <rect x="15" y="15" width="120" height="90" rx="2" fill="#fef3c7" opacity="0.2"/>

          <circle cx="40" cy="40" r="15" stroke="#dc2626" strokeWidth="2" fill="none"/>
          <circle cx="75" cy="40" r="12" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
          <circle cx="110" cy="40" r="10" stroke="#dc2626" strokeWidth="1" fill="none"/>

          <line x1="55" y1="40" x2="63" y2="40" stroke="#dc2626" strokeWidth="1.5"/>
          <line x1="87" y1="40" x2="100" y2="40" stroke="#dc2626" strokeWidth="1.5"/>

          <path d="M30 70 L50 65 L70 75 L90 60 L110 70" stroke="#f59e0b" strokeWidth="2" fill="none"/>
          <circle cx="30" cy="70" r="2" fill="#f59e0b"/>
          <circle cx="50" cy="65" r="2" fill="#f59e0b"/>
          <circle cx="70" cy="75" r="2" fill="#f59e0b"/>
          <circle cx="90" cy="60" r="2" fill="#f59e0b"/>
          <circle cx="110" cy="70" r="2" fill="#f59e0b"/>
        </svg>
      </div>

      <div className="absolute top-1/3 right-12 opacity-15">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <rect x="10" y="10" width="80" height="100" rx="3" fill="#78350f" opacity="0.5"/>
          <rect x="15" y="15" width="70" height="90" rx="2" fill="#fef3c7" opacity="0.2"/>

          <line x1="25" y1="30" x2="75" y2="30" stroke="#dc2626" strokeWidth="1"/>
          <line x1="25" y1="45" x2="75" y2="45" stroke="#dc2626" strokeWidth="1"/>
          <line x1="25" y1="60" x2="75" y2="60" stroke="#dc2626" strokeWidth="1"/>
          <line x1="25" y1="75" x2="75" y2="75" stroke="#dc2626" strokeWidth="1"/>
          <line x1="25" y1="90" x2="75" y2="90" stroke="#dc2626" strokeWidth="1"/>

          <circle cx="25" cy="30" r="2" fill="#ef4444"/>
          <circle cx="25" cy="45" r="2" fill="#f59e0b"/>
          <circle cx="25" cy="60" r="2" fill="#ef4444"/>
          <circle cx="25" cy="75" r="2" fill="#f59e0b"/>
          <circle cx="25" cy="90" r="2" fill="#ef4444"/>
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-1/4 opacity-12">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="10" y="10" width="60" height="60" rx="2" fill="#78350f" opacity="0.6"/>
          <rect x="15" y="15" width="50" height="50" rx="1" fill="#fef3c7" opacity="0.3"/>

          <rect x="22" y="45" width="8" height="15" fill="#dc2626"/>
          <rect x="36" y="40" width="8" height="20" fill="#ef4444"/>
          <rect x="50" y="35" width="8" height="25" fill="#dc2626"/>
        </svg>
      </div>

      <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
      <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
      <div className="absolute bottom-1/3 left-1/3 w-px h-28 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>

      {[1, 2, 3, 4, 5].map((num, i) => (
        <div
          key={num}
          className="absolute"
          style={{
            top: `${20 + i * 15}%`,
            left: `${15 + i * 18}%`,
            width: '2px',
            height: '2px',
          }}
        >
          <div className="w-full h-full bg-red-500 rounded-full opacity-40"></div>
          {i < 4 && (
            <div
              className="absolute top-1/2 left-1/2 w-16 h-px bg-red-500/30"
              style={{
                transform: `rotate(${30 + i * 20}deg)`,
                transformOrigin: 'left center'
              }}
            ></div>
          )}
        </div>
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wood-grain" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#1e293b"/>
            <path d="M0 20 Q20 18 40 20 T80 20 M0 40 Q20 38 40 40 T80 40 M0 60 Q20 58 40 60 T80 60"
                  stroke="#78350f" strokeWidth="1" fill="none" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wood-grain)"/>
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
        <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
          <rect x="50" y="30" width="200" height="140" rx="8" stroke="#dc2626" strokeWidth="2" fill="none"/>
          <rect x="55" y="35" width="190" height="130" rx="6" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.5"/>

          <line x1="70" y1="80" x2="230" y2="80" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,4"/>
          <line x1="70" y1="120" x2="230" y2="120" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,4"/>

          <circle cx="100" cy="80" r="8" stroke="#dc2626" strokeWidth="2" fill="none"/>
          <circle cx="150" cy="80" r="8" stroke="#dc2626" strokeWidth="2" fill="none"/>
          <circle cx="200" cy="80" r="8" stroke="#dc2626" strokeWidth="2" fill="none"/>

          <circle cx="125" cy="120" r="6" stroke="#f59e0b" strokeWidth="2" fill="none"/>
          <circle cx="175" cy="120" r="6" stroke="#f59e0b" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="absolute top-12 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
      <div className="absolute top-24 right-1/4 w-1 h-1 bg-red-300 rounded-full animate-pulse shadow-lg shadow-red-400/50" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-500/50" style={{ animationDelay: '1s' }}></div>

      <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-red-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-orange-500/8 rounded-full blur-3xl"></div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/50"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_50%)]"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] border border-red-500/15 rounded-lg"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] border border-orange-500/10 rounded-lg"></div>
    </div>
  );
}
