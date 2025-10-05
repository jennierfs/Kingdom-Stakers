import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, CORE_RPC_URL, CORE_CHAIN_ID } from '../contracts/contractABI';
import { ERC20_ABI } from '../contracts/tokenABI';

interface WalletProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
}

interface DetectedWallet {
  name: string;
  provider: WalletProvider;
}

export class Web3Service {
  private provider: BrowserProvider | null = null;
  private contract: Contract | null = null;
  private signer: any = null;
  private tokenContract: Contract | null = null;
  private currentWallet: string | null = null;

  private detectAvailableWallets(): DetectedWallet[] {
    const wallets: DetectedWallet[] = [];

    if ((window as any).trustwallet) {
      wallets.push({ name: 'Trust Wallet', provider: (window as any).trustwallet });
    }

    if ((window as any).bitkeep?.ethereum) {
      wallets.push({ name: 'Bitget Wallet', provider: (window as any).bitkeep.ethereum });
    }

    if ((window as any).safepalProvider) {
      wallets.push({ name: 'SafePal', provider: (window as any).safepalProvider });
    }

    if ((window as any).tokenpocket?.ethereum) {
      wallets.push({ name: 'TokenPocket', provider: (window as any).tokenpocket.ethereum });
    }

    if ((window as any).binancew3w?.ethereum) {
      wallets.push({ name: 'Binance Web3 Wallet', provider: (window as any).binancew3w.ethereum });
    }

    if (window.ethereum) {
      wallets.push({ name: 'MetaMask', provider: window.ethereum });
    }

    return wallets;
  }

  private getPreferredProvider(): WalletProvider | null {
    const availableWallets = this.detectAvailableWallets();

    if (availableWallets.length === 0) {
      return null;
    }

    this.currentWallet = availableWallets[0].name;
    return availableWallets[0].provider;
  }

  getCurrentWalletName(): string {
    return this.currentWallet || 'Unknown Wallet';
  }

