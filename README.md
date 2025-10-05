# Kingdom Stakers - Blockchain RPG Strategy Game

An epic blockchain-based RPG strategy game built on Core DAO where players stake Bugs Bunny tokens, build kingdoms, and battle for glory and rewards.

## Features

### Core Gameplay
- **Staking System**: Stake Bugs Bunny tokens to join the game and earn passive rewards
- **Kingdom Building**: Expand your territory to increase power and defensive strength
- **Battle Arena**: Challenge other players in fair, league-matched combat
- **League System**: Progress through Bronze, Silver, Gold, and Diamond leagues
- **Level Progression**: Gain levels through victories and kingdom expansion
- **Leaderboard**: Compete for the top spots and become the strongest kingdom

### Game Mechanics
- **Fair Matchmaking**: Only battle players in your league with similar power levels
- **Protected Stakes**: Defenders keep at least 80% of their stake even after defeat
- **Strategic Cooldowns**: 4-hour cooldown between attacks encourages thoughtful gameplay
- **Dynamic Scoring**: Battle scores adjust based on wins, losses, and opponent strength
- **Token Burns**: Kingdom expansions permanently remove Bugs Bunny tokens from circulation
- **Blockchain Secured**: All actions verified on Core DAO blockchain

## Smart Contract

- **Network**: Core DAO Blockchain
- **Contract Address**: `0x955F8512004aD78c80AAf2BF6206baCDbc140196`
- **Chain ID**: 1116
- **RPC URL**: https://rpc.coredao.org
- **Explorer**: https://scan.coredao.org/address/0x955F8512004aD78c80AAf2BF6206baCDbc140196

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Ethers.js v6
- **Build Tool**: Vite
- **Blockchain**: Core DAO

## Getting Started

### Prerequisites
- Node.js 18+
- MetaMask or compatible Web3 wallet
- CORE tokens for gas fees
- Bugs Bunny tokens for staking

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## How to Play

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Stake Bugs Bunny**: Navigate to Staking tab and deposit Bugs Bunny tokens (minimum 100 for battles)
3. **Build Kingdom**: Expand your territory in the Kingdom tab
4. **Find Opponents**: Use Battle Arena to discover fair opponents in your league
5. **Attack**: Challenge players and win rewards based on battle outcomes
6. **Climb Ranks**: Progress through leagues and climb the leaderboard

## Game Rules

### Leagues
- **Bronze**: 100 - 500 tokens (100% rewards)
- **Silver**: 500 - 2,000 tokens (110% rewards)
- **Gold**: 2,000 - 10,000 tokens (125% rewards)
- **Diamond**: 10,000+ tokens (150% rewards)

### Battle System
- Only attack players in your own league
- 4-hour cooldown between attacks
- Win probability based on power and level
- Rewards capped at 1% of defender's stake
- Failed attacks incur 0.1% penalty

### Kingdom Expansion
- Costs increase with each expansion: (kingdomSize + 1) × 500 tokens
- Tokens are burned permanently
- Increases defensive strength and power
- Contributes to overall level progression

## Contract Functions

### Player Actions
- `deposit(uint256 _amount)` - Stake Bugs Bunny tokens
- `withdraw(uint256 _amount)` - Unstake Bugs Bunny tokens
- `attackPlayer(address _defender)` - Challenge another player
- `expandKingdom()` - Grow your territory
- `discoverPlayers(uint256 _maxResults)` - Find opponents
- `resetCooldown()` - Pay to reset attack cooldown

### View Functions
- `getPlayerStats(address)` - Get player statistics
- `getPlayerProfile(address)` - Get detailed player profile
- `getBattleDetails(address, address)` - Preview battle outcome
- `getTopPlayers(uint256)` - Get leaderboard
- `findFairOpponents(uint256)` - Find matched opponents
- `getLeagueInfo(uint256)` - Get league details

## Security Features

- ReentrancyGuard protection
- Fair matchmaking constraints
- Protected defender stakes (80% minimum)
- Cooldown enforcement
- League-based combat restrictions
- RLS (Row Level Security) on all data

## Support

For issues or questions:
- Check the smart contract on Core DAO Explorer
- Review transaction history for debugging
- Ensure sufficient token approval before staking

## License

MIT

---

**Built on Core DAO** | **Powered by Smart Contracts** | **Play to Earn**
