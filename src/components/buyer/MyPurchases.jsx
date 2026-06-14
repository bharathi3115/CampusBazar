import React from 'react';
import { 
  Package, 
  Star, 
  Calendar, 
  Download, 
  MessageSquare,
  Clock,
  CheckCircle,
  Hash,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const DUMMY_PURCHASES = [
  {
    _id: 'p1',
    productName: 'Engineering Graphics Textbook',
    category: 'Books',
    purchasePrice: 250,
    sellerName: 'Rahul S.',
    sellerRating: 4.8,
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
    transactionId: 'TXN-982374',
    productImage: '/engineering_graphics.png'
  },
  {
    _id: 'p2',
    productName: 'Casio Scientific Calculator FX-991ES',
    category: 'Calculators',
    purchasePrice: 500,
    sellerName: 'Priya M.',
    sellerRating: 4.9,
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
    transactionId: 'TXN-982301',
    productImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop'
  },
  {
    _id: 'p3',
    productName: 'Physics Lab Coat',
    category: 'Lab Equipment',
    purchasePrice: 300,
    sellerName: 'Prof. Sharma',
    sellerRating: 5.0,
    purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Pending Pickup',
    transactionId: 'TXN-981155',
    productImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop'
  }
];

const MyPurchases = () => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Pending Pickup':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Pickup
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
            <Package className="w-8 h-8 text-theme-maroon" />
            My Purchases
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">Track your order history and manage your items.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search purchases..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon w-full sm:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {DUMMY_PURCHASES.map((purchase) => (
          <div key={purchase._id} className="group border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-slate-300 hover:shadow-lg transition-all bg-white relative overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Product Image */}
              <div className="w-full sm:w-40 h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                {purchase.productImage ? (
                  <img src={purchase.productImage} alt={purchase.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  {getStatusBadge(purchase.status)}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-theme-maroon bg-theme-maroon/5 px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                        {purchase.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-theme-maroon transition-colors">{purchase.productName}</h3>
                      <div className="text-sm font-medium text-slate-500 flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Hash className="w-4 h-4 text-slate-400" /> ID: {purchase.transactionId}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-slate-400" /> {formatDate(purchase.purchaseDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Paid</div>
                      <div className="text-2xl font-black text-slate-900">₹{purchase.purchasePrice.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* Seller Info & Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4 pt-4 border-t border-slate-100 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                      <span className="text-sm font-bold text-slate-600">{purchase.sellerName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 mb-0.5">
                        Seller: {purchase.sellerName}
                      </div>
                      <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                        {purchase.sellerRating} / 5.0
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex">
                      <MessageSquare className="w-4 h-4" /> Message Seller
                    </button>
                    <button className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex">
                      <Download className="w-4 h-4" /> Invoice
                    </button>
                    <button className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-theme-maroon hover:bg-theme-dark-maroon rounded-xl transition-colors shadow-sm shadow-theme-maroon/20 flex">
                      Order Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
