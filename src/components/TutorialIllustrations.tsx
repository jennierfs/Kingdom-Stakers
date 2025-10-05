import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TutorialIllustrationsProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function TutorialIllustrations({ onComplete, onSkip }: TutorialIllustrationsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorials = [
    {
      title: "Welcome to Kingdom Stakers!",
      description: "Learn the basics of building your empire and conquering opponents",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-lg"></div>
          <svg className="w-48 h-48" viewBox="0 0 200 200">
            <rect x="70" y="80" width="60" height="80" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
            <polygon points="100,40 60,80 140,80" fill="#DC2626" stroke="#991B1B" strokeWidth="2"/>
            <rect x="85" y="110" width="15" height="25" fill="#654321"/>
            <rect x="115" y="110" width="15" height="25" fill="#FCD34D"/>
            <circle cx="100" cy="30" r="8" fill="#FCD34D" className="animate-pulse"/>
            <text x="100" y="180" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="bold">Your Kingdom</text>
          </svg>
        </div>
      )
    },
    {
      title: "Step 1: Deposit Bugs Bunny",
      description: "Stake your Bugs Bunny tokens in the castle vault to begin your journey and earn passive rewards",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg">
          <svg className="w-64 h-64" viewBox="0 0 250 250">
            <rect x="80" y="100" width="90" height="100" fill="#1F2937" stroke="#374151" strokeWidth="3" rx="5"/>
            <rect x="100" y="120" width="50" height="40" fill="#4B5563" stroke="#6B7280" strokeWidth="2" rx="3"/>
            <circle cx="125" cy="140" r="8" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
            <g className="animate-bounce" style={{ animationDuration: '2s' }}>
              <circle cx="125" cy="60" r="15" fill="#10B981" stroke="#059669" strokeWidth="2"/>
              <text x="125" y="67" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">$</text>
              <path d="M125 75 L125 95" stroke="#10B981" strokeWidth="3" strokeDasharray="3,3" className="animate-pulse"/>
            </g>
            <text x="125" y="220" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">Deposit Tokens → Earn Rewards</text>
          </svg>
        </div>
      )
    },
    {
      title: "Step 2: Initiate Battle",
      description: "Cross swords with opponents! Find fair matches in your league and launch strategic attacks",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg">
          <svg className="w-64 h-64" viewBox="0 0 250 250">
            <g className="origin-center" style={{ animation: 'swing 1.5s ease-in-out infinite alternate' }}>
              <line x1="60" y1="120" x2="100" y2="80" stroke="#DC2626" strokeWidth="8" strokeLinecap="round"/>
              <rect x="55" y="115" width="15" height="20" fill="#991B1B" rx="2"/>
              <polygon points="100,80 105,75 95,85" fill="#EF4444"/>
            </g>
            <g className="origin-center" style={{ animation: 'swing 1.5s ease-in-out infinite alternate-reverse' }}>
              <line x1="190" y1="120" x2="150" y2="80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round"/>
              <rect x="180" y="115" width="15" height="20" fill="#1E40AF" rx="2"/>
              <polygon points="150,80 145,75 155,85" fill="#60A5FA"/>
            </g>
            <circle cx="125" cy="100" r="20" fill="#FCD34D" opacity="0.5" className="animate-ping"/>
            <text x="125" y="180" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold">Find Opponents</text>
            <text x="125" y="200" textAnchor="middle" fill="#F59E0B" fontSize="11">Attack for Glory!</text>
          </svg>
        </div>
      )
    },
    {
      title: "Step 3: Expand Kingdom",
      description: "Grow your territory with expanding walls. Larger kingdoms have more power and better defenses",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg">
          <svg className="w-64 h-64" viewBox="0 0 250 250">
            <rect x="100" y="120" width="50" height="50" fill="#8B4513" stroke="#654321" strokeWidth="2" opacity="0.3"/>
            <g style={{ animation: 'expand 2s ease-in-out infinite' }}>
              <rect x="80" y="100" width="90" height="70" fill="#8B4513" stroke="#654321" strokeWidth="3"/>
              <rect x="95" y="115" width="20" height="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
              <rect x="135" y="115" width="20" height="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
            </g>
            <path d="M70 100 L70 95 M180 100 L180 95" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
            <text x="55" y="95" fill="#10B981" fontSize="20" fontWeight="bold">←</text>
            <text x="185" y="95" fill="#10B981" fontSize="20" fontWeight="bold">→</text>
            <text x="125" y="200" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">Expand Territory</text>
            <text x="125" y="220" textAnchor="middle" fill="#10B981" fontSize="11">Increase Power!</text>
          </svg>
        </div>
      )
    },
    {
      title: "Step 4: Advance Leagues",
      description: "Progress through Bronze, Silver, Gold, and Diamond leagues for better rewards and prestige",
      illustration: (
        <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg">
          <svg className="w-64 h-64" viewBox="0 0 280 250">
            <g opacity="0.3">
              <circle cx="50" cy="180" r="20" fill="#CD7F32" stroke="#8B4513" strokeWidth="2"/>
              <text x="50" y="210" textAnchor="middle" fill="#CD7F32" fontSize="10">Bronze</text>
            </g>
            <g opacity="0.5">
              <circle cx="100" cy="150" r="22" fill="#C0C0C0" stroke="#808080" strokeWidth="2"/>
              <text x="100" y="185" textAnchor="middle" fill="#C0C0C0" fontSize="10">Silver</text>
            </g>
            <g opacity="0.7">
              <circle cx="150" cy="120" r="24" fill="#FFD700" stroke="#DAA520" strokeWidth="2"/>
              <text x="150" y="160" textAnchor="middle" fill="#FFD700" fontSize="10">Gold</text>
            </g>
            <g className="animate-pulse">
              <circle cx="200" cy="90" r="28" fill="#00CED1" stroke="#008B8B" strokeWidth="3"/>
              <polygon points="200,75 205,85 215,87 207,95 209,105 200,100 191,105 193,95 185,87 195,85" fill="white"/>
              <text x="200" y="130" textAnchor="middle" fill="#00CED1" fontSize="11" fontWeight="bold">Diamond</text>
            </g>
            <path d="M70 170 Q110 140 130 130" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
            <path d="M165 115 L185 95" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
            <text x="140" y="220" textAnchor="middle" fill="#A855F7" fontSize="14" fontWeight="bold">Climb the Ranks!</text>
          </svg>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm">
      <style>{`
        @keyframes swing {
          from { transform: rotate(-15deg); }
          to { transform: rotate(15deg); }
        }
        @keyframes expand {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>

      <div className="relative max-w-2xl w-full mx-4">
        <button
          onClick={onSkip}
          className="absolute -top-12 right-0 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="card-gradient rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-amber-400">
                {tutorials[currentStep].title}
              </h2>
              <span className="text-sm text-slate-500">
                {currentStep + 1} / {tutorials.length}
              </span>
            </div>
            <p className="text-slate-300 text-lg">
              {tutorials[currentStep].description}
            </p>
          </div>

          <div className="mb-8">
            {tutorials[currentStep].illustration}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {tutorials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-amber-500 w-8'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>{currentStep === tutorials.length - 1 ? 'Start Playing' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onSkip}
            className="w-full mt-6 text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            Skip Tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
