interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
  selectedAddress?: string;
}

interface Window {
  ethereum?: EthereumProvider;
  trustwallet?: EthereumProvider;
  bitkeep?: {
    ethereum?: EthereumProvider;
  };
  safepalProvider?: EthereumProvider;
  tokenpocket?: {
    ethereum?: EthereumProvider;
  };
  binancew3w?: {
    ethereum?: EthereumProvider;
  };
}
