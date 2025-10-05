import { useState } from 'react';
import { BookOpen, Sword, Trophy, Coins, Shield, ChevronDown, ChevronUp, Target } from 'lucide-react';

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const guides = [
    {
      id: 'getting-started',
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Getting Started',
      color: 'blue',
      steps: [
        {
          title: 'Connect Your Wallet',
          description: 'Click "Connect Wallet" and select MetaMask. Make sure you\'re connected to the Core DAO network.',
        },
        {
          title: 'Get KINGSTAKE Tokens',
          description: 'You need KINGSTAKE tokens to play. Purchase them or receive them from the faucet.',
        },
        {
          title: 'Start Your Journey',
          description: 'Once you have tokens, you\'re ready to stake and battle!',
        },
      ],
    },
    {
      id: 'staking',
      icon: <Coins className="w-5 h-5" />,
      title: 'Staking Guide',
      color: 'amber',
      steps: [
        {
          title: 'Choose Amount',
          description: 'Decide how many KINGSTAKE tokens you want to stake. More tokens = higher power.',
        },
        {
          title: 'Lock Your Tokens',
          description: 'Click "Stake" to lock your tokens in the pool. You\'ll earn rewards over time.',
        },
        {
          title: 'Claim Rewards',
          description: 'Return anytime to claim your earned rewards. Your power increases as you stake more.',
        },
        {
          title: 'Unstake Anytime',
          description: 'You can withdraw your tokens at any time, but your battle power will decrease.',
        },
      ],
    },
    {
      id: 'battles',
      icon: <Sword className="w-5 h-5" />,
      title: 'Battle System',
      color: 'red',
      steps: [
        {
          title: 'Build Your Power',
          description: 'Your battle power comes from staked tokens. More stake = more power in battles.',
        },
        {
          title: 'Choose Opponents',
          description: 'Select an opponent from the available players. Check their power level first!',
        },
        {
          title: 'Battle Mechanics',
          description: 'Battles are calculated based on your power vs opponent power. Higher power = better chance to win.',
        },
        {
          title: 'Win Rewards',
          description: 'Victories earn you experience points (XP), levels, and improve your league ranking.',
        },
      ],
    },
    {
      id: 'leagues',
      icon: <Trophy className="w-5 h-5" />,
      title: 'League System',
      color: 'purple',
      steps: [
        {
          title: 'Bronze League',
          description: 'Start here as a new player. Level 1-9. Focus on gaining experience and building power.',
        },
        {
          title: 'Silver League',
          description: 'Reach level 10 to advance. Level 10-19. Tougher competition and better rewards.',
        },
        {
          title: 'Gold League',
          description: 'Elite players only. Level 20+. Battle against the strongest kingdoms for glory.',
        },
        {
          title: 'Climb the Ranks',
          description: 'Win battles to gain XP and level up. Higher leagues = more prestige and competition.',
        },
      ],
    },
    {
      id: 'strategy',
      icon: <Target className="w-5 h-5" />,
      title: 'Strategy Tips',
      color: 'green',
      steps: [
        {
          title: 'Balance Risk & Reward',
          description: 'Choose battles wisely. Fighting stronger opponents gives more XP but has higher risk.',
        },
        {
          title: 'Grow Steadily',
          description: 'Don\'t rush to unstake. Keeping tokens staked builds your power for future battles.',
        },
        {
          title: 'Timing Matters',
          description: 'Claim rewards regularly but consider keeping them staked to maintain high power.',
        },
        {
          title: 'Watch the Leaderboard',
          description: 'Study top players to learn winning strategies and adapt your approach.',
        },
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'from-blue-600/20 to-blue-800/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      hover: 'hover:border-blue-500/50',
    },
    amber: {
      bg: 'from-amber-600/20 to-amber-800/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      hover: 'hover:border-amber-500/50',
    },
    red: {
      bg: 'from-red-600/20 to-red-800/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      hover: 'hover:border-red-500/50',
    },
    purple: {
      bg: 'from-purple-600/20 to-purple-800/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      hover: 'hover:border-purple-500/50',
    },
    green: {
      bg: 'from-green-600/20 to-green-800/20',
      border: 'border-green-500/30',
      text: 'text-green-400',
      hover: 'hover:border-green-500/50',
    },
  };

  return (
    <footer className="bg-slate-950/80 backdrop-blur-md border-t border-amber-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-slate-200">How to Play Kingdom Stakers</h2>
            </div>
            <p className="text-slate-400">Complete beginner's guide to staking, battling, and conquering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {guides.map((guide) => {
              const colors = colorClasses[guide.color as keyof typeof colorClasses];
              const isOpen = openSection === guide.id;

              return (
                <div key={guide.id} className="flex flex-col">
                  <button
                    onClick={() => toggleSection(guide.id)}
                    className={`bg-gradient-to-br ${colors.bg} rounded-xl p-4 border ${colors.border} ${colors.hover} transition-all w-full text-left flex items-center justify-between`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={colors.text}>{guide.icon}</div>
                      <h3 className={`text-lg font-bold ${colors.text}`}>{guide.title}</h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className={`w-5 h-5 ${colors.text}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="bg-slate-900/50 rounded-b-xl border border-t-0 border-slate-700 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      {guide.steps.map((step, index) => (
                        <div key={index} className="flex space-x-3">
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} font-bold text-sm`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-slate-200 font-semibold mb-1">{step.title}</h4>
                            <p className="text-slate-400 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="text-center">
            <p className="text-slate-400">
              Kingdom Stakers - Built on Core DAO Blockchain
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Stake. Battle. Conquer.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <a
                href="https://scan.coredao.org/address/0x1f542818391d9888f40346fD9e9b7C5D975DbD1c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                View Contract
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://coredao.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Core DAO Network
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