  async connect() {
    const provider = this.getPreferredProvider();

    if (!provider) {
      throw new Error('Please install a Web3 wallet (MetaMask, Trust Wallet, Bitget, SafePal, TokenPocket, or Binance Web3 Wallet) to play Kingdom Stakers');
    }

    try {
      this.provider = new BrowserProvider(provider as any);
      await this.provider.send('eth_requestAccounts', []);

      const network = await this.provider.getNetwork();

      if (Number(network.chainId) !== CORE_CHAIN_ID) {
        await this.switchToCore();
      }

      this.signer = await this.provider.getSigner();
      this.contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);

      return await this.signer.getAddress();
    } catch (error: any) {
      console.error('Connection error:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }

  async switchToCore() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${CORE_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CORE_CHAIN_ID.toString(16)}`,
            chainName: 'Core Blockchain',
            nativeCurrency: {
              name: 'CORE',
              symbol: 'CORE',
              decimals: 18
            },
            rpcUrls: [CORE_RPC_URL],
            blockExplorerUrls: ['https://scan.coredao.org']
          }],
        });
      } else {
        throw switchError;
      }
    }
  }

  getContract() {
    if (!this.contract) {
      throw new Error('Contract not initialized. Please connect wallet first.');
    }
    return this.contract;
  }

  getProvider() {
    if (!this.provider) {
      throw new Error('Provider not initialized. Please connect wallet first.');
    }
    return this.provider;
  }

  async getTokenContract() {
    if (!this.tokenContract && this.signer) {
      const contract = this.getContract();
      const tokenAddress = await contract.stakedToken();
      this.tokenContract = new Contract(tokenAddress, ERC20_ABI, this.signer);
    }
    return this.tokenContract;
  }

  async approveToken(amount: string) {
    const tokenContract = await this.getTokenContract();
    if (!tokenContract) throw new Error('Token contract not initialized');

    const amountWei = parseUnits(amount, 18);
    const tx = await tokenContract.approve(CONTRACT_ADDRESS, amountWei);
    return await tx.wait();
  }

  async checkAllowance(owner: string) {
    const tokenContract = await this.getTokenContract();
    if (!tokenContract) return BigInt(0);

    const allowance = await tokenContract.allowance(owner, CONTRACT_ADDRESS);
    return allowance;
  }

  async getTokenBalance(address: string) {
    const tokenContract = await this.getTokenContract();
    if (!tokenContract) return BigInt(0);

    const balance = await tokenContract.balanceOf(address);
    return balance;
  }

  async deposit(amount: string) {
    const contract = this.getContract();
    const amountWei = parseUnits(amount, 18);

    const allowance = await this.checkAllowance(await this.signer.getAddress());
    if (allowance < amountWei) {
      await this.approveToken(amount);
    }

    const tx = await contract.deposit(amountWei);
    return await tx.wait();
  }

  async withdraw(amount: string) {
    const contract = this.getContract();
    const amountWei = parseUnits(amount, 18);
    const tx = await contract.withdraw(amountWei);
    return await tx.wait();
  }

  async attackPlayer(defenderAddress: string) {
    const contract = this.getContract();
    const tx = await contract.attackPlayer(defenderAddress);
    return await tx.wait();
  }

  async expandKingdom() {
    const contract = this.getContract();
    return await contract.expandKingdom();
  }

  async discoverPlayers(maxResults: number = 5) {
    const contract = this.getContract();
    const tx = await contract.discoverPlayers(maxResults);
    const receipt = await tx.wait();
    return receipt;
  }

  async resetCooldown() {
    const contract = this.getContract();
    const tx = await contract.resetCooldown();
    return await tx.wait();
  }

  async getPlayerStats(address: string) {
    const contract = this.getContract();
    return await contract.getPlayerStats(address);
  }

  async getUserInfo(address: string) {
    const contract = this.getContract();
    return await contract.userInfo(address);
  }

  async getPlayerProfile(address: string) {
    const contract = this.getContract();
    return await contract.getPlayerProfile(address);
  }

  async getBattleDetails(attacker: string, defender: string) {
    const contract = this.getContract();
    return await contract.getBattleDetails(attacker, defender);
  }

  async getGameStats() {
    const contract = this.getContract();
    return await contract.getGameStats();
  }

  async getTopPlayers(topN: number = 10) {
    const contract = this.getContract();
    return await contract.getTopPlayers(topN);
  }

  async findFairOpponents(maxResults: number = 5) {
    const contract = this.getContract();
    return await contract.findFairOpponents(maxResults);
  }

  async getLeagueInfo(leagueId: number) {
    const contract = this.getContract();
    return await contract.getLeagueInfo(leagueId);
  }

  async getPendingReward(address: string) {
    const contract = this.getContract();
    return await contract.pendingReward(address);
  }

  formatTokenAmount(amount: bigint): string {
    const formatted = formatUnits(amount, 18);
    const num = parseFloat(formatted);
    return Math.floor(num).toString();
  }

  formatTokenAmountWithDecimals(amount: bigint, decimals: number = 4): string {
    const formatted = formatUnits(amount, 18);
    const num = parseFloat(formatted);
    return num.toFixed(decimals);
  }

  parseTokenAmount(amount: string): bigint {
    return parseUnits(amount, 18);
  }

  async getOwner() {
    const contract = this.getContract();
    return await contract.owner();
  }

  async getContractRewardBalance() {
    const contract = this.getContract();
    const tokenAddress = await contract.rewardToken();
    const tokenContract = new Contract(tokenAddress, ERC20_ABI, this.signer);
    return await tokenContract.balanceOf(CONTRACT_ADDRESS);
  }

  async getPoolInfo() {
    const contract = this.getContract();
    const [
      rewardPerBlock,
      startBlock,
      bonusEndBlock,
      lastRewardBlock,
      stakedTokenAmount,
      poolLimitPerUser,
      userLimit
    ] = await Promise.all([
      contract.rewardPerBlock(),
      contract.startBlock(),
      contract.bonusEndBlock(),
      contract.lastRewardBlock(),
      contract.stakedTokenAmount(),
      contract.poolLimitPerUser(),
      contract.userLimit()
    ]);

    return {
      rewardPerBlock,
      startBlock,
      bonusEndBlock,
      lastRewardBlock,
      stakedTokenAmount,
      poolLimitPerUser,
      userLimit
    };
  }

  async stopReward() {
    const contract = this.getContract();
    const tx = await contract.stopReward();
    return await tx.wait();
  }

  async updateRewardPerBlock(newRewardPerBlock: string) {
    const contract = this.getContract();
    const amountWei = parseUnits(newRewardPerBlock, 18);
    const tx = await contract.updateRewardPerBlock(amountWei);
    return await tx.wait();
  }

  async emergencyRewardWithdraw(amount: string) {
    const contract = this.getContract();
    const amountWei = parseUnits(amount, 18);
    const tx = await contract.emergencyRewardWithdraw(amountWei);
    return await tx.wait();
  }

  async updatePoolLimit(hasLimit: boolean, limitAmount: string) {
    const contract = this.getContract();
    const amountWei = hasLimit ? parseUnits(limitAmount, 18) : 0;
    const tx = await contract.updatePoolLimitPerUser(hasLimit, amountWei);
    return await tx.wait();
  }

  async getCurrentBlockNumber() {
    if (!this.provider) throw new Error('Provider not initialized');
    return await this.provider.getBlockNumber();
  }

  async getBattleHistory(playerAddress: string, maxEvents: number = 20) {
    const contract = this.getContract();

    const attackerFilter = contract.filters.BattleResult(playerAddress, null);
    const defenderFilter = contract.filters.BattleResult(null, playerAddress);

    const currentBlock = await this.provider!.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 100000);

    const [attackerEvents, defenderEvents] = await Promise.all([
      contract.queryFilter(attackerFilter, fromBlock, currentBlock),
      contract.queryFilter(defenderFilter, fromBlock, currentBlock)
    ]);

    const allEvents = [...attackerEvents, ...defenderEvents]
      .sort((a, b) => {
        const blockDiff = Number(b.blockNumber) - Number(a.blockNumber);
        if (blockDiff !== 0) return blockDiff;
        return Number(b.index) - Number(a.index);
      })
      .slice(0, maxEvents);

    return allEvents;
  }
}

export const web3Service = new Web3Service();
