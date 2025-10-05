# Multi-Wallet Support

Kingdom Stakers now supports multiple Web3 wallets, making it accessible to users across different platforms and preferences.

## Supported Wallets

The application automatically detects and connects to any of the following wallets:

### 1. **MetaMask**
- Most popular Ethereum wallet
- Available as browser extension and mobile app
- Download: https://metamask.io

### 2. **Trust Wallet**
- Multi-chain mobile wallet with WalletConnect support
- Built-in dApp browser
- Download: https://trustwallet.com

### 3. **Bitget Wallet**
- Supports 130+ blockchains
- Advanced security features with MPC technology
- Download: https://web3.bitget.com

### 4. **SafePal**
- Hardware and software wallet solution
- EIP-1193 compatible
- Download: https://www.safepal.com

### 5. **TokenPocket**
- Multi-chain wallet supporting 20+ blockchains
- Comprehensive DeFi support
- Download: https://www.tokenpocket.pro

### 6. **Binance Web3 Wallet**
- Integrated with Binance ecosystem
- Supports 60+ blockchains
- Available through Binance mobile app
- More info: https://www.binance.com/en/web3wallet

## How It Works

The application uses an intelligent wallet detection system that:

1. **Auto-Detection**: Automatically detects all installed Web3 wallets in your browser
2. **Priority Selection**: Connects to the first available wallet in the priority order
3. **Universal Compatibility**: All wallets are treated equally through the standard EIP-1193 interface
4. **Chain Switching**: Automatically switches or adds the Core Blockchain network

## Technical Implementation

### Detection Order
The wallets are detected in the following priority:
1. Trust Wallet (`window.trustwallet`)
2. Bitget Wallet (`window.bitkeep.ethereum`)
3. SafePal (`window.safepalProvider`)
4. TokenPocket (`window.tokenpocket.ethereum`)
5. Binance Web3 Wallet (`window.binancew3w.ethereum`)
6. MetaMask / Generic (`window.ethereum`)

### Events Handled
- Account changes
- Network/chain changes
- Disconnection

### Standards Compliance
- EIP-1193: JavaScript Ethereum Provider API
- EIP-6963: Multi Injected Provider Discovery (future support)

## User Experience

When you click "Connect Wallet", the application will:
1. Detect all available wallets
2. Connect to your preferred wallet
3. Display the wallet name in the header
4. Show your connected address

The header now displays both:
- The name of the connected wallet (e.g., "Trust Wallet", "MetaMask")
- Your wallet address

## For Mobile Users

### WalletConnect Support
Trust Wallet, Bitget Wallet, and Binance Web3 Wallet support WalletConnect protocol for connecting from mobile devices via QR code scanning.

### In-App Browser
For the best mobile experience:
- Trust Wallet: Use the built-in dApp browser
- Bitget Wallet: Access through the wallet's browser
- Binance Web3 Wallet: Use the Binance app's Web3 section

## Security Features

All supported wallets provide:
- Non-custodial key management (you control your private keys)
- Secure transaction signing
- Network verification
- Phishing protection

### Enhanced Security by Wallet

- **MetaMask**: Industry-standard security practices
- **Trust Wallet**: Open source, community audited
- **Bitget Wallet**: MPC technology, no seed phrase required
- **SafePal**: Hardware wallet option available
- **TokenPocket**: Multi-layer security architecture
- **Binance Web3 Wallet**: MPC technology with three-key-share system

## Troubleshooting

### Wallet Not Detected
1. Ensure the wallet extension is installed and enabled
2. Refresh the page after installing a wallet
3. Check that you're logged into your wallet

### Connection Issues
1. Make sure you're on a supported network (Core Blockchain)
2. The app will automatically prompt to add/switch networks
3. Clear browser cache if experiencing persistent issues

### Multiple Wallets Installed
If you have multiple wallets installed:
- The app will connect to the first detected wallet
- To use a different wallet, disable other wallet extensions temporarily
- Or use your preferred wallet's in-app browser

## Development Notes

The multi-wallet implementation maintains full backward compatibility with the existing MetaMask-only setup. No breaking changes were introduced to:
- Smart contract interactions
- Transaction signing
- State management
- User interface components (except header display)

All wallets interact with the blockchain through the same standardized interface, ensuring consistent behavior across all supported wallets.
