import { Crown, Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { NotificationBell } from './NotificationBell';

export function Header() {
  const { account, isConnected, isConnecting, connect, disconnect, walletName } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-amber-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
              <Crown className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 text-glow">
                Kingdom Stakers
              </h1>
              <p className="text-xs text-slate-400">Build. Battle. Conquer.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <NotificationBell />
                <div className="card-gradient px-4 py-2 rounded-lg flex flex-col">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-amber-400">{walletName}</span>
                  </div>
                  <span className="text-sm font-mono text-slate-300">{formatAddress(account!)}</span>
                </div>
                <button
                  onClick={disconnect}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="w-5 h-5" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
