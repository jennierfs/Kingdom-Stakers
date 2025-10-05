import { useState, useEffect } from 'react';
import { Coins, TrendingUp, ArrowDownCircle, ArrowUpCircle, Info } from 'lucide-react';
import { web3Service } from '../lib/web3';
import { useWeb3 } from '../contexts/Web3Context';
import { SuccessEffect, RewardEffect } from './VictoryEffect';
import { StakingBackground } from './StakingBackground';

interface StakingPanelProps {
  onUpdate: () => void;
}

export function StakingPanel({ onUpdate }: StakingPanelProps) {
  const { account } = useWeb3();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [pendingRewards, setPendingRewards] = useState('0');
  const [displayedRewards, setDisplayedRewards] = useState('0');
  const [isUpdatingRewards, setIsUpdatingRewards] = useState(false);
  const [apy, setApy] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState('0');

  useEffect(() => {
    if (account) {
      loadStakingData();
      const interval = setInterval(loadStakingData, 10000);
      return () => clearInterval(interval);
    }
  }, [account]);

  // Real-time reward counter - fetch directly from contract every 15 seconds
  useEffect(() => {
    if (!account) {
      setDisplayedRewards('0');
      return;
    }

    // Initial fetch immediately
    const fetchRewards = async () => {
      if (isUpdatingRewards) return;

      setIsUpdatingRewards(true);
      try {
        const pending = await web3Service.getPendingReward(account);
        const formattedRewards = web3Service.formatTokenAmountWithDecimals(pending, 4);
        setDisplayedRewards(formattedRewards);

        console.log('✅ Treasury Tribute updated from blockchain:', {
          timestamp: new Date().toLocaleTimeString(),
          rawPending: pending.toString(),
          formatted: formattedRewards,
          account: account
        });
      } catch (error) {
        console.error('❌ Error fetching pending rewards:', error);
      } finally {
        setIsUpdatingRewards(false);
      }
    };

    // Fetch immediately on mount
    fetchRewards();

    // Then fetch every 15 seconds
    const interval = setInterval(fetchRewards, 15000);

    return () => clearInterval(interval);
  }, [account]);

  const loadStakingData = async () => {
    try {
      const contract = web3Service.getContract();

      // Fetch all data in parallel for better performance
      const [userInfo, pending, rewardPerBlockValue, stakedTokenAmount] = await Promise.all([
        contract.userInfo(account),
        web3Service.getPendingReward(account!),
        contract.rewardPerBlock(),
        contract.stakedTokenAmount()
      ]);

      console.log('=== 🏦 Treasury Data Full Refresh ===');
      console.log('⏰ Timestamp:', new Date().toLocaleTimeString());
      console.log('💰 Staked Balance (raw):', userInfo.amount.toString());
      console.log('💰 Staked Balance (formatted):', web3Service.formatTokenAmount(userInfo.amount));
      console.log('🎁 Pending Rewards (raw):', pending.toString());
      console.log('🎁 Pending Rewards (formatted):', web3Service.formatTokenAmountWithDecimals(pending, 4));
      console.log('🌍 Total Staked (raw):', stakedTokenAmount.toString());
      console.log('🌍 Total Staked (formatted):', web3Service.formatTokenAmount(stakedTokenAmount));
      console.log('⚡ Reward Per Block (raw):', rewardPerBlockValue.toString());
      console.log('⚡ Reward Per Block (formatted):', web3Service.formatTokenAmount(rewardPerBlockValue));

      const stakedBalanceFormatted = web3Service.formatTokenAmount(userInfo.amount);
      const pendingRewardsFormatted = web3Service.formatTokenAmountWithDecimals(pending, 4);
      const totalStakedFormatted = web3Service.formatTokenAmount(stakedTokenAmount);

      setStakedBalance(stakedBalanceFormatted);
      setPendingRewards(pendingRewardsFormatted);
      setDisplayedRewards(pendingRewardsFormatted);
      setTotalStaked(totalStakedFormatted);

      console.log('✅ State Updated Successfully');
      console.log('- Staked Balance:', stakedBalanceFormatted);
      console.log('- Pending Rewards:', pendingRewardsFormatted);
      console.log('- Total Staked:', totalStakedFormatted);

      // Calculate APY
      // Core DAO: 3 seconds per block
      // Blocks per year = (365 × 24 × 3600) / 3 = 10,512,000 blocks
      const secondsPerYear = 365 * 24 * 3600;
      const blockTime = 3;
      const blocksPerYear = Math.floor(secondsPerYear / blockTime);

      console.log('blocksPerYear:', blocksPerYear);

      if (stakedTokenAmount > 0n && rewardPerBlockValue > 0n) {
        // Calculate yearly rewards: rewardPerBlock × blocksPerYear
        const yearlyRewardsWei = rewardPerBlockValue * BigInt(blocksPerYear);
        console.log('yearlyRewardsWei:', yearlyRewardsWei.toString());

        // APY = (yearlyRewards / totalStaked) × 100
        // Use higher precision: multiply by 1000000 (6 decimal places) before division
        const apyBigInt = (yearlyRewardsWei * BigInt(1000000)) / stakedTokenAmount;
        console.log('apyBigInt (with higher precision):', apyBigInt.toString());

        // Convert to number and divide by 10000 to get percentage with 2 decimals
        const apyValue = Number(apyBigInt) / 10000;
        console.log('APY calculated:', apyValue);

        setApy(apyValue.toFixed(2));
      } else {
        console.log('APY set to 0 - stakedTokenAmount or rewardPerBlockValue is 0');
        console.log('stakedTokenAmount > 0:', stakedTokenAmount > 0n);
        console.log('rewardPerBlockValue > 0:', rewardPerBlockValue > 0n);
        setApy('0.00');
      }
      console.log('=== End APY Debug ===');
    } catch (error) {
      console.error('Error loading staking data:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await web3Service.deposit(depositAmount);
      setSuccessMessage(`Deposited ${parseFloat(depositAmount).toLocaleString()} gold to treasury!`);
      setShowSuccess(true);
      setMessage({ type: 'success', text: `Successfully deposited ${depositAmount} gold!` });
      setDepositAmount('');

      // Wait for blockchain to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      await loadStakingData();
      onUpdate();
    } catch (error: any) {
      console.error('Deposit error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to stake tokens' });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await web3Service.withdraw(withdrawAmount);
      setMessage({ type: 'success', text: `Successfully withdrawn ${withdrawAmount} gold!` });
      setWithdrawAmount('');

      // Wait for blockchain to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      await loadStakingData();
      onUpdate();
    } catch (error: any) {
      console.error('Withdraw error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to withdraw tokens' });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    setLoading(true);
    setMessage(null);

    // Use the displayed amount that the user sees
    const claimingAmount = displayedRewards;

    try {
      console.log('Claiming rewards:');
      console.log('- Amount shown to user:', displayedRewards);

      await web3Service.withdraw('0');

      setRewardAmount(claimingAmount);
      setShowReward(true);
      setMessage({ type: 'success', text: `Successfully collected ${parseFloat(claimingAmount).toLocaleString()} gold tribute!` });

      // Wait for blockchain to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      await loadStakingData();
      onUpdate();
    } catch (error: any) {
      console.error('Claim rewards error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to claim rewards' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SuccessEffect
        show={showSuccess}
        onComplete={() => setShowSuccess(false)}
        message={successMessage}
        icon={<Coins className="w-8 h-8 text-green-400 animate-pulse" />}
      />

      <RewardEffect
        show={showReward}
        onComplete={() => setShowReward(false)}
        amount={rewardAmount}
      />

      <div className="relative card-gradient rounded-2xl p-8 overflow-hidden">
        <StakingBackground />

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Royal Treasury</h2>
            <p className="text-slate-400">Deposit gold to strengthen your kingdom and collect tax tributes from your lands</p>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-full">
            <img
              src="https://photos.pinksale.finance/file/pinksale-logo-upload/1759453096420-b0a727ba4ab793bd277b35733dbbb0e2.png"
              alt="Treasury"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {message && (
          <div className={`relative z-10 p-4 rounded-lg mb-6 ${
            message.type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
            'bg-red-500/20 border border-red-500/30'
          }`}>
            <p className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </p>
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-3">
              <Coins className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Treasury Reserves</h3>
            <p className="text-3xl font-bold text-green-400">{parseFloat(stakedBalance).toLocaleString()}</p>
            <p className="text-sm text-slate-400 mt-1">Gold stored in your vault</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div className="px-2 py-1 bg-purple-500/20 rounded text-xs font-semibold text-purple-300">
                APY
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Tax Collection Rate</h3>
            <p className="text-3xl font-bold text-purple-400">{apy}%</p>
            <p className="text-sm text-slate-400 mt-1">Annual tribute from lands</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <Coins className="w-8 h-8 text-amber-400" />
              <TrendingUp className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Treasury Tribute</h3>
            <p className="text-3xl font-bold text-amber-400">{displayedRewards}</p>
            <p className="text-sm text-slate-400 mt-1">Gold awaiting collection</p>
            <button
              onClick={handleClaimRewards}
              disabled={loading || parseFloat(displayedRewards) <= 0}
              className="w-full btn-primary mt-3"
            >
              {loading ? 'Collecting...' : 'Collect Tribute'}
            </button>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-blue-400 font-semibold">Treasury Benefits</p>
            </div>
            <ul className="text-sm text-blue-300 space-y-1">
              <li>• Collect {apy}% annual tax from your lands</li>
              <li>• Participate in epic battles and raids</li>
              <li>• Build and expand your kingdom</li>
              <li>• Climb the league rankings</li>
              <li>• Minimum 100 gold required for battles</li>
            </ul>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Coins className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <p className="text-cyan-400 font-semibold">Realm Statistics</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Kingdom Gold:</span>
                <span className="text-cyan-400 font-semibold">{parseFloat(totalStaked).toLocaleString()} gold</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Your Influence:</span>
                <span className="text-cyan-400 font-semibold">
                  {parseFloat(totalStaked) > 0
                    ? ((parseFloat(stakedBalance) / parseFloat(totalStaked)) * 100).toFixed(4)
                    : '0'}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tax Rate:</span>
                <span className="text-purple-400 font-semibold">{apy}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-gradient rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ArrowDownCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-200">Deposit Gold</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Amount to Deposit
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <p className="text-xs text-slate-500 mt-2">
                Minimum 100 gold required to participate in battles
              </p>
            </div>

            <button
              onClick={handleDeposit}
              disabled={loading || !depositAmount}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <ArrowDownCircle className="w-5 h-5" />
              <span>{loading ? 'Depositing...' : 'Deposit Gold'}</span>
            </button>
          </div>
        </div>

        <div className="card-gradient rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ArrowUpCircle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-200">Withdraw Gold</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Amount to Withdraw
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <p className="text-xs text-slate-500 mt-2">
                Available: {parseFloat(stakedBalance).toLocaleString()} gold
              </p>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={loading || !withdrawAmount}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <ArrowUpCircle className="w-5 h-5" />
              <span>{loading ? 'Withdrawing...' : 'Withdraw Gold'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4">Treasury Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">How it Works</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Deposit gold to join the realm and collect tax tributes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Your treasury reserves determine your kingdom power</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Tributes are automatically collected from your lands</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Withdraw anytime, but removing gold reduces your power</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Important Notes</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Minimum 100 gold needed to raid other kingdoms</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Your treasury grows through successful conquests</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Failed raids result in gold penalties</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>Kingdom expansion requires permanent gold investment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
