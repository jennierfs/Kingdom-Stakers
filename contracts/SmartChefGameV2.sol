// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

library Address {
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );
        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }

    function functionCall(address target, bytes memory data)
        internal
        returns (bytes memory)
    {
        return functionCall(target, data, "Address: low-level call failed");
    }

    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                "Address: low-level call with value failed"
            );
    }

    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(
            address(this).balance >= value,
            "Address: insufficient balance for call"
        );
        require(isContract(target), "Address: call to non-contract");
        (bool success, bytes memory returndata) = target.call{value: value}(
            data
        );
        return verifyCallResult(success, returndata, errorMessage);
    }

    function functionStaticCall(address target, bytes memory data)
        internal
        view
        returns (bytes memory)
    {
        return
            functionStaticCall(
                target,
                data,
                "Address: low-level static call failed"
            );
    }

    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    function functionDelegateCall(address target, bytes memory data)
        internal
        returns (bytes memory)
    {
        return
            functionDelegateCall(
                target,
                data,
                "Address: low-level delegate call failed"
            );
    }

    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            if (returndata.length > 0) {
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeERC20 {
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        require(
            (value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender) + value;
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        unchecked {
            uint256 oldAllowance = token.allowance(address(this), spender);
            require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");
            uint256 newAllowance = oldAllowance - value;
            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
        }
    }

    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
        if (returndata.length > 0) {
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(_msgSender());
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract SmartChefGame is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20Metadata;

    address public constant BURN_WALLET = 0x000000000000000000000000000000000000dEaD;

    // Parámetros de la pool de staking
    bool public userLimit;
    bool public isInitialized;
    uint256 public accTokenPerShare;
    uint256 public bonusEndBlock;
    uint256 public startBlock;
    uint256 public lastRewardBlock;
    uint256 public poolLimitPerUser;
    uint256 public numberBlocksForUserLimit;
    uint256 public rewardPerBlock;
    uint256 public PRECISION_FACTOR;
    IERC20Metadata public rewardToken;
    IERC20Metadata public stakedToken;
    uint256 public stakedTokenAmount;

    // Parámetros del juego de batallas
    uint256 public constant MAX_BATTLE_REWARD_PERCENT = 1;
    uint256 public constant MIN_STAKE_FOR_BATTLE = 100 * 10**18;
    uint256 public constant COOLDOWN_PERIOD = 4 hours;
    uint256 public constant MAX_PLAYERS = 5000;
    uint256 public constant MAX_POWER_DIFFERENCE_PERCENT = 50;
    uint256 public constant MIN_DEFENDER_BALANCE_PERCENT = 80;

    // Nuevas constantes para balanceo
    uint256 public constant PROTECTION_PERIOD = 7 days;
    uint256 public constant MAX_WIN_STREAK = 5;
    uint256 public constant COMEBACK_BONUS_PERCENT = 25;
    uint256 public constant VETERAN_PENALTY_PERCENT = 15;
    uint256 public constant NEW_PLAYER_BONUS_PERCENT = 30;
    uint256 public constant MAX_DAILY_BATTLES = 20;

    // ============ NUEVAS CONSTANTES PARA HISTORIAL ============
    uint256 public constant MAX_HISTORY_PER_PLAYER = 100; // Límite para evitar gas infinito

    struct League {
        uint256 minTokens;
        uint256 maxTokens;
        string name;
        uint256 rewardMultiplier;
    }

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastAttackTime;
        uint256 playerLevel;
        uint256 totalBattles;
        uint256 battlesWon;
        uint256 kingdomSize;
        uint256 battleScore;
        uint256 leagueId;
    }

    // ============ NUEVA ESTRUCTURA PARA HISTORIAL ON-CHAIN ============
    struct BattleRecord {
        address opponent;
        bool isAttacker;
        bool won;
        uint256 reward;
        uint256 timestamp;
        uint256 myPowerAtBattle;
        uint256 opponentPowerAtBattle;
        uint256 blockNumber;
    }

    struct BattleDetails {
        uint256 attackerPower;
        uint256 defenderPower;
        uint256 attackerLevel;
        uint256 defenderLevel;
        uint256 winProbability;
        bool canAttack;
        string attackerLeague;
        string defenderLeague;
        bool isFairMatch;
    }

    struct PlayerProfile {
        uint256 level;
        uint256 kingdomSize;
        uint256 power;
        uint256 totalBattles;
        uint256 battlesWon;
        uint256 winRate;
        bool canBeAttacked;
        uint256 lastAttackTime;
        string league;
        uint256 battleScore;
        uint256 leagueId;
    }

    struct PlayerBalanceInfo {
        uint256 registrationTime;
        uint256 protectionEndTime;
        uint256 currentWinStreak;
        uint256 currentLossStreak;
        uint256 winRate;
        uint256 battlesToday;
        bool hasTutorialBonus;
        bool isNewPlayerFlag;
        bool isVeteranFlag;
    }

    mapping(address => UserInfo) public userInfo;
    mapping(address => address) public lastDefender;
    mapping(address => mapping(address => bool)) private _recentlyDiscovered;
    mapping(address => uint256) public lastDiscoveryCleanup;

    // ============ NUEVOS MAPPINGS PARA HISTORIAL ON-CHAIN ============
    mapping(address => BattleRecord[]) private playerBattleHistory;
    mapping(address => uint256) public playerBattleCount;

    // Nuevas variables de estado para balanceo
    mapping(address => uint256) public playerRegistrationTime;
    mapping(address => uint256) public consecutiveWins;
    mapping(address => uint256) public consecutiveLosses;
    mapping(address => uint256) public dailyBattles;
    mapping(address => uint256) public lastBattleDate;
    mapping(address => bool) public hasCompletedTutorial;
    mapping(address => uint256) public playerWinRate;
    uint256 public totalBattlesInSystem;

    address[] private allPlayers;
    mapping(address => bool) private isPlayerRegistered;
    mapping(address => uint256) private playerIndex;

    League[] public leagues;

    // Eventos originales
    event Deposit(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event NewStartAndEndBlocks(uint256 startBlock, uint256 endBlock);
    event NewRewardPerBlock(uint256 rewardPerBlock);
    event NewPoolLimit(uint256 poolLimitPerUser);
    event RewardsStop(uint256 blockNumber);
    event TokenRecovery(address indexed token, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event PlayerLevelUp(address indexed player, uint256 newLevel);
    event BattleResult(
        address indexed attacker,
        address indexed defender,
        bool attackerWon,
        uint256 battleReward,
        uint256 timestamp
    );
    event KingdomExpanded(address indexed player, uint256 newSize);
    event PlayerRegistered(address indexed player, uint256 timestamp);
    event PlayerDiscovered(
        address indexed discoverer,
        address indexed discoveredPlayer,
        uint256 level,
        uint256 kingdomSize,
        uint256 power,
        uint256 timestamp
    );
    event LevelUpReward(address indexed player, uint256 level, uint256 reward);
    event BattlePenalty(address indexed attacker, address indexed defender, uint256 penalty);
    event DiscoveryCost(address indexed player, uint256 cost);
    event CooldownReset(address indexed player, uint256 newCooldownTime);
    event MaxPlayersReached(uint256 currentPlayers, uint256 maxPlayers);
    event LeagueChanged(address indexed player, uint256 oldLeague, uint256 newLeague, string leagueName);
    event BattleScoreUpdated(address indexed player, uint256 oldScore, uint256 newScore);
    event FairMatchFound(address indexed attacker, address indexed defender, uint256 attackerPower, uint256 defenderPower);
    event TokensBurned(uint256 amount, address indexed from);
    event PlayerRemovedFromRegistry(address indexed player);
    event NewPlayerProtection(address indexed player, uint256 protectionEndTime);
    event WinStreakBonus(address indexed player, uint256 streak, uint256 bonus);
    event ComebackBonus(address indexed player, uint256 bonusMultiplier);
    event VeteranPenaltyApplied(address indexed veteran, address indexed newcomer, uint256 penaltyPercent);
    event DailyBattleLimitReached(address indexed player, uint256 battlesToday);
    event TutorialCompleted(address indexed player, uint256 reward);

    // NUEVOS EVENTOS PARA ESTADÍSTICAS EN TIEMPO REAL
    event PlayerStatsUpdated(
        address indexed player,
        uint256 level,
        uint256 totalBattles,
        uint256 battlesWon,
        uint256 kingdomSize,
        uint256 battleScore,
        uint256 winRate,
        uint256 timestamp
    );

    event BattleDetailsUpdated(
        address indexed attacker,
        address indexed defender,
        uint256 attackerLevel,
        uint256 defenderLevel,
        uint256 attackerPower,
        uint256 defenderPower,
        bool attackerWon,
        uint256 reward,
        uint256 timestamp
    );

    event KingdomStatsUpdated(
        address indexed player,
        uint256 kingdomSize,
        uint256 expansionCost,
        uint256 timestamp
    );

    event LeaguePromotion(
        address indexed player,
        string oldLeague,
        string newLeague,
        uint256 newLeagueId,
        uint256 timestamp
    );

    event WinRateUpdated(
        address indexed player,
        uint256 oldWinRate,
        uint256 newWinRate,
        uint256 totalBattles,
        uint256 timestamp
    );

    event PlayerRankingChanged(
        address indexed player,
        uint256 oldRanking,
        uint256 newRanking,
        uint256 totalPlayers,
        uint256 timestamp
    );

    // ============ NUEVO EVENTO PARA HISTORIAL ============
    event BattleRecordSaved(
        address indexed player,
        address indexed opponent,
        bool isAttacker,
        bool won,
        uint256 reward,
        uint256 timestamp
    );

    // Errores personalizados para reducir tamaño
    error InsufficientStake();
    error CooldownActive();
    error InvalidTarget();
    error AmountTooHigh();
    error InsufficientBalance();
    error NotContract();
    error PoolNotInitialized();
    error UserLimitExceeded();
    error AlreadyInitialized();
    error InvalidLeague();
    error BattleLimitReached();
    error NotEnoughPlayers();
    error InvalidLevelRange();
    error InvalidTopN();
    error PlayerNotActive();
    error TutorialAlreadyCompleted();
    error PlayerNotRegistered();
    error InvalidHistoryRange();

    constructor(
        IERC20Metadata _stakedToken,
        IERC20Metadata _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock,
        uint256 _poolLimitPerUser,
        uint256 _numberBlocksForUserLimit
    ) {
        // Inicializar ligas
        leagues.push(League(100 * 10**18, 500 * 10**18, "Bronce", 100));
        leagues.push(League(500 * 10**18, 2000 * 10**18, "Plata", 110));
        leagues.push(League(2000 * 10**18, 10000 * 10**18, "Oro", 125));
        leagues.push(League(10000 * 10**18, type(uint256).max, "Diamante", 150));

        // Inicializar pool de staking
        isInitialized = true;
        stakedToken = _stakedToken;
        rewardToken = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock = block.number + _startBlock;
        bonusEndBlock = block.number + _bonusEndBlock;

        if (_poolLimitPerUser > 0) {
            userLimit = true;
            poolLimitPerUser = _poolLimitPerUser;
            numberBlocksForUserLimit = block.number + _numberBlocksForUserLimit;
        }

        uint256 decimalsRewardToken = uint256(rewardToken.decimals());
        require(decimalsRewardToken < 30, "Must be inferior to 30");
        PRECISION_FACTOR = uint256(10**(uint256(30) - decimalsRewardToken));
        lastRewardBlock = startBlock;
    }

    function deposit(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];

        if (playerRegistrationTime[msg.sender] == 0) {
            playerRegistrationTime[msg.sender] = block.timestamp;
            emit NewPlayerProtection(msg.sender, block.timestamp + PROTECTION_PERIOD);
        }

        _registerPlayer(msg.sender);
        bool hasUserLimitFlag = hasUserLimit();
        if (hasUserLimitFlag && ((_amount + user.amount) > poolLimitPerUser)) {
            revert UserLimitExceeded();
        }
        _updatePool();

        if (user.amount > 0) {
            uint256 pending = (user.amount * accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;
            if (pending > 0) {
                _withdrawRewardToken(pending);
            }
        }

        if (_amount > 0) {
            user.amount = user.amount + _depositStakedToken(_amount);
            user.kingdomSize = user.amount / (1000 * 10**18);
            if (user.playerLevel == 0) {
                user.playerLevel = 1;
                user.battleScore = 1000;
            }
            _updatePlayerLeague(msg.sender);
        }

        user.rewardDebt = (user.amount * accTokenPerShare) / PRECISION_FACTOR;
        emit Deposit(msg.sender, _amount);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function withdraw(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        if (user.amount < _amount) revert AmountTooHigh();

        _updatePool();
        uint256 pending = (user.amount * accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;

        if (_amount > 0) {
            user.amount = user.amount - _amount;
            _withdrawStakedToken(_amount);
            user.kingdomSize = user.amount / (1000 * 10**18);
            _updatePlayerLeague(msg.sender);
        }

        if (pending > 0) {
            _withdrawRewardToken(pending);
        }

        user.rewardDebt = (user.amount * accTokenPerShare) / PRECISION_FACTOR;
        emit Withdraw(msg.sender, _amount);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function emergencyWithdraw() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amountToTransfer = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;

        if (amountToTransfer > 0) {
            _withdrawStakedToken(amountToTransfer);
        }

        emit EmergencyWithdraw(msg.sender, amountToTransfer);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function emergencyPlayerWithdraw() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        if (user.amount == 0) revert InsufficientBalance();

        _updatePool();
        uint256 pending = (user.amount * accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;

        uint256 amountToTransfer = user.amount;
        _withdrawStakedToken(amountToTransfer);

        if (pending > 0) {
            _withdrawRewardToken(pending);
        }

        user.amount = 0;
        user.rewardDebt = 0;
        user.kingdomSize = 0;
        user.playerLevel = 0;
        user.battleScore = 0;

        _removePlayerFromRegistry(msg.sender);

        emit EmergencyWithdraw(msg.sender, amountToTransfer);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function emergencyRewardWithdraw(uint256 _amount) external onlyOwner {
        _withdrawRewardToken(_amount);
    }

    function recoverToken(address _token) external onlyOwner {
        if (_token == address(rewardToken)) revert InvalidTarget();
        uint256 balance = IERC20Metadata(_token).balanceOf(address(this));
        if (_token == address(stakedToken)) {
            balance = balance - stakedTokenAmount;
        }
        if (balance == 0) revert InsufficientBalance();
        IERC20Metadata(_token).safeTransfer(address(msg.sender), balance);
        emit TokenRecovery(_token, balance);
    }

    function stopReward() external onlyOwner {
        bonusEndBlock = block.number;
    }

    function updatePoolLimitPerUser(bool _userLimit, uint256 _poolLimitPerUser) external onlyOwner {
        if (!userLimit) revert UserLimitExceeded();
        if (_userLimit) {
            if (_poolLimitPerUser <= poolLimitPerUser) revert AmountTooHigh();
            poolLimitPerUser = _poolLimitPerUser;
        } else {
            userLimit = _userLimit;
            poolLimitPerUser = 0;
        }
        emit NewPoolLimit(poolLimitPerUser);
    }

    function updateRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {
        if (block.number >= startBlock) revert PoolNotInitialized();
        rewardPerBlock = _rewardPerBlock;
        emit NewRewardPerBlock(_rewardPerBlock);
    }

    function updateStartAndEndBlocks(uint256 _startBlock, uint256 _bonusEndBlock) external onlyOwner {
        if (_startBlock >= _bonusEndBlock) revert InvalidLevelRange();
        startBlock = block.number + _startBlock;
        bonusEndBlock = block.number + _bonusEndBlock;
        lastRewardBlock = startBlock;
        emit NewStartAndEndBlocks(_startBlock, _bonusEndBlock);
    }

    function pendingReward(address _user) external view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        if (block.number > lastRewardBlock && stakedTokenAmount != 0) {
            uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
            uint256 cakeReward = multiplier * rewardPerBlock;
            uint256 adjustedTokenPerShare = accTokenPerShare + (cakeReward * PRECISION_FACTOR) / stakedTokenAmount;
            return (user.amount * adjustedTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;
        } else {
            return (user.amount * accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;
        }
    }

    function attackPlayer(address _defender) external nonReentrant {
        UserInfo storage attacker = userInfo[msg.sender];
        UserInfo storage defender = userInfo[_defender];

        // Validaciones básicas
        if (attacker.amount < MIN_STAKE_FOR_BATTLE) revert InsufficientStake();
        if (defender.amount < MIN_STAKE_FOR_BATTLE) revert InsufficientStake();
        if (block.timestamp < attacker.lastAttackTime + COOLDOWN_PERIOD) revert CooldownActive();
        if (msg.sender == _defender) revert InvalidTarget();
        if (lastDefender[msg.sender] == _defender) revert InvalidTarget();
        if (!_canAttack(msg.sender, _defender)) revert InvalidTarget();

        // Verificar límite diario de batallas
        _checkDailyBattleLimit(msg.sender);

        // Actualizar pool ANTES de cualquier modificación
        _updatePool();

        // Guardar poder antes de la batalla
        uint256 attackerPowerBefore = attacker.amount;
        uint256 defenderPowerBefore = defender.amount;

        // Calcular batalla
        bool attackerWins = calculateBattleWithBalance(attacker.amount, defender.amount, msg.sender, _defender);

        // Actualizar contadores diarios
        if (block.timestamp >= lastBattleDate[msg.sender] + 1 days) {
            dailyBattles[msg.sender] = 0;
            lastBattleDate[msg.sender] = block.timestamp;
        }
        dailyBattles[msg.sender]++;

        attacker.totalBattles++;
        defender.totalBattles++;
        totalBattlesInSystem++;

        attacker.lastAttackTime = block.timestamp;
        lastDefender[msg.sender] = _defender;

        uint256 battleReward = 0;
        uint256 penalty = 0;

        uint256 balanceMultiplier = _getBalanceMultiplier(msg.sender, _defender, attackerWins);

        if (attackerWins) {
            // Actualizar streaks
            consecutiveWins[msg.sender]++;
            consecutiveLosses[msg.sender] = 0;
            consecutiveLosses[_defender]++;
            consecutiveWins[_defender] = 0;

            attacker.battlesWon++;
            battleReward = (defender.amount * MAX_BATTLE_REWARD_PERCENT) / 100;
            battleReward = (battleReward * balanceMultiplier) / 100;

            // Límites de recompensa
            uint256 maxReward = attacker.amount / 10;
            if (battleReward > maxReward) {
                battleReward = maxReward;
            }

            // Protección balance mínimo del defensor
            uint256 defenderMinBalance = (defender.amount * MIN_DEFENDER_BALANCE_PERCENT) / 100;
            if (defender.amount - battleReward < defenderMinBalance) {
                battleReward = defender.amount - defenderMinBalance;
            }

            if (battleReward > 0 && defender.amount > battleReward) {
                // Procesar recompensas pendientes ANTES de modificar amounts
                uint256 attackerPending = (attacker.amount * accTokenPerShare) / PRECISION_FACTOR - attacker.rewardDebt;
                uint256 defenderPending = (defender.amount * accTokenPerShare) / PRECISION_FACTOR - defender.rewardDebt;

                // Transferir recompensas pendientes si existen
                if (attackerPending > 0) {
                    _withdrawRewardToken(attackerPending);
                }
                if (defenderPending > 0) {
                    _withdrawRewardToken(defenderPending);
                }

                // Modificar amounts después de procesar recompensas
                attacker.amount += battleReward;
                defender.amount -= battleReward;

                // Actualizar rewardDebt para ambos jugadores
                attacker.rewardDebt = (attacker.amount * accTokenPerShare) / PRECISION_FACTOR;
                defender.rewardDebt = (defender.amount * accTokenPerShare) / PRECISION_FACTOR;

                _updatePlayerLeague(msg.sender);
                _updatePlayerLeague(_defender);
            }

            // Actualizar battle score
            _updateBattleScore(msg.sender, _defender, true);

            if (balanceMultiplier > 100) {
                emit ComebackBonus(msg.sender, balanceMultiplier);
            }

        } else {
            // Actualizar streaks
            consecutiveLosses[msg.sender]++;
            consecutiveWins[msg.sender] = 0;
            consecutiveWins[_defender]++;
            consecutiveLosses[_defender] = 0;

            defender.battlesWon++;
            penalty = attacker.amount / 1000;

            if (consecutiveLosses[msg.sender] > 2) {
                penalty = penalty / 2;
            }

            if (penalty > 0 && attacker.amount > penalty) {
                // Procesar recompensas pendientes ANTES de modificar amounts
                uint256 attackerPending = (attacker.amount * accTokenPerShare) / PRECISION_FACTOR - attacker.rewardDebt;
                uint256 defenderPending = (defender.amount * accTokenPerShare) / PRECISION_FACTOR - defender.rewardDebt;

                // Transferir recompensas pendientes si existen
                if (attackerPending > 0) {
                    _withdrawRewardToken(attackerPending);
                }
                if (defenderPending > 0) {
                    _withdrawRewardToken(defenderPending);
                }

                // Modificar amounts después de procesar recompensas
                attacker.amount -= penalty;
                defender.amount += penalty;

                // Actualizar rewardDebt para ambos jugadores
                attacker.rewardDebt = (attacker.amount * accTokenPerShare) / PRECISION_FACTOR;
                defender.rewardDebt = (defender.amount * accTokenPerShare) / PRECISION_FACTOR;

                _updatePlayerLeague(msg.sender);
                _updatePlayerLeague(_defender);

                emit BattlePenalty(msg.sender, _defender, penalty);
            }

            // Actualizar battle score
            _updateBattleScore(msg.sender, _defender, false);
        }

        // ============ GUARDAR HISTORIAL ON-CHAIN PARA AMBOS JUGADORES ============
        _saveBattleRecord(
            msg.sender,
            _defender,
            true,  // isAttacker
            attackerWins,
            battleReward,
            attackerPowerBefore,
            defenderPowerBefore
        );

        _saveBattleRecord(
            _defender,
            msg.sender,
            false,  // isAttacker
            !attackerWins,
            battleReward,
            defenderPowerBefore,
            attackerPowerBefore
        );

        // Actualizar win rates
        if (attacker.totalBattles > 0) {
            playerWinRate[msg.sender] = (attacker.battlesWon * 100) / attacker.totalBattles;
        }
        if (defender.totalBattles > 0) {
            playerWinRate[_defender] = (defender.battlesWon * 100) / defender.totalBattles;
        }

        updatePlayerLevel(msg.sender);
        updatePlayerLevel(_defender);

        // NUEVOS EVENTOS PARA ESTADÍSTICAS EN TIEMPO REAL
        emit BattleDetailsUpdated(
            msg.sender,
            _defender,
            attacker.playerLevel,
            defender.playerLevel,
            attacker.amount,
            defender.amount,
            attackerWins,
            battleReward,
            block.timestamp
        );

        _emitPlayerStatsUpdated(msg.sender);
        _emitPlayerStatsUpdated(_defender);
        _emitWinRateUpdated(msg.sender);
        _emitWinRateUpdated(_defender);

        emit BattleResult(msg.sender, _defender, attackerWins, battleReward, block.timestamp);

        if (_isFairMatchAfterBalance(msg.sender, _defender)) {
            emit FairMatchFound(msg.sender, _defender, attacker.amount, defender.amount);
        }
    }

    // ============ NUEVA FUNCIÓN INTERNA PARA GUARDAR HISTORIAL ============
    function _saveBattleRecord(
        address _player,
        address _opponent,
        bool _isAttacker,
        bool _won,
        uint256 _reward,
        uint256 _myPower,
        uint256 _opponentPower
    ) internal {
        // Obtener el índice donde insertar (al final o reemplazar el más antiguo)
        uint256 currentCount = playerBattleCount[_player];

        if (currentCount < MAX_HISTORY_PER_PLAYER) {
            // Todavía hay espacio, agregar al final
            playerBattleHistory[_player].push(BattleRecord({
                opponent: _opponent,
                isAttacker: _isAttacker,
                won: _won,
                reward: _reward,
                timestamp: block.timestamp,
                myPowerAtBattle: _myPower,
                opponentPowerAtBattle: _opponentPower,
                blockNumber: block.number
            }));
            playerBattleCount[_player]++;
        } else {
            // Array lleno, implementar FIFO (eliminar el más antiguo)
            // Mover todos los elementos una posición hacia la izquierda
            for (uint256 i = 0; i < MAX_HISTORY_PER_PLAYER - 1; i++) {
                playerBattleHistory[_player][i] = playerBattleHistory[_player][i + 1];
            }
            // Colocar el nuevo al final
            playerBattleHistory[_player][MAX_HISTORY_PER_PLAYER - 1] = BattleRecord({
                opponent: _opponent,
                isAttacker: _isAttacker,
                won: _won,
                reward: _reward,
                timestamp: block.timestamp,
                myPowerAtBattle: _myPower,
                opponentPowerAtBattle: _opponentPower,
                blockNumber: block.number
            });
        }

        emit BattleRecordSaved(_player, _opponent, _isAttacker, _won, _reward, block.timestamp);
    }

    // ============ NUEVAS FUNCIONES PÚBLICAS PARA CONSULTAR HISTORIAL ============

    /**
     * @dev Obtiene el historial completo de un jugador (máximo MAX_HISTORY_PER_PLAYER)
     */
    function getBattleHistory(address _player) external view returns (BattleRecord[] memory) {
        uint256 count = playerBattleCount[_player];
        if (count == 0) {
            return new BattleRecord[](0);
        }

        // Determinar cuántos registros devolver
        uint256 recordsToReturn = count > MAX_HISTORY_PER_PLAYER ? MAX_HISTORY_PER_PLAYER : count;
        BattleRecord[] memory history = new BattleRecord[](recordsToReturn);

        // Copiar en orden inverso (más reciente primero)
        for (uint256 i = 0; i < recordsToReturn; i++) {
            history[i] = playerBattleHistory[_player][recordsToReturn - 1 - i];
        }

        return history;
    }

    /**
     * @dev Obtiene un rango específico del historial con paginación
     * @param _player Dirección del jugador
     * @param _offset Desde qué posición comenzar (0 = más reciente)
     * @param _limit Cuántos registros devolver
     */
    function getBattleHistoryPaginated(
        address _player,
        uint256 _offset,
        uint256 _limit
    ) external view returns (BattleRecord[] memory) {
        uint256 count = playerBattleCount[_player];
        if (count == 0 || _offset >= count) {
            return new BattleRecord[](0);
        }

        uint256 actualCount = count > MAX_HISTORY_PER_PLAYER ? MAX_HISTORY_PER_PLAYER : count;

        // Calcular cuántos registros podemos devolver
        uint256 available = actualCount - _offset;
        uint256 toReturn = available < _limit ? available : _limit;

        BattleRecord[] memory history = new BattleRecord[](toReturn);

        // Copiar en orden inverso desde el offset
        for (uint256 i = 0; i < toReturn; i++) {
            uint256 index = actualCount - 1 - (_offset + i);
            history[i] = playerBattleHistory[_player][index];
        }

        return history;
    }

    /**
     * @dev Obtiene solo las victorias de un jugador
     */
    function getBattleVictories(address _player) external view returns (BattleRecord[] memory) {
        uint256 count = playerBattleCount[_player];
        if (count == 0) {
            return new BattleRecord[](0);
        }

        uint256 actualCount = count > MAX_HISTORY_PER_PLAYER ? MAX_HISTORY_PER_PLAYER : count;

        // Primer paso: contar victorias
        uint256 victoryCount = 0;
        for (uint256 i = 0; i < actualCount; i++) {
            if (playerBattleHistory[_player][i].won) {
                victoryCount++;
            }
        }

        if (victoryCount == 0) {
            return new BattleRecord[](0);
        }

        // Segundo paso: copiar solo victorias
        BattleRecord[] memory victories = new BattleRecord[](victoryCount);
        uint256 currentIndex = 0;

        for (uint256 i = actualCount; i > 0; i--) {
            if (playerBattleHistory[_player][i - 1].won) {
                victories[currentIndex] = playerBattleHistory[_player][i - 1];
                currentIndex++;
            }
        }

        return victories;
    }

    /**
     * @dev Obtiene solo las derrotas de un jugador
     */
    function getBattleDefeats(address _player) external view returns (BattleRecord[] memory) {
        uint256 count = playerBattleCount[_player];
        if (count == 0) {
            return new BattleRecord[](0);
        }

        uint256 actualCount = count > MAX_HISTORY_PER_PLAYER ? MAX_HISTORY_PER_PLAYER : count;

        // Primer paso: contar derrotas
        uint256 defeatCount = 0;
        for (uint256 i = 0; i < actualCount; i++) {
            if (!playerBattleHistory[_player][i].won) {
                defeatCount++;
            }
        }

        if (defeatCount == 0) {
            return new BattleRecord[](0);
        }

        // Segundo paso: copiar solo derrotas
        BattleRecord[] memory defeats = new BattleRecord[](defeatCount);
        uint256 currentIndex = 0;

        for (uint256 i = actualCount; i > 0; i--) {
            if (!playerBattleHistory[_player][i - 1].won) {
                defeats[currentIndex] = playerBattleHistory[_player][i - 1];
                currentIndex++;
            }
        }

        return defeats;
    }

    /**
     * @dev Obtiene el historial de batallas contra un oponente específico
     */
    function getBattleHistoryVsOpponent(
        address _player,
        address _opponent
    ) external view returns (BattleRecord[] memory) {
        uint256 count = playerBattleCount[_player];
        if (count == 0) {
            return new BattleRecord[](0);
        }

        uint256 actualCount = count > MAX_HISTORY_PER_PLAYER ? MAX_HISTORY_PER_PLAYER : count;

        // Primer paso: contar batallas contra ese oponente
        uint256 vsOpponentCount = 0;
        for (uint256 i = 0; i < actualCount; i++) {
            if (playerBattleHistory[_player][i].opponent == _opponent) {
                vsOpponentCount++;
            }
        }

        if (vsOpponentCount == 0) {
            return new BattleRecord[](0);
        }

        // Segundo paso: copiar batallas contra ese oponente
        BattleRecord[] memory vsHistory = new BattleRecord[](vsOpponentCount);
        uint256 currentIndex = 0;

        for (uint256 i = actualCount; i > 0; i--) {
            if (playerBattleHistory[_player][i - 1].opponent == _opponent) {
                vsHistory[currentIndex] = playerBattleHistory[_player][i - 1];
                currentIndex++;
            }
        }

        return vsHistory;
    }

    function calculateBattleWithBalance(
        uint256 _attackerPower,
        uint256 _defenderPower,
        address _attacker,
        address _defender
    ) public view returns (bool) {
        if (_attackerPower == 0) return false;
        if (_defenderPower == 0) return true;

        UserInfo storage attackerInfo = userInfo[_attacker];
        UserInfo storage defenderInfo = userInfo[_defender];

        uint256 levelBonus = (attackerInfo.playerLevel > defenderInfo.playerLevel) ?
            ((attackerInfo.playerLevel - defenderInfo.playerLevel) * 10) : 0;

        uint256 balanceModifier = _getBattleBalanceModifier(_attacker, _defender);

        uint256 attackerEffectivePower = (_attackerPower * (100 + levelBonus) * balanceModifier) / 10000;
        uint256 totalPower = attackerEffectivePower + _defenderPower;

        uint256 randomSeed = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.difficulty,
            _attacker,
            _defender,
            attackerInfo.totalBattles,
            totalBattlesInSystem
        )));

        uint256 battleOutcome = randomSeed % totalPower;

        return battleOutcome < attackerEffectivePower;
    }

    function updatePlayerLevel(address _player) internal {
        UserInfo storage player = userInfo[_player];

        uint256 battleScore = player.battlesWon * 10;
        uint256 stakeScore = player.amount / (100 * 10**18);
        uint256 kingdomScore = player.kingdomSize * 5;
        uint256 winRateBonus = player.totalBattles > 0 ?
            (player.battlesWon * 100 / player.totalBattles) : 0;

        uint256 totalScore = battleScore + stakeScore + kingdomScore + winRateBonus;
        uint256 newLevel = (totalScore / 50) + 1;

        if (newLevel > 100) newLevel = 100;

        if (newLevel > player.playerLevel) {
            uint256 oldLevel = player.playerLevel;
            player.playerLevel = newLevel;
            emit PlayerLevelUp(_player, newLevel);
            _emitPlayerStatsUpdated(_player);

            if (newLevel > oldLevel + 2) {
                emit LevelUpReward(_player, newLevel, (newLevel - oldLevel) * 10**18);
            }
        }
    }

    function getPlayerStats(address _player) external view returns (
        uint256 level,
        uint256 totalBattles,
        uint256 battlesWon,
        uint256 kingdomSize,
        uint256 nextAttackTime,
        uint256 winRate,
        string memory league,
        uint256 battleScore
    ) {
        UserInfo storage player = userInfo[_player];
        uint256 wins = player.battlesWon;
        uint256 total = player.totalBattles;
        uint256 rate = total > 0 ? (wins * 100) / total : 0;
        string memory playerLeague = _getLeagueName(player.leagueId);

        return (
            player.playerLevel,
            player.totalBattles,
            player.battlesWon,
            player.kingdomSize,
            player.lastAttackTime + COOLDOWN_PERIOD,
            rate,
            playerLeague,
            player.battleScore
        );
    }

    function getExpansionInfo(address _player) external view returns (
        uint256 currentKingdomSize,
        uint256 nextExpansionCost,
        bool canAffordExpansion,
        uint256 playerBalance
    ) {
        UserInfo storage player = userInfo[_player];
        currentKingdomSize = player.kingdomSize;
        nextExpansionCost = (player.kingdomSize + 1) * 5 * 10**18;
        playerBalance = player.amount;
        canAffordExpansion = playerBalance >= nextExpansionCost;

        return (currentKingdomSize, nextExpansionCost, canAffordExpansion, playerBalance);
    }

    function expandKingdom() external nonReentrant {
        UserInfo storage player = userInfo[msg.sender];

        uint256 expansionCost = (player.kingdomSize + 1) * 5 * 10**18;

        if (player.amount < expansionCost) revert InsufficientBalance();

        _updatePool();

        player.amount -= expansionCost;
        player.kingdomSize = player.kingdomSize + 1;

        _updateUserRewardDebt(player);

        _withdrawStakedTokenToBurn(expansionCost);

        emit KingdomExpanded(msg.sender, player.kingdomSize);
        emit KingdomStatsUpdated(
            msg.sender,
            player.kingdomSize,
            expansionCost,
            block.timestamp
        );
        emit TokensBurned(expansionCost, msg.sender);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function _registerPlayer(address player) internal {
        if (!isPlayerRegistered[player]) {
            if (allPlayers.length >= MAX_PLAYERS) {
                emit MaxPlayersReached(allPlayers.length, MAX_PLAYERS);
                return;
            }
            isPlayerRegistered[player] = true;
            allPlayers.push(player);
            playerIndex[player] = allPlayers.length - 1;

            if (playerRegistrationTime[player] == 0) {
                playerRegistrationTime[player] = block.timestamp;
            }

            _updatePlayerLeague(player);

            emit PlayerRegistered(player, block.timestamp);
            _emitPlayerStatsUpdated(player);
        }
    }

    function discoverPlayers(uint256 _maxResults) external nonReentrant returns (address[] memory) {
        if (_maxResults == 0 || _maxResults > 10) revert InvalidTopN();
        if (allPlayers.length <= 1) revert NotEnoughPlayers();

        UserInfo storage user = userInfo[msg.sender];
        if (user.amount < MIN_STAKE_FOR_BATTLE) revert InsufficientStake();

        uint256 discoveryCost = user.amount / 500;
        if (user.amount < discoveryCost) revert InsufficientBalance();

        _updatePool();

        uint256 pending = (user.amount * accTokenPerShare) / PRECISION_FACTOR - user.rewardDebt;
        if (pending > 0) {
            _withdrawRewardToken(pending);
        }

        user.amount -= discoveryCost;
        user.rewardDebt = (user.amount * accTokenPerShare) / PRECISION_FACTOR;

        emit DiscoveryCost(msg.sender, discoveryCost);
        _emitPlayerStatsUpdated(msg.sender);

        address[] memory discovered = new address[](_maxResults);
        uint256 found = 0;
        uint256 attempts = 0;
        uint256 maxAttempts = _maxResults * 5;

        uint256 startIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        ) % allPlayers.length;

        for (uint256 i = 0; i < allPlayers.length && found < _maxResults && attempts < maxAttempts; i++) {
            uint256 currentIndex = (startIndex + i) % allPlayers.length;
            address potentialTarget = allPlayers[currentIndex];

            if (_isValidDiscoveryTarget(msg.sender, potentialTarget)) {
                discovered[found] = potentialTarget;
                _recentlyDiscovered[msg.sender][potentialTarget] = true;
                found++;

                UserInfo storage targetInfo = userInfo[potentialTarget];
                emit PlayerDiscovered(
                    msg.sender,
                    potentialTarget,
                    targetInfo.playerLevel,
                    targetInfo.kingdomSize,
                    targetInfo.amount,
                    block.timestamp
                );
            }
            attempts++;
        }

        _cleanOldDiscoveries(msg.sender);

        address[] memory result = new address[](found);
        for (uint256 j = 0; j < found; j++) {
            result[j] = discovered[j];
        }

        return result;
    }

    function _isValidDiscoveryTarget(address _discoverer, address _target) internal view returns (bool) {
        if (_target == _discoverer) return false;
        if (_recentlyDiscovered[_discoverer][_target]) return false;

        UserInfo storage discoverer = userInfo[_discoverer];
        UserInfo storage target = userInfo[_target];

        return (
            target.amount >= MIN_STAKE_FOR_BATTLE &&
            discoverer.amount >= MIN_STAKE_FOR_BATTLE &&
            target.playerLevel > 0 &&
            _isFairMatch(_discoverer, _target) &&
            _canAttack(_discoverer, _target) &&
            block.timestamp >= discoverer.lastAttackTime + COOLDOWN_PERIOD
        );
    }

    function findPlayersByLevel(uint256 _minLevel, uint256 _maxLevel) external view returns (address[] memory, uint256[] memory) {
        if (_minLevel > _maxLevel) revert InvalidLevelRange();
        if (_maxLevel > 100) revert InvalidLevelRange();

        address[] memory players = new address[](allPlayers.length);
        uint256[] memory levels = new uint256[](allPlayers.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allPlayers.length; i++) {
            address player = allPlayers[i];
            UserInfo storage playerInfo = userInfo[player];
            if (player != msg.sender &&
                playerInfo.playerLevel >= _minLevel &&
                playerInfo.playerLevel <= _maxLevel &&
                playerInfo.amount > 0 &&
                _isFairMatch(msg.sender, player)) {
                players[count] = player;
                levels[count] = playerInfo.playerLevel;
                count++;
            }
        }

        address[] memory finalPlayers = new address[](count);
        uint256[] memory finalLevels = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            finalPlayers[j] = players[j];
            finalLevels[j] = levels[j];
        }
        return (finalPlayers, finalLevels);
    }

    function getTopPlayers(uint256 _topN) external view returns (address[] memory, uint256[] memory, uint256[] memory) {
        if (_topN == 0 || _topN > 50) revert InvalidTopN();

        address[] memory tempPlayers = new address[](allPlayers.length);
        uint256[] memory tempPower = new uint256[](allPlayers.length);
        uint256 validCount = 0;

        for (uint256 i = 0; i < allPlayers.length; i++) {
            address player = allPlayers[i];
            UserInfo storage playerInfo = userInfo[player];
            if (playerInfo.amount > 0) {
                tempPlayers[validCount] = player;
                tempPower[validCount] = playerInfo.amount;
                validCount++;
            }
        }

        for (uint256 i = 0; i < validCount - 1; i++) {
            for (uint256 j = 0; j < validCount - i - 1; j++) {
                if (tempPower[j] < tempPower[j + 1]) {
                    (tempPlayers[j], tempPlayers[j + 1]) = (tempPlayers[j + 1], tempPlayers[j]);
                    (tempPower[j], tempPower[j + 1]) = (tempPower[j + 1], tempPower[j]);
                }
            }
        }

        uint256 resultCount = _topN < validCount ? _topN : validCount;
        address[] memory topPlayers = new address[](resultCount);
        uint256[] memory topPower = new uint256[](resultCount);
        uint256[] memory topLevels = new uint256[](resultCount);

        for (uint256 k = 0; k < resultCount; k++) {
            topPlayers[k] = tempPlayers[k];
            topPower[k] = tempPower[k];
            topLevels[k] = userInfo[tempPlayers[k]].playerLevel;
        }

        return (topPlayers, topPower, topLevels);
    }

    function _isValidTarget(address _attacker, address _defender) internal view returns (bool) {
        if (_defender == _attacker) return false;
        UserInfo storage attacker = userInfo[_attacker];
        UserInfo storage defender = userInfo[_defender];
        return (defender.amount > 0 &&
                block.timestamp >= attacker.lastAttackTime + COOLDOWN_PERIOD &&
                defender.playerLevel > 0);
    }

    function _cleanOldDiscoveries(address player) internal {
        if (block.timestamp >= lastDiscoveryCleanup[player] + 1 days) {
            for (uint256 i = 0; i < allPlayers.length; i++) {
                _recentlyDiscovered[player][allPlayers[i]] = false;
            }
            lastDiscoveryCleanup[player] = block.timestamp;
        }
    }

    function getPlayerProfile(address _player) external view returns (PlayerProfile memory) {
        UserInfo storage player = userInfo[_player];
        uint256 wins = player.battlesWon;
        uint256 total = player.totalBattles;
        uint256 rate = total > 0 ? (wins * 100) / total : 0;
        bool attackable = _isValidTarget(msg.sender, _player) && _isFairMatch(msg.sender, _player);
        string memory playerLeague = _getLeagueName(player.leagueId);

        return PlayerProfile({
            level: player.playerLevel,
            kingdomSize: player.kingdomSize,
            power: player.amount,
            totalBattles: player.totalBattles,
            battlesWon: player.battlesWon,
            winRate: rate,
            canBeAttacked: attackable,
            lastAttackTime: player.lastAttackTime,
            league: playerLeague,
            battleScore: player.battleScore,
            leagueId: player.leagueId
        });
    }

    function getBattleDetails(address _attacker, address _defender) external view returns (BattleDetails memory) {
        UserInfo storage attacker = userInfo[_attacker];
        UserInfo storage defender = userInfo[_defender];

        uint256 levelBonus = (attacker.playerLevel > defender.playerLevel) ?
            ((attacker.playerLevel - defender.playerLevel) * 10) : 0;
        uint256 attackerEffectivePower = (attacker.amount * (100 + levelBonus)) / 100;
        uint256 totalPower = attackerEffectivePower + defender.amount;

        uint256 probability = (attackerEffectivePower * 100) / totalPower;
        if (probability > 95) probability = 95;
        if (probability < 5) probability = 5;

        bool isFair = _isFairMatch(_attacker, _defender);

        return BattleDetails({
            attackerPower: attacker.amount,
            defenderPower: defender.amount,
            attackerLevel: attacker.playerLevel,
            defenderLevel: defender.playerLevel,
            winProbability: probability,
            canAttack: _isValidTarget(_attacker, _defender) && isFair,
            attackerLeague: _getLeagueName(attacker.leagueId),
            defenderLeague: _getLeagueName(defender.leagueId),
            isFairMatch: isFair
        });
    }

    function getPlayerRanking(address _player) external view returns (uint256) {
        uint256 playerPower = userInfo[_player].amount;
        uint256 ranking = 1;

        for (uint256 i = 0; i < allPlayers.length; i++) {
            if (userInfo[allPlayers[i]].amount > playerPower) {
                ranking++;
            }
        }

        return ranking;
    }

    function getGameStats() external view returns (
        uint256 totalPlayers,
        uint256 activePlayers,
        uint256 totalBattles,
        uint256 totalKingdomSize,
        address strongestPlayer,
        uint256 strongestPlayerPower,
        uint256[] memory leagueCounts
    ) {
        totalPlayers = allPlayers.length;
        uint256 battles = 0;
        uint256 kingdomSize = 0;
        uint256 maxPower = 0;
        address strongest = address(0);
        uint256 active = 0;

        leagueCounts = new uint256[](leagues.length);

        for (uint256 i = 0; i < allPlayers.length; i++) {
            UserInfo storage player = userInfo[allPlayers[i]];
            battles += player.totalBattles;
            kingdomSize += player.kingdomSize;
            if (player.amount > 0) {
                active++;

                if (player.leagueId < leagues.length) {
                    leagueCounts[player.leagueId]++;
                }

                if (player.amount > maxPower) {
                    maxPower = player.amount;
                    strongest = allPlayers[i];
                }
            }
        }

        return (totalPlayers, active, battles, kingdomSize, strongest, maxPower, leagueCounts);
    }

    function getTotalPlayers() external view returns (uint256) {
        return allPlayers.length;
    }

    function isPlayer(address _player) external view returns (bool) {
        return isPlayerRegistered[_player];
    }

    function _isFairMatch(address _attacker, address _defender) internal view returns (bool) {
        UserInfo storage attacker = userInfo[_attacker];
        UserInfo storage defender = userInfo[_defender];

        if (attacker.leagueId != defender.leagueId) {
            return false;
        }

        uint256 attackerPower = attacker.amount;
        uint256 defenderPower = defender.amount;
        uint256 maxDifference = (attackerPower * MAX_POWER_DIFFERENCE_PERCENT) / 100;

        return (defenderPower >= attackerPower - maxDifference &&
                defenderPower <= attackerPower + maxDifference);
    }

    function _updatePlayerLeague(address _player) internal {
        UserInfo storage player = userInfo[_player];
        uint256 oldLeague = player.leagueId;
        uint256 newLeague = _getLeagueForTokens(player.amount);
        string memory oldLeagueName = _getLeagueName(oldLeague);
        string memory newLeagueName = _getLeagueName(newLeague);

        if (oldLeague != newLeague) {
            player.leagueId = newLeague;
            emit LeagueChanged(_player, oldLeague, newLeague, newLeagueName);
            emit LeaguePromotion(_player, oldLeagueName, newLeagueName, newLeague, block.timestamp);
            _emitPlayerStatsUpdated(_player);
        }
    }

    function _getLeagueForTokens(uint256 _tokenAmount) internal view returns (uint256) {
        for (uint256 i = 0; i < leagues.length; i++) {
            if (_tokenAmount >= leagues[i].minTokens && _tokenAmount < leagues[i].maxTokens) {
                return i;
            }
        }
        return leagues.length - 1;
    }

    function _getLeagueName(uint256 _leagueId) internal view returns (string memory) {
        if (_leagueId < leagues.length) {
            return leagues[_leagueId].name;
        }
        return "Unknown";
    }

    function _updateBattleScore(address _attacker, address _defender, bool _attackerWon) internal {
        UserInfo storage attacker = userInfo[_attacker];
        UserInfo storage defender = userInfo[_defender];

        uint256 attackerOldScore = attacker.battleScore;
        uint256 defenderOldScore = defender.battleScore;

        if (_attackerWon) {
            uint256 pointsGained = (defender.battleScore * 10) / 100;
            attacker.battleScore += pointsGained;
            defender.battleScore = defender.battleScore > pointsGained ? defender.battleScore - pointsGained : 100;
        } else {
            uint256 pointsGained = (attacker.battleScore * 10) / 100;
            defender.battleScore += pointsGained;
            attacker.battleScore = attacker.battleScore > pointsGained ? attacker.battleScore - pointsGained : 100;
        }

        emit BattleScoreUpdated(_attacker, attackerOldScore, attacker.battleScore);
        emit BattleScoreUpdated(_defender, defenderOldScore, defender.battleScore);
        _emitPlayerStatsUpdated(_attacker);
        _emitPlayerStatsUpdated(_defender);
    }

    function findFairOpponents(uint256 _maxResults) external view returns (address[] memory, uint256[] memory) {
        if (_maxResults == 0 || _maxResults > 10) revert InvalidTopN();

        address[] memory opponents = new address[](_maxResults);
        uint256[] memory powers = new uint256[](_maxResults);
        uint256 count = 0;

        for (uint256 i = 0; i < allPlayers.length && count < _maxResults; i++) {
            address potentialOpponent = allPlayers[i];
            if (potentialOpponent != msg.sender &&
                _isValidTarget(msg.sender, potentialOpponent) &&
                _isFairMatch(msg.sender, potentialOpponent)) {
                opponents[count] = potentialOpponent;
                powers[count] = userInfo[potentialOpponent].amount;
                count++;
            }
        }

        address[] memory finalOpponents = new address[](count);
        uint256[] memory finalPowers = new uint256[](count);

        for (uint256 j = 0; j < count; j++) {
            finalOpponents[j] = opponents[j];
            finalPowers[j] = powers[j];
        }

        return (finalOpponents, finalPowers);
    }

    function getLeagueInfo(uint256 _leagueId) external view returns (
        string memory name,
        uint256 minTokens,
        uint256 maxTokens,
        uint256 rewardMultiplier,
        uint256 playerCount
    ) {
        if (_leagueId >= leagues.length) revert InvalidLeague();
        League storage league = leagues[_leagueId];

        uint256 count = 0;
        for (uint256 i = 0; i < allPlayers.length; i++) {
            if (userInfo[allPlayers[i]].leagueId == _leagueId && userInfo[allPlayers[i]].amount > 0) {
                count++;
            }
        }

        return (
            league.name,
            league.minTokens,
            league.maxTokens,
            league.rewardMultiplier,
            count
        );
    }

    function getPlayerLeague(address _player) external view returns (
        string memory leagueName,
        uint256 leagueId,
        uint256 rewardMultiplier
    ) {
        UserInfo storage player = userInfo[_player];
        if (player.amount == 0) revert PlayerNotActive();

        if (player.leagueId < leagues.length) {
            League storage league = leagues[player.leagueId];
            return (league.name, player.leagueId, league.rewardMultiplier);
        }

        return ("Unknown", player.leagueId, 100);
    }

    function _updateUserRewardDebt(UserInfo storage user) internal {
        _updatePool();
        user.rewardDebt = (user.amount * accTokenPerShare) / PRECISION_FACTOR;
    }

    function _removePlayerFromRegistry(address _player) internal {
        if (isPlayerRegistered[_player]) {
            uint256 index = playerIndex[_player];
            uint256 lastIndex = allPlayers.length - 1;

            if (index != lastIndex) {
                address lastPlayer = allPlayers[lastIndex];
                allPlayers[index] = lastPlayer;
                playerIndex[lastPlayer] = index;
            }

            allPlayers.pop();
            isPlayerRegistered[_player] = false;
            delete playerIndex[_player];

            emit PlayerRemovedFromRegistry(_player);
        }
    }

    // NUEVAS FUNCIONES PARA EMITIR EVENTOS DE ESTADÍSTICAS
    function _emitPlayerStatsUpdated(address _player) internal {
        UserInfo storage player = userInfo[_player];
        uint256 winRate = player.totalBattles > 0 ?
            (player.battlesWon * 100) / player.totalBattles : 0;

        emit PlayerStatsUpdated(
            _player,
            player.playerLevel,
            player.totalBattles,
            player.battlesWon,
            player.kingdomSize,
            player.battleScore,
            winRate,
            block.timestamp
        );
    }

    function _emitWinRateUpdated(address _player) internal {
        UserInfo storage player = userInfo[_player];
        uint256 newWinRate = player.totalBattles > 0 ?
            (player.battlesWon * 100) / player.totalBattles : 0;
        uint256 oldWinRate = playerWinRate[_player];

        if (newWinRate != oldWinRate) {
            playerWinRate[_player] = newWinRate;
            emit WinRateUpdated(
                _player,
                oldWinRate,
                newWinRate,
                player.totalBattles,
                block.timestamp
            );
        }
    }

    // FUNCIÓN PÚBLICA PARA ACTUALIZAR ESTADÍSTICAS MANUALMENTE
    function emitPlayerStats(address _player) external {
        _emitPlayerStatsUpdated(_player);
    }

    function _depositStakedToken(uint256 _amount) internal returns (uint256 _received) {
        uint256 balanceBefore = stakedToken.balanceOf(address(this));
        stakedToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        _received = stakedToken.balanceOf(address(this)) - balanceBefore;
        stakedTokenAmount = stakedTokenAmount + _received;
    }

    function _withdrawStakedToken(uint256 _amount) internal {
        stakedTokenAmount = stakedTokenAmount - _amount;
        stakedToken.safeTransfer(address(msg.sender), _amount);
    }

    function _withdrawStakedTokenToBurn(uint256 _amount) internal {
        stakedTokenAmount = stakedTokenAmount - _amount;
        stakedToken.safeTransfer(BURN_WALLET, _amount);
    }

    function _withdrawRewardToken(uint256 _amount) internal {
        rewardToken.safeTransfer(address(msg.sender), _amount);
        if (rewardToken == stakedToken) {
            if (stakedToken.balanceOf(address(this)) < stakedTokenAmount) revert InsufficientBalance();
        }
    }

    function _updatePool() internal {
        if (block.number <= lastRewardBlock) {
            return;
        }
        if (stakedTokenAmount == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
        uint256 cakeReward = multiplier * rewardPerBlock;
        accTokenPerShare = accTokenPerShare + (cakeReward * PRECISION_FACTOR) / stakedTokenAmount;
        lastRewardBlock = block.number;
    }

    function _getMultiplier(uint256 _from, uint256 _to) internal view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to - _from;
        } else if (_from >= bonusEndBlock) {
            return 0;
        } else {
            return bonusEndBlock - _from;
        }
    }

    function hasUserLimit() public view returns (bool) {
        if (!userLimit || (block.number >= (startBlock + numberBlocksForUserLimit))) {
            return false;
        }
        return true;
    }

    function getCurrentBlock() public view returns (uint256) {
        return block.number;
    }

    // ========== FUNCIONES DE BALANCEO CORREGIDAS ==========

    function completeTutorial() external nonReentrant {
        if (hasCompletedTutorial[msg.sender]) revert TutorialAlreadyCompleted();
        if (playerRegistrationTime[msg.sender] == 0) revert PlayerNotRegistered();

        UserInfo storage player = userInfo[msg.sender];
        if (player.amount < MIN_STAKE_FOR_BATTLE) revert InsufficientStake();

        uint256 tutorialReward = player.amount / 20;

        _updatePool();
        player.amount += tutorialReward;
        _updateUserRewardDebt(player);

        hasCompletedTutorial[msg.sender] = true;

        playerRegistrationTime[msg.sender] = block.timestamp + (PROTECTION_PERIOD / 2);

        emit TutorialCompleted(msg.sender, tutorialReward);
        emit NewPlayerProtection(msg.sender, playerRegistrationTime[msg.sender]);
        _emitPlayerStatsUpdated(msg.sender);
    }

    function getPlayerBalanceInfo(address _player) external view returns (PlayerBalanceInfo memory) {
        uint256 protectionEnd = playerRegistrationTime[_player] + PROTECTION_PERIOD;
        uint256 battlesTodayCount = block.timestamp < lastBattleDate[_player] + 1 days ?
            dailyBattles[_player] : 0;

        return PlayerBalanceInfo({
            registrationTime: playerRegistrationTime[_player],
            protectionEndTime: protectionEnd,
            currentWinStreak: consecutiveWins[_player],
            currentLossStreak: consecutiveLosses[_player],
            winRate: playerWinRate[_player],
            battlesToday: battlesTodayCount,
            hasTutorialBonus: hasCompletedTutorial[_player],
            isNewPlayerFlag: _isNewPlayer(_player),
            isVeteranFlag: _isVeteran(_player)
        });
    }

    function getNewPlayerOpponents() external view returns (address[] memory, uint256[] memory) {
        return findFairOpponentsForNewPlayer(msg.sender);
    }

    // ========== FUNCIONES INTERNAS DE BALANCEO CORREGIDAS ==========

    function _getBalanceMultiplier(address _attacker, address _defender, bool _attackerWon)
        internal view returns (uint256) {

        uint256 multiplier = 100;

        if (!_attackerWon && consecutiveLosses[_attacker] >= 3) {
            multiplier += COMEBACK_BONUS_PERCENT;
        }

        if (_isVeteran(_attacker) && _isNewPlayer(_defender)) {
            multiplier = multiplier * (100 - VETERAN_PENALTY_PERCENT) / 100;
        }

        if (_isNewPlayer(_attacker) && !_isNewPlayer(_defender)) {
            multiplier += NEW_PLAYER_BONUS_PERCENT;
        }

        if (_attackerWon && consecutiveWins[_attacker] >= MAX_WIN_STREAK) {
            multiplier = multiplier * 80 / 100;
        }

        return multiplier;
    }

    function _getBattleBalanceModifier(address _attacker, address _defender)
        internal view returns (uint256) {

        uint256 modifierValue = 100;

        uint256 attackerWinRate = playerWinRate[_attacker];
        uint256 defenderWinRate = playerWinRate[_defender];

        if (attackerWinRate > 70 && defenderWinRate < 30) {
            modifierValue = 80;
        } else if (attackerWinRate < 30 && defenderWinRate > 70) {
            modifierValue = 120;
        }

        if (_isNewPlayer(_attacker) && !_isNewPlayer(_defender)) {
            modifierValue = 115;
        }

        return modifierValue;
    }

    function _checkDailyBattleLimit(address _player) internal {
        if (block.timestamp >= lastBattleDate[_player] + 1 days) {
            dailyBattles[_player] = 0;
            lastBattleDate[_player] = block.timestamp;
        }

        if (dailyBattles[_player] >= MAX_DAILY_BATTLES) revert BattleLimitReached();
    }

    function _canAttack(address _attacker, address _defender) internal view returns (bool) {
        if (_isNewPlayer(_defender) && _isVeteran(_attacker)) {
            return false;
        }

        if (_isNewPlayer(_attacker) && !_isNewPlayer(_defender)) {
            return _isFairMatchForNewPlayer(_attacker, _defender);
        }

        return _isFairMatch(_attacker, _defender);
    }

    function _isNewPlayer(address _player) internal view returns (bool) {
        return block.timestamp < playerRegistrationTime[_player] + PROTECTION_PERIOD;
    }

    function _isVeteran(address _player) internal view returns (bool) {
        return block.timestamp > playerRegistrationTime[_player] + (PROTECTION_PERIOD * 3);
    }

    function _isFairMatchForNewPlayer(address _newPlayer, address _opponent) internal view returns (bool) {
        UserInfo storage newPlayer = userInfo[_newPlayer];
        UserInfo storage opponent = userInfo[_opponent];

        uint256 powerDifference = (opponent.amount * 100) / newPlayer.amount;
        return powerDifference >= 50 && powerDifference <= 150;
    }

    function _isFairMatchAfterBalance(address _attacker, address _defender) internal view returns (bool) {
        if (!_isFairMatch(_attacker, _defender)) {
            return false;
        }

        uint256 winRateDiff = playerWinRate[_attacker] > playerWinRate[_defender] ?
            playerWinRate[_attacker] - playerWinRate[_defender] :
            playerWinRate[_defender] - playerWinRate[_attacker];

        return winRateDiff <= 40;
    }

    function findFairOpponentsForNewPlayer(address _player) internal view returns (address[] memory, uint256[] memory) {
        if (userInfo[_player].amount == 0) revert PlayerNotActive();

        address[] memory opponents = new address[](10);
        uint256[] memory powers = new uint256[](10);
        uint256 count = 0;

        bool isNewPlayerFlag = _isNewPlayer(_player);

        for (uint256 i = 0; i < allPlayers.length && count < 10; i++) {
            address potentialOpponent = allPlayers[i];

            if (potentialOpponent != _player &&
                _isValidTarget(_player, potentialOpponent) &&
                _isSuitableForNewPlayer(_player, potentialOpponent, isNewPlayerFlag)) {

                opponents[count] = potentialOpponent;
                powers[count] = userInfo[potentialOpponent].amount;
                count++;
            }
        }

        address[] memory finalOpponents = new address[](count);
        uint256[] memory finalPowers = new uint256[](count);

        for (uint256 j = 0; j < count; j++) {
            finalOpponents[j] = opponents[j];
            finalPowers[j] = powers[j];
        }

        return (finalOpponents, finalPowers);
    }

    function _isSuitableForNewPlayer(address _player, address _opponent, bool _isNewPlayerFlag)
        internal view returns (bool) {

        if (_isNewPlayerFlag) {
            return _isNewPlayer(_opponent) || _isFairMatchForNewPlayer(_player, _opponent);
        }

        return _isFairMatch(_player, _opponent);
    }
}
