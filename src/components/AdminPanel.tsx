import { useState, useEffect } from 'react';
import { Shield, DollarSign, Clock, Database, AlertTriangle, Settings, TrendingUp, Users } from 'lucide-react';
import { web3Service } from '../lib/web3';
import { useWeb3 } from '../contexts/Web3Context';
import { SuccessEffect } from './VictoryEffect';

export function AdminPanel() {
  const { account } = useWeb3();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [poolInfo, setPoolInfo] = useState<any>(null);
  const [rewardBalance, setRewardBalance] = useState<string>('0');
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [blocksRemaining, setBlocksRemaining] = useState<number>(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const CORE_BLOCK_TIME = 3;

  useEffect(() => {
    if (account) {
      checkOwnership();
    }
  }, [account]);

  useEffect(() => {
    if (isOwner) {
      loadAdminData();
      const interval = setInterval(loadAdminData, 10000);
      return () => clearInterval(interval);
    }
  }, [isOwner]);

  const checkOwnership = async () => {
    try {
      const owner = await web3Service.getOwner();
      setIsOwner(owner.toLowerCase() === account?.toLowerCase());
    } catch (error) {
      console.error('Error checking ownership:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      const [info, balance, block] = await Promise.all([
        web3Service.getPoolInfo(),
        web3Service.getContractRewardBalance(),
        web3Service.getCurrentBlockNumber()
      ]);

      setPoolInfo(info);
      setRewardBalance(web3Service.formatTokenAmount(balance));
      setCurrentBlock(block);

      const startBlock = Number(info.startBlock);
      const endBlock = Number(info.bonusEndBlock);
      const remaining = endBlock - block;
      setBlocksRemaining(remaining > 0 ? remaining : 0);

      const blocksFromStart = block - startBlock;
      const secondsFromStart = blocksFromStart * CORE_BLOCK_TIME;
      const startTime = Date.now() - (secondsFromStart * 1000);
      const startDateObj = new Date(startTime);
      setStartDate(startDateObj.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));

      if (remaining > 0) {
        const secondsRemaining = remaining * CORE_BLOCK_TIME;
        const endTime = Date.now() + (secondsRemaining * 1000);
        const endDateObj = new Date(endTime);
        setEndDate(endDateObj.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));

        const days = Math.floor(secondsRemaining / 86400);
        const hours = Math.floor((secondsRemaining % 86400) / 3600);
        const minutes = Math.floor((secondsRemaining % 3600) / 60);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeRemaining('Expired');
        setEndDate('Pool Ended');
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleStopReward = async () => {
    if (!confirm('Are you sure you want to stop rewards? This action cannot be undone.')) return;

    setActionLoading(true);
    setMessage(null);
    try {
      await web3Service.stopReward();
      setSuccessMessage('Rewards Stopped');
      setShowSuccess(true);
      setMessage({ type: 'success', text: 'Rewards stopped successfully!' });
      await loadAdminData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to stop rewards' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEmergencyWithdraw = async () => {
    const amount = prompt('Enter amount to withdraw (in tokens):');
    if (!amount) return;

    if (!confirm(`Withdraw ${amount} tokens from reward pool?`)) return;

    setActionLoading(true);
    setMessage(null);
    try {
      await web3Service.emergencyRewardWithdraw(amount);
      setSuccessMessage(`Withdrawn ${parseFloat(amount).toLocaleString()} tokens`);
      setShowSuccess(true);
      setMessage({ type: 'success', text: `Successfully withdrawn ${amount} tokens!` });
      await loadAdminData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to withdraw' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card-gradient rounded-2xl p-8">
        <p className="text-slate-400">Loading admin panel...</p>
      </div>
    );
  }

  if (!isOwner) {
    return null;
  }

  return (
    <div className="space-y-6">
      <SuccessEffect
        show={showSuccess}
        onComplete={() => setShowSuccess(false)}
        message={successMessage}
        icon={<Shield className="w-8 h-8 text-green-400 animate-pulse" />}
      />

      <div className="card-gradient rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-red-400">Admin Panel</h2>
            </div>
            <p className="text-slate-400">Contract management and monitoring</p>
          </div>
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400 font-semibold">OWNER ACCESS</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <Database className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Reward Balance</h3>
            <p className="text-3xl font-bold text-blue-400">{parseFloat(rewardBalance).toLocaleString()}</p>
            <p className="text-sm text-slate-400 mt-1">Tokens in contract</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className="text-xs bg-green-500/20 px-2 py-1 rounded text-green-300">per block</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Reward Rate</h3>
            <p className="text-3xl font-bold text-green-400">
              {poolInfo ? parseFloat(web3Service.formatTokenAmount(poolInfo.rewardPerBlock)).toFixed(2) : '0'}
            </p>
            <p className="text-sm text-slate-400 mt-1">Tokens per block</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className={`text-xs px-2 py-1 rounded ${
                blocksRemaining > 0 ? 'bg-purple-500/20 text-purple-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {blocksRemaining > 0 ? 'active' : 'expired'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Time Remaining</h3>
            <p className="text-2xl font-bold text-purple-400">{timeRemaining}</p>
            <p className="text-sm text-slate-400 mt-1">{blocksRemaining.toLocaleString()} blocks left</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-amber-400" />
              <Settings className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Total Staked</h3>
            <p className="text-3xl font-bold text-amber-400">
              {poolInfo ? parseFloat(web3Service.formatTokenAmount(poolInfo.stakedTokenAmount)).toLocaleString() : '0'}
            </p>
            <p className="text-sm text-slate-400 mt-1">Tokens locked</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>Pool Information</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Block:</span>
                <span className="text-slate-200 font-semibold">{currentBlock.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-700 pt-3 mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Start Block:</span>
                  <span className="text-slate-200 font-semibold">
                    {poolInfo ? Number(poolInfo.startBlock).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded px-2 py-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Start Date:</span>
                    <span className="text-green-400 font-semibold text-xs">{startDate || 'Calculating...'}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-3 mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">End Block:</span>
                  <span className="text-slate-200 font-semibold">
                    {poolInfo ? Number(poolInfo.bonusEndBlock).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-amber-500/10 to-transparent rounded px-2 py-1.5 mb-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">End Date:</span>
                    <span className={`font-semibold text-xs ${
                      blocksRemaining > 0 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {endDate || 'Calculating...'}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded px-2 py-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Time Remaining:</span>
                    <span className={`font-semibold text-xs ${
                      blocksRemaining > 0 ? 'text-purple-400' : 'text-red-400'
                    }`}>
                      {timeRemaining}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                <span className="text-slate-400">Last Reward Block:</span>
                <span className="text-slate-200 font-semibold">
                  {poolInfo ? Number(poolInfo.lastRewardBlock).toLocaleString() : '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">User Limit:</span>
                <span className={`font-semibold ${poolInfo?.userLimit ? 'text-green-400' : 'text-red-400'}`}>
                  {poolInfo?.userLimit ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              {poolInfo?.userLimit && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Pool Limit per User:</span>
                  <span className="text-slate-200 font-semibold">
                    {parseFloat(web3Service.formatTokenAmount(poolInfo.poolLimitPerUser)).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Time Calculations</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Block Time:</span>
                <span className="text-slate-200 font-semibold">{CORE_BLOCK_TIME}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blocks per Hour:</span>
                <span className="text-slate-200 font-semibold">1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blocks per Day:</span>
                <span className="text-slate-200 font-semibold">28,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Rewards:</span>
                <span className="text-amber-400 font-semibold">
                  {poolInfo ? (parseFloat(web3Service.formatTokenAmount(poolInfo.rewardPerBlock)) * 28800).toLocaleString() : '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Depletion:</span>
                <span className="text-purple-400 font-semibold">
                  {poolInfo && parseFloat(rewardBalance) > 0 && parseFloat(web3Service.formatTokenAmount(poolInfo.rewardPerBlock)) > 0
                    ? `${Math.floor(parseFloat(rewardBalance) / (parseFloat(web3Service.formatTokenAmount(poolInfo.rewardPerBlock)) * 28800))} days`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Admin Actions</span>
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Use these functions carefully. Some actions are irreversible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleStopReward}
              disabled={actionLoading || blocksRemaining <= 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Stop Rewards</span>
            </button>

            <button
              onClick={handleEmergencyWithdraw}
              disabled={actionLoading || parseFloat(rewardBalance) <= 0}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>Emergency Withdraw</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
