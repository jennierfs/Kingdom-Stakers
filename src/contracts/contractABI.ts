export const CONTRACT_ADDRESS = "0xC447163802012BD45883fF7f203E7700e5Fa886C";

export const CONTRACT_ABI = [
  // Owner functions
  "function emergencyRewardWithdraw(uint256 _amount) external",
  "function recoverToken(address _token) external",
  "function stopReward() external",
  "function updatePoolLimitPerUser(bool _userLimit, uint256 _poolLimitPerUser) external",
  "function updateRewardPerBlock(uint256 _rewardPerBlock) external",
  "function updateStartAndEndBlocks(uint256 _startBlock, uint256 _bonusEndBlock) external",
  "function owner() external view returns (address)",
  "function renounceOwnership() external",
  "function transferOwnership(address newOwner) external",

  // User staking functions
  "function deposit(uint256 _amount) external",
  "function withdraw(uint256 _amount) external",
  "function emergencyWithdraw() external",
  "function emergencyPlayerWithdraw() external",

  // Battle functions
  "function attackPlayer(address _defender) external",
  "function discoverPlayers(uint256 _maxResults) external returns (address[])",
  "function resetCooldown() external",

  // Kingdom functions
  "function expandKingdom() external",

  // Tutorial and Balance functions
  "function completeTutorial() external",
  "function getPlayerBalanceInfo(address _player) external view returns (tuple(uint256 registrationTime, uint256 protectionEndTime, uint256 currentWinStreak, uint256 currentLossStreak, uint256 winRate, uint256 battlesToday, bool hasTutorialBonus, bool isNewPlayerFlag, bool isVeteranFlag))",
  "function getNewPlayerOpponents() external view returns (address[], uint256[])",

  // View functions - Player info
  "function getPlayerStats(address _player) external view returns (uint256 level, uint256 totalBattles, uint256 battlesWon, uint256 kingdomSize, uint256 nextAttackTime, uint256 winRate, string league, uint256 battleScore)",
  "function getPlayerProfile(address _player) external view returns (tuple(uint256 level, uint256 kingdomSize, uint256 power, uint256 totalBattles, uint256 battlesWon, uint256 winRate, bool canBeAttacked, uint256 lastAttackTime, string league, uint256 battleScore, uint256 leagueId))",
  "function getPlayerRanking(address _player) external view returns (uint256)",
  "function getPlayerLeague(address _player) external view returns (string leagueName, uint256 leagueId, uint256 rewardMultiplier)",
  "function isPlayer(address _player) external view returns (bool)",

  // View functions - Battle info
  "function getBattleDetails(address _attacker, address _defender) external view returns (tuple(uint256 attackerPower, uint256 defenderPower, uint256 attackerLevel, uint256 defenderLevel, uint256 winProbability, bool canAttack, string attackerLeague, string defenderLeague, bool isFairMatch))",
  "function findFairOpponents(uint256 _maxResults) external view returns (address[], uint256[])",
  "function findPlayersByLevel(uint256 _minLevel, uint256 _maxLevel) external view returns (address[], uint256[])",

  // View functions - Game stats
  "function getGameStats() external view returns (uint256 totalPlayers, uint256 activePlayers, uint256 totalBattles, uint256 totalKingdomSize, address strongestPlayer, uint256 strongestPlayerPower, uint256[] leagueCounts)",
  "function getTopPlayers(uint256 _topN) external view returns (address[], uint256[], uint256[])",
  "function getTotalPlayers() external view returns (uint256)",

  // View functions - League info
  "function getLeagueInfo(uint256 _leagueId) external view returns (string name, uint256 minTokens, uint256 maxTokens, uint256 rewardMultiplier, uint256 playerCount)",
  "function leagues(uint256) external view returns (uint256 minTokens, uint256 maxTokens, string name, uint256 rewardMultiplier)",

  // View functions - Staking pool
  "function pendingReward(address _user) external view returns (uint256)",
  "function hasUserLimit() external view returns (bool)",
  "function getCurrentBlock() external view returns (uint256)",

  // Public state variables
  "function userInfo(address) external view returns (uint256 amount, uint256 rewardDebt, uint256 lastAttackTime, uint256 playerLevel, uint256 totalBattles, uint256 battlesWon, uint256 kingdomSize, uint256 battleScore, uint256 leagueId)",
  "function lastDefender(address) external view returns (address)",
  "function lastDiscoveryCleanup(address) external view returns (uint256)",
  "function playerRegistrationTime(address) external view returns (uint256)",
  "function consecutiveWins(address) external view returns (uint256)",
  "function consecutiveLosses(address) external view returns (uint256)",
  "function dailyBattles(address) external view returns (uint256)",
  "function lastBattleDate(address) external view returns (uint256)",
  "function hasCompletedTutorial(address) external view returns (bool)",
  "function playerWinRate(address) external view returns (uint256)",
  "function totalBattlesInSystem() external view returns (uint256)",
  "function stakedToken() external view returns (address)",
  "function rewardToken() external view returns (address)",
  "function rewardPerBlock() external view returns (uint256)",
  "function accTokenPerShare() external view returns (uint256)",
  "function bonusEndBlock() external view returns (uint256)",
  "function startBlock() external view returns (uint256)",
  "function lastRewardBlock() external view returns (uint256)",
  "function poolLimitPerUser() external view returns (uint256)",
  "function numberBlocksForUserLimit() external view returns (uint256)",
  "function userLimit() external view returns (bool)",
  "function isInitialized() external view returns (bool)",
  "function PRECISION_FACTOR() external view returns (uint256)",
  "function stakedTokenAmount() external view returns (uint256)",

  // Constants
  "function BURN_WALLET() external view returns (address)",
  "function MAX_BATTLE_REWARD_PERCENT() external view returns (uint256)",
  "function MIN_STAKE_FOR_BATTLE() external view returns (uint256)",
  "function COOLDOWN_PERIOD() external view returns (uint256)",
  "function MAX_PLAYERS() external view returns (uint256)",
  "function MAX_POWER_DIFFERENCE_PERCENT() external view returns (uint256)",
  "function MIN_DEFENDER_BALANCE_PERCENT() external view returns (uint256)",
  "function PROTECTION_PERIOD() external view returns (uint256)",
  "function MAX_WIN_STREAK() external view returns (uint256)",
  "function COMEBACK_BONUS_PERCENT() external view returns (uint256)",
  "function VETERAN_PENALTY_PERCENT() external view returns (uint256)",
  "function NEW_PLAYER_BONUS_PERCENT() external view returns (uint256)",
  "function MAX_DAILY_BATTLES() external view returns (uint256)",

  // Events
  "event Deposit(address indexed user, uint256 amount)",
  "event Withdraw(address indexed user, uint256 amount)",
  "event EmergencyWithdraw(address indexed user, uint256 amount)",
  "event NewStartAndEndBlocks(uint256 startBlock, uint256 endBlock)",
  "event NewRewardPerBlock(uint256 rewardPerBlock)",
  "event NewPoolLimit(uint256 poolLimitPerUser)",
  "event RewardsStop(uint256 blockNumber)",
  "event TokenRecovery(address indexed token, uint256 amount)",
  "event PlayerLevelUp(address indexed player, uint256 newLevel)",
  "event BattleResult(address indexed attacker, address indexed defender, bool attackerWon, uint256 battleReward, uint256 timestamp)",
  "event KingdomExpanded(address indexed player, uint256 newSize)",
  "event PlayerRegistered(address indexed player, uint256 timestamp)",
  "event PlayerDiscovered(address indexed discoverer, address indexed discoveredPlayer, uint256 level, uint256 kingdomSize, uint256 power, uint256 timestamp)",
  "event LevelUpReward(address indexed player, uint256 level, uint256 reward)",
  "event BattlePenalty(address indexed attacker, address indexed defender, uint256 penalty)",
  "event DiscoveryCost(address indexed player, uint256 cost)",
  "event CooldownReset(address indexed player, uint256 newCooldownTime)",
  "event MaxPlayersReached(uint256 currentPlayers, uint256 maxPlayers)",
  "event LeagueChanged(address indexed player, uint256 oldLeague, uint256 newLeague, string leagueName)",
  "event BattleScoreUpdated(address indexed player, uint256 oldScore, uint256 newScore)",
  "event FairMatchFound(address indexed attacker, address indexed defender, uint256 attackerPower, uint256 defenderPower)",
  "event TokensBurned(uint256 amount, address indexed from)",
  "event PlayerRemovedFromRegistry(address indexed player)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event NewPlayerProtection(address indexed player, uint256 protectionEndTime)",
  "event WinStreakBonus(address indexed player, uint256 streak, uint256 bonus)",
  "event ComebackBonus(address indexed player, uint256 bonusMultiplier)",
  "event VeteranPenaltyApplied(address indexed veteran, address indexed newcomer, uint256 penaltyPercent)",
  "event DailyBattleLimitReached(address indexed player, uint256 battlesToday)",
  "event TutorialCompleted(address indexed player, uint256 reward)",
  "event PlayerStatsUpdated(address indexed player, uint256 level, uint256 totalBattles, uint256 battlesWon, uint256 kingdomSize, uint256 battleScore, uint256 winRate, uint256 timestamp)",
  "event BattleDetailsUpdated(address indexed attacker, address indexed defender, uint256 attackerLevel, uint256 defenderLevel, uint256 attackerPower, uint256 defenderPower, bool attackerWon, uint256 reward, uint256 timestamp)",
  "event KingdomStatsUpdated(address indexed player, uint256 kingdomSize, uint256 expansionCost, uint256 timestamp)",
  "event LeaguePromotion(address indexed player, string oldLeague, string newLeague, uint256 newLeagueId, uint256 timestamp)",
  "event WinRateUpdated(address indexed player, uint256 oldWinRate, uint256 newWinRate, uint256 totalBattles, uint256 timestamp)",
  "event PlayerRankingChanged(address indexed player, uint256 oldRanking, uint256 newRanking, uint256 totalPlayers, uint256 timestamp)",
  "function emitPlayerStats(address _player) external"
] as const;

