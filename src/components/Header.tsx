import { Zap, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  currentPage: 'home' | 'store';
  onNavigate: (page: 'home' | 'store') => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const navLink = (page: 'home' | 'store', label: string) => (
    <button
      onClick={() => {
        onNavigate(page);
        setMobileOpen(false);
      }}
      className={`relative font-medium transition-colors hover:text-amber-400 ${
        currentPage === page ? 'text-amber-400' : 'text-gray-300'
      }`}
    >
      {label}
      {currentPage === page && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-400" />
      )}
    </button>
  );

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-900/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30">
            <Zap className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Chohan<span className="text-amber-400"> Electric <span className='text-white'>Store</span></span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLink('home', 'Home')}
          {navLink('store', 'Shop')}
          <a href="#services" className="font-medium text-gray-300 transition-colors hover:text-amber-400">
            Services
          </a>
          <a href="#booking" className="font-medium text-gray-300 transition-colors hover:text-amber-400">
            Book Now
          </a>
          <a href="#contact" className="font-medium text-gray-300 transition-colors hover:text-amber-400">
            Contact
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-200 transition-all hover:bg-white/10 hover:text-amber-400"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-slate-900">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-200 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-slate-900 px-6 py-4 md:hidden">
          {navLink('home', 'Home')}
          {navLink('store', 'Shop')}
          <a href="#services" onClick={() => setMobileOpen(false)} className="font-medium text-gray-300 hover:text-amber-400">
            Services
          </a>
          <a href="#booking" onClick={() => setMobileOpen(false)} className="font-medium text-gray-300 hover:text-amber-400">
            Book Now
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="font-medium text-gray-300 hover:text-amber-400">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
