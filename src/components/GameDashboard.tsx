import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { web3Service } from '../lib/web3';
import { getTutorialProgress, saveTutorialProgress } from '../lib/supabase';
import { PlayerStats } from './PlayerStats';
import { BattleArena } from './BattleArena';
import { KingdomManager } from './KingdomManager';
import { Leaderboard } from './Leaderboard';
import { StakingPanel } from './StakingPanel';
import { AdminPanel } from './AdminPanel';
import { BattleHistory } from './BattleHistory';
import { TokenShowcase } from './TokenShowcase';
import { TutorialIllustrations } from './TutorialIllustrations';
import { Swords, Castle, Trophy, Coins, Shield, Clock, Sparkles } from 'lucide-react';

type Tab = 'overview' | 'battle' | 'kingdom' | 'leaderboard' | 'staking' | 'history' | 'token' | 'admin';

export function GameDashboard() {
  const { account, isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [playerStats, setPlayerStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialChecked, setTutorialChecked] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      loadPlayerData();
      checkOwnership();
      checkTutorialStatus();
      const interval = setInterval(loadPlayerData, 10000);
      return () => clearInterval(interval);
    }
  }, [account, isConnected]);

  const checkOwnership = async () => {
    try {
      const owner = await web3Service.getOwner();
      setIsOwner(owner.toLowerCase() === account?.toLowerCase());
    } catch (error) {
      console.error('Error checking ownership:', error);
    }
  };

  const checkTutorialStatus = async () => {
    if (!account || tutorialChecked) return;

    try {
      const progress = await getTutorialProgress(account);
      if (!progress || (!progress.completed && !progress.skipped)) {
        setShowTutorial(true);
      }
      setTutorialChecked(true);
    } catch (error) {
      console.error('Error checking tutorial status:', error);
      setTutorialChecked(true);
    }
  };

  const handleTutorialComplete = async () => {
    if (account) {
      try {
        await saveTutorialProgress(account, true, false);
        setShowTutorial(false);
      } catch (error) {
        console.error('Error saving tutorial progress:', error);
        setShowTutorial(false);
      }
    }
  };

  const handleTutorialSkip = async () => {
    if (account) {
      try {
        await saveTutorialProgress(account, false, true);
        setShowTutorial(false);
      } catch (error) {
        console.error('Error saving tutorial skip:', error);
        setShowTutorial(false);
      }
    }
  };

  const calculateLeagueByBattleScore = (battleScore: number): string => {
    if (battleScore < 5000) return 'Bronce';
    if (battleScore < 15000) return 'Plata';
    if (battleScore < 50000) return 'Oro';
    return 'Diamante';
  };

  const loadPlayerData = async () => {
    try {
      const profile = await web3Service.getPlayerProfile(account!);
      const battleScore = Number(profile.battleScore);
      const correctLeague = calculateLeagueByBattleScore(battleScore);
      const level = Number(profile.level);

      console.log('=== Player Data Debug ===');
      console.log('Battle Score:', battleScore);
      console.log('Level (raw):', profile.level.toString());
      console.log('Level (number):', level);
      console.log('League from contract:', profile.league);
      console.log('Correct league by Battle Score:', correctLeague);
      console.log('Kingdom Size:', Number(profile.kingdomSize));
      console.log('Total Battles:', Number(profile.totalBattles));
      console.log('Win Rate:', Number(profile.winRate));
      console.log('=== End Player Data Debug ===');

      setPlayerStats({
        level: level,
        totalBattles: Number(profile.totalBattles),
        battlesWon: Number(profile.battlesWon),
        kingdomSize: Number(profile.kingdomSize),
        nextAttackTime: Number(profile.lastAttackTime),
        winRate: Number(profile.winRate),
        league: correctLeague,
        battleScore: battleScore,
        power: profile.power
      });
    } catch (error) {
      console.error('Error loading player data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center card-gradient p-12 rounded-2xl">
          <h2 className="text-4xl font-bold mb-4 text-amber-400">Welcome, Warrior!</h2>
          <p className="text-xl text-slate-300 mb-8">
            Connect your wallet to enter the Kingdom Stakers realm and begin your journey to glory.
          </p>
          <div className="inline-block p-6 bg-amber-500/10 rounded-full mb-6">
            <Castle className="w-20 h-20 text-amber-500" />
          </div>
        </div>
      </div>
    );
  }

  const baseTabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: Castle, customIcon: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759453383307-e12ad95f0669ad09313bb62e4c10faf2.png' },
    { id: 'battle' as Tab, label: 'Battle Arena', icon: Swords, customIcon: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759453383307-e12ad95f0669ad09313bb62e4c10faf2.png' },
    { id: 'history' as Tab, label: 'Battle History', icon: Clock, customIcon: null },
    { id: 'kingdom' as Tab, label: 'Kingdom', icon: Castle, customIcon: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759453164455-41c48deb580dc7c6223c11ba66e89f53.png' },
    { id: 'staking' as Tab, label: 'Treasury', icon: Coins, customIcon: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759453096420-b0a727ba4ab793bd277b35733dbbb0e2.png' },
    { id: 'leaderboard' as Tab, label: 'Leaderboard', icon: Trophy, customIcon: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759453383307-e12ad95f0669ad09313bb62e4c10faf2.png' },
    { id: 'token' as Tab, label: 'Token', icon: Sparkles, customIcon: null }
  ];

  const adminTab = { id: 'admin' as Tab, label: 'Admin', icon: Shield, customIcon: null };
  const tabs = isOwner ? [...baseTabs, adminTab] : baseTabs;

  return (
    <>
      {showTutorial && (
        <TutorialIllustrations
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="card-gradient rounded-xl p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 shadow-lg'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.customIcon ? (
                    <img src={tab.customIcon} alt={tab.label} className="w-5 h-5 object-contain" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'overview' && (
          <PlayerStats stats={playerStats} loading={loading} />
        )}

        {activeTab === 'battle' && (
          <BattleArena playerStats={playerStats} onBattleComplete={loadPlayerData} />
        )}

        {activeTab === 'kingdom' && (
          <KingdomManager playerStats={playerStats} onUpdate={loadPlayerData} />
        )}

        {activeTab === 'staking' && (
          <StakingPanel onUpdate={loadPlayerData} />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard currentPlayer={account!} />
        )}

        {activeTab === 'history' && (
          <BattleHistory />
        )}

        {activeTab === 'token' && (
          <TokenShowcase />
        )}

        {activeTab === 'admin' && isOwner && (
          <AdminPanel />
        )}
      </div>
    </div>
    </>
  );
}
