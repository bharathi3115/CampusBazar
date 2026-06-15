import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../marketplace/ProductCard';
import ProductDetailsModal from '../marketplace/ProductDetailsModal';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['All Categories', 'Books', 'Calculators', 'Electronics', 'Bicycles', 'Lab Equipment', 'Hostel Essentials', 'Stationery', 'Furniture', 'Miscellaneous'];
const CONDITIONS = ['All Conditions', 'New', 'Like New', 'Good', 'Fair'];
const SORTS = ['Newest First', 'Oldest First', 'Price Low to High', 'Price High to Low', 'Most Wishlisted'];

const DUMMY_PRODUCTS = [
  {
    _id: '1',
    title: 'Engineering Graphics Textbook',
    price: 250,
    category: 'Books',
    condition: 'Like New',
    seller: { name: 'Rahul S.', verified: true, rating: 4.8 },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 120,
    wishlistCount: 15,
    img: '/engineering_graphics.png',
    status: 'Active'
  },
  {
    _id: '2',
    title: 'Physics Lab Manual',
    price: 180,
    category: 'Books',
    condition: 'Good',
    seller: { name: 'Priya M.', verified: false, rating: 4.2 },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 45,
    wishlistCount: 5,
    img: '/physics_lab_manual.png',
    status: 'Active'
  },
  {
    _id: '3',
    title: 'Casio Scientific Calculator FX-991ES',
    price: 500,
    category: 'Calculators',
    condition: 'Excellent',
    seller: { name: 'Akash K.', verified: true, rating: 4.9 },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    views: 300,
    wishlistCount: 50,
    img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '4',
    title: 'Mountain Bicycle',
    price: 3500,
    category: 'Bicycles',
    condition: 'Good',
    seller: { name: 'Arjun P.', verified: false, rating: 4.5 },
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    views: 210,
    wishlistCount: 30,
    img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '5',
    title: 'Laptop Cooling Pad',
    price: 450,
    category: 'Electronics',
    condition: 'Like New',
    seller: { name: 'Neha S.', verified: true, rating: 4.7 },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views: 80,
    wishlistCount: 12,
    img: '/laptop_cooling_pad.png',
    status: 'Active'
  },
  {
    _id: '6',
    title: 'Bluetooth Headphones',
    price: 800,
    category: 'Electronics',
    condition: 'Good',
    seller: { name: 'Kiran R.', verified: true, rating: 4.6 },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    views: 150,
    wishlistCount: 20,
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '7',
    title: 'Physics Lab Coat',
    price: 300,
    category: 'Lab Equipment',
    condition: 'Excellent',
    seller: { name: 'Prof. Sharma', verified: true, rating: 4.9 },
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    views: 65,
    wishlistCount: 8,
    img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '8',
    title: 'Study Chair',
    price: 1200,
    category: 'Furniture',
    condition: 'Good',
    seller: { name: 'Deepak M.', verified: false, rating: 4.3 },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 110,
    wishlistCount: 14,
    img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '9',
    title: 'Data Structures Textbook',
    price: 350,
    category: 'Books',
    condition: 'Like New',
    seller: { name: 'Anjali P.', verified: true, rating: 4.8 },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 90,
    wishlistCount: 22,
    img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '10',
    title: 'Extension Board',
    price: 150,
    category: 'Hostel Essentials',
    condition: 'Good',
    seller: { name: 'Rohit K.', verified: false, rating: 4.1 },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    views: 40,
    wishlistCount: 5,
    img: '/extension_board.png',
    status: 'Active'
  },
  {
    _id: '11',
    title: 'Printer',
    price: 2500,
    category: 'Electronics',
    condition: 'Fair',
    seller: { name: 'Harsh V.', verified: true, rating: 4.5 },
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    views: 180,
    wishlistCount: 25,
    img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  },
  {
    _id: '12',
    title: 'College Backpack',
    price: 400,
    category: 'Miscellaneous',
    condition: 'Good',
    seller: { name: 'Sneha R.', verified: false, rating: 4.4 },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views: 100,
    wishlistCount: 18,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&h=400&fit=crop',
    status: 'Active'
  }
];

const BrowseMarketplace = ({ setActiveTab }) => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuth();
  
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
      } else {
        throw new Error('Backend request failed');
      }
      if (statsRes.ok) setStats(await statsRes.json());
      if (trendingRes.ok) setTrending(await trendingRes.json());
      
    } catch (error) {
      console.error('Failed to fetch marketplace data:', error);
      // Fallback to DUMMY_PRODUCTS
      let filtered = [...DUMMY_PRODUCTS];
      if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
      if (category !== 'All Categories') filtered = filtered.filter(p => p.category === category);
      if (condition !== 'All Conditions') filtered = filtered.filter(p => p.condition === condition);
      
      switch (sort) {
        case 'Price Low to High': filtered.sort((a,b) => a.price - b.price); break;
        case 'Price High to Low': filtered.sort((a,b) => b.price - a.price); break;

        case 'Most Wishlisted': filtered.sort((a,b) => b.wishlistCount - a.wishlistCount); break;
        case 'Oldest First': filtered.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
        case 'Newest First': 
        default: filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      }
      setProducts(filtered);
      setTotalPages(1);
      
      setStats({
        activeListings: DUMMY_PRODUCTS.length,
        studentsOnline: 124,
        verifiedSellers: 8,
        itemsSoldThisWeek: 42
      });
      
      setTrending([
        { name: 'Books', listings: 4 },
        { name: 'Electronics', listings: 3 },
        { name: 'Calculators', listings: 1 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMarketplaceData();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category, condition, sort, page]);

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

  const handleMessageSeller = async (product) => {
    try {
      const res = await fetch('http://localhost:5000/api/messages/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerId: user._id,
          productId: product._id
        })
      });
      if (res.ok) {
        // Conversation created, switch to messages tab
        setActiveTab('messages');
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to initiate chat.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl border-y border-slate-200 py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:static">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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
                onMessage={handleMessageSeller}
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

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          setActiveTab={setActiveTab}
          onMessage={handleMessageSeller}
        />
      )}
    </div>
  );
};

export default BrowseMarketplace;
