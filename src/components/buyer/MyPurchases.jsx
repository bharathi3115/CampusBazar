import React, { useState, useEffect } from "react";
import { Package, Star, Calendar, Download, MessageSquare, Clock, CheckCircle, Hash, ChevronRight, Filter, Search, X } from "lucide-react";
import { jsPDF } from "jspdf";

const DUMMY_PURCHASES = [
  {
    _id: "p1",
    productName: "Engineering Graphics Textbook",
    category: "Books",
    purchasePrice: 250,
    sellerName: "Rahul S.",
    sellerRating: 4.8,
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Completed",
    transactionId: "TXN-982374",
    productImage: "/engineering_graphics.png"
  },
  {
    _id: "p2",
    productName: "Casio Scientific Calculator FX-991ES",
    category: "Calculators",
    purchasePrice: 500,
    sellerName: "Priya M.",
    sellerRating: 4.9,
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Completed",
    transactionId: "TXN-982301",
    productImage: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop"
  },
  {
    _id: "p3",
    productName: "Physics Lab Coat",
    category: "Lab Equipment",
    purchasePrice: 300,
    sellerName: "Prof. Sharma",
    sellerRating: 5.0,
    purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Pending Pickup",
    transactionId: "TXN-981155",
    productImage: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop"
  }
];

const MyPurchases = ({ setActiveTab }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/purchases?limit=50`);
      if (!response.ok) throw new Error("Failed to fetch purchases");
      const result = await response.json();
      setPurchases(result.purchases || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (purchase) => {
    setToastMessage(`Downloading PDF invoice for ${purchase.transactionId}...`);

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(85, 0, 0); // maroon
    doc.text("CAMPUS BAZAR", 105, 20, null, null, "center");

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("INVOICE", 105, 30, null, null, "center");

    // Details
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${purchase.transactionId}`, 20, 50);
    doc.text(`Date: ${new Date(purchase.purchaseDate).toLocaleDateString()}`, 20, 60);
    doc.text(`Status: ${purchase.status}`, 20, 70);
    doc.text(`Seller: ${purchase.sellerName}`, 20, 80);

    // Line separator
    doc.line(20, 90, 190, 90);

    // Product info
    doc.setFontSize(14);
    doc.text("Order Details", 20, 100);

    doc.setFontSize(12);
    doc.text(`Item: ${purchase.productName}`, 20, 110);
    doc.text(`Category: ${purchase.category}`, 20, 120);
    doc.text(`Price: Rs. ${purchase.purchasePrice}`, 20, 130);

    doc.line(20, 140, 190, 140);

    doc.setFontSize(16);
    doc.text(`TOTAL PAID: Rs. ${purchase.purchasePrice}`, 20, 155);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for shopping with Campus Bazar!", 105, 280, null, null, "center");

    doc.save(`Invoice_${purchase.transactionId}.pdf`);

    setTimeout(() => {
      setToastMessage("PDF Invoice downloaded successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "Pending Pickup":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending Pickup
          </span>
        );
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
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
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-maroon"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">Error loading purchases: {error}</div>
      ) : purchases.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Purchases Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">You haven't purchased any items yet. Start exploring the marketplace to find great deals on campus.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
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
                  <div className="absolute top-2 left-2">{getStatusBadge(purchase.status)}</div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-theme-maroon bg-theme-maroon/5 px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">{purchase.category}</span>
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
                        <div className="text-2xl font-black text-slate-900">₹{purchase.purchasePrice.toLocaleString("en-IN")}</div>
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
                        <div className="text-sm font-bold text-slate-900 mb-0.5">Seller: {purchase.sellerName}</div>
                        <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                          {purchase.sellerRating} / 5.0
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setActiveTab("messages")}
                        className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex">
                        <MessageSquare className="w-4 h-4" /> Message Seller
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(purchase)}
                        className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm flex">
                        <Download className="w-4 h-4" /> Invoice
                      </button>
                      <button
                        onClick={() => setSelectedOrder(purchase)}
                        className="flex-1 lg:flex-none items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-theme-maroon hover:bg-theme-dark-maroon rounded-xl transition-colors shadow-sm shadow-theme-maroon/20 flex">
                        Order Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-3 animate-pulse">
          <CheckCircle className="w-5 h-5 text-green-400" />
          {toastMessage}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col transform transition-all">
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 shadow-sm transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedOrder.productName}</h3>
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <Hash className="w-4 h-4" /> {selectedOrder.transactionId}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-theme-maroon">₹{selectedOrder.purchasePrice}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{selectedOrder.status}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-bold text-slate-900">{formatDate(selectedOrder.purchaseDate)}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Seller</p>
                  <p className="text-sm font-bold text-slate-900">{selectedOrder.sellerName}</p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setActiveTab("messages");
                  }}
                  className="flex-1 bg-theme-maroon text-white font-bold py-3 px-6 rounded-xl hover:bg-theme-dark-maroon transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
