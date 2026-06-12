import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import HeroBanner from '../marketplace/HeroBanner';
import ProductCard from '../marketplace/ProductCard';
import ProductDetailsModal from '../marketplace/ProductDetailsModal';

const CATEGORIES = ['All Categories', 'Books', 'Calculators', 'Electronics', 'Bicycles', 'Lab Equipment', 'Hostel Essentials', 'Stationery', 'Furniture', 'Miscellaneous'];
const CONDITIONS = ['All Conditions', 'New', 'Like New', 'Good', 'Fair'];
const SORTS = ['Newest First', 'Oldest First', 'Price Low to High', 'Price High to Low', 'Most Viewed', 'Most Wishlisted'];

const BrowseMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [condition, setCondition] = useState('All Conditions');
  const [sort, setSort] = useState('Newest First');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      // Build query string
      const query = new URLSearchParams({
        page,
        limit: 12,
        ...(search && { search }),
        ...(category !== 'All Categories' && { category }),
        ...(condition !== 'All Conditions' && { condition }),
        ...(sort && { sort })
      }).toString();

      const [productsRes, statsRes, trendingRes] = await Promise.all([
        fetch(`http://localhost:5000/api/marketplace/products?${query}`),
        fetch(`http://localhost:5000/api/marketplace/stats`),
        fetch(`http://localhost:5000/api/marketplace/trending-categories`)
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
      if (statsRes.ok) setStats(await statsRes.json());
      if (trendingRes.ok) setTrending(await trendingRes.json());
      
    } catch (error) {
      console.error('Failed to fetch marketplace data:', error);
      // Fallback or error state could be handled here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, [category, condition, sort, page]); // Search triggered manually or debounced

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMarketplaceData();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All Categories');
    setCondition('All Conditions');
    setSort('Newest First');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <HeroBanner stats={stats} />

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl border-y border-slate-200 py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:static">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands, or items..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 outline-none transition-all font-medium"
            />
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <select 
              value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-theme-maroon flex-1 sm:flex-none"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select 
              value={condition} onChange={(e) => { setCondition(e.target.value); setPage(1); }}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-theme-maroon flex-1 sm:flex-none hidden md:block"
            >
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-theme-maroon flex-1 sm:flex-none"
            >
              {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button 
              type="button" onClick={clearFilters}
              className="px-4 py-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 font-bold rounded-xl transition-colors flex items-center justify-center"
              title="Clear Filters"
            >
              <X className="w-5 h-5" />
            </button>
            
            <button type="submit" className="px-6 py-2.5 bg-theme-maroon text-white font-bold rounded-xl hover:bg-theme-dark-maroon shadow-md transition-colors hidden sm:block">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Extra Sections (Horizontal Scroll or Grid) */}
      {!loading && products.length > 0 && (
        <div className="space-y-12 mb-12">
          {/* Trending Categories */}
          {trending.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Trending Categories</h2>
              </div>
              <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
                {trending.map((t, i) => (
                  <div key={i} className="flex-shrink-0 w-48 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-theme-maroon/50 hover:shadow-md transition-all group">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔥</span>
                    <h3 className="font-bold text-slate-900 text-center">{t.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{t.listings} Listings</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Price Drops (Simulated by filtering products with originalPrice) */}
          {products.filter(p => p.originalPrice).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-red-500">📉</span> Price Drop Alerts
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p => p.originalPrice).slice(0, 4).map(product => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    onViewDetails={(p) => setSelectedProduct(p)} 
                    onWishlist={(id) => console.log('Wishlist', id)} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Most Viewed (Simulated by sorting products by views) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Most Viewed Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...products].sort((a,b) => b.views - a.views).slice(0, 4).map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onViewDetails={(p) => setSelectedProduct(p)} 
                  onWishlist={(id) => console.log('Wishlist', id)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">All Products</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Showing page {page} of {totalPages}</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 h-80 animate-pulse">
                <div className="h-48 bg-slate-200 rounded-t-2xl mb-4"></div>
                <div className="px-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/4 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onViewDetails={(p) => {
                  setSelectedProduct(p);
                  fetch(`http://localhost:5000/api/marketplace/products/${p._id}`).catch(e => console.error(e));
                }} 
                onWishlist={(id) => console.log('Wishlist', id)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">We couldn't find any items matching your current filters. Try broadening your search or clearing filters.</p>
            <button onClick={clearFilters} className="px-6 py-2.5 bg-theme-maroon text-white font-bold rounded-xl hover:bg-theme-dark-maroon transition-colors">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition-colors ${page === i + 1 ? 'bg-theme-maroon text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default BrowseMarketplace;