export const CORE_RPC_URL = "https://rpc.coredao.org";
export const CORE_CHAIN_ID = 1116;

export interface PlayerStats {
  level: bigint;
  totalBattles: bigint;
  battlesWon: bigint;
  kingdomSize: bigint;
  nextAttackTime: bigint;
  winRate: bigint;
  league: string;
  battleScore: bigint;
}

export interface PlayerProfile {
  level: bigint;
  kingdomSize: bigint;
  power: bigint;
  totalBattles: bigint;
  battlesWon: bigint;
  winRate: bigint;
  canBeAttacked: boolean;
  lastAttackTime: bigint;
  league: string;
  battleScore: bigint;
  leagueId: bigint;
}

export interface BattleDetails {
  attackerPower: bigint;
  defenderPower: bigint;
  attackerLevel: bigint;
  defenderLevel: bigint;
  winProbability: bigint;
  canAttack: boolean;
  attackerLeague: string;
  defenderLeague: string;
  isFairMatch: boolean;
}

export interface GameStats {
  totalPlayers: bigint;
  activePlayers: bigint;
  totalBattles: bigint;
  totalKingdomSize: bigint;
  strongestPlayer: string;
  strongestPlayerPower: bigint;
  leagueCounts: bigint[];
}

export interface PlayerBalanceInfo {
  registrationTime: bigint;
  protectionEndTime: bigint;
  currentWinStreak: bigint;
  currentLossStreak: bigint;
  winRate: bigint;
  battlesToday: bigint;
  hasTutorialBonus: boolean;
  isNewPlayerFlag: boolean;
  isVeteranFlag: boolean;
}
