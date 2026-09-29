import { useState, useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Home from '@/pages/Home';
import Store from '@/pages/Store';

type Page = 'home' | 'store';

function App() {
  const [page, setPage] = useState<Page>('home');

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = page === 'store' ? 'VoltEdge Store — Electrical Products' : 'VoltEdge — Electrical Services & Store';
  }, [page]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header currentPage={page} onNavigate={handleNavigate} />
        {page === 'home' ? <Home onNavigate={handleNavigate} /> : <Store onNavigate={handleNavigate} />}
        <Footer onNavigate={handleNavigate} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
