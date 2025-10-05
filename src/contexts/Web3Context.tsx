import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { web3Service } from '../lib/web3';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
  walletName: string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string>('');

  useEffect(() => {
    checkConnection();

    const providers = [
      window.ethereum,
      (window as any).trustwallet,
      (window as any).bitkeep?.ethereum,
      (window as any).safepalProvider,
      (window as any).tokenpocket?.ethereum,
      (window as any).binancew3w?.ethereum
    ].filter(Boolean);

    providers.forEach(provider => {
      if (provider) {
        provider.on?.('accountsChanged', handleAccountsChanged);
        provider.on?.('chainChanged', () => window.location.reload());
      }
    });

    return () => {
      providers.forEach(provider => {
        if (provider) {
          provider.removeListener?.('accountsChanged', handleAccountsChanged);
        }
      });
    };
  }, []);

  const checkConnection = async () => {
    const providers = [
      window.ethereum,
      (window as any).trustwallet,
      (window as any).bitkeep?.ethereum,
      (window as any).safepalProvider,
      (window as any).tokenpocket?.ethereum,
      (window as any).binancew3w?.ethereum
    ].filter(Boolean);

    for (const provider of providers) {
      try {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connect();
          break;
        }
      } catch (err) {
        console.error('Error checking connection:', err);
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const address = await web3Service.connect();
      setAccount(address);
      setWalletName(web3Service.getCurrentWalletName());
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected: !!account,
        isConnecting,
        connect,
        disconnect,
        error,
        walletName,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
