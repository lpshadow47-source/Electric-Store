import { useState, useMemo } from 'react';
import { Star, Search, SlidersHorizontal, ShoppingBag, ArrowLeft, Plus } from 'lucide-react';
import { products, productCategories, type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface StoreProps {
  onNavigate: (page: 'home' | 'store') => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export default function Store({ onNavigate }: StoreProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<number>(250);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.price <= priceRange);

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Store hero */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Volt<span className="text-amber-400">Edge</span> Store
              </h1>
              <p className="mt-2 text-gray-400">
                Quality electrical products — lights, sockets, buttons, holders, fans &amp; more
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
              <ShoppingBag className="h-4 w-4" />
              {filteredProducts.length} products available
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar filters */}
          <aside className="space-y-6">
            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Categories</h3>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Max Price</h3>
              <input
                type="range"
                min={10}
                max={250}
                step={10}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>$10</span>
                <span className="font-semibold text-slate-900">${priceRange}</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <SlidersHorizontal className="h-4 w-4" />
                Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                    setPriceRange(250);
                  }}
                  className="mt-4 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-900">
                          {product.badge}
                        </span>
                      )}
                      {product.oldPrice && (
                        <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">{product.category}</span>
                      </div>
                      <h3 className="mb-1 font-semibold text-slate-900">{product.name}</h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-500">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-slate-900">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-amber-500 hover:text-slate-900"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <h3 className="text-xl font-bold text-white">Need help installing your purchase?</h3>
            <p className="mt-1 text-gray-400">Our certified electricians can install any product from our store.</p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-all hover:brightness-110"
          >
            Book Installation Service
          </button>
        </div>
      </section>
    </div>
  );
}
