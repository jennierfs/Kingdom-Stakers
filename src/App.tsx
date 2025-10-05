import { Web3Provider } from './contexts/Web3Context';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GameDashboard } from './components/GameDashboard';
import { GameStats } from './components/GameStats';
import { Footer } from './components/Footer';
import { useWeb3 } from './contexts/Web3Context';

function AppContent() {
  const { isConnected } = useWeb3();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {!isConnected ? (
          <>
            <Hero />
            <GameStats />
          </>
        ) : (
          <GameDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}

export default App;
