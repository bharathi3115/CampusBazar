import React, { useState, useRef, useCallback } from "react";
import { Upload, X, MapPin, Tag, CheckCircle, Info, ChevronRight, Image as ImageIcon, Eye, Camera, RefreshCw } from "lucide-react";
import Webcam from "react-webcam";
import { useAuth } from "../../context/AuthContext";

const PostListing = ({ setActiveTab, editingProduct, setEditingProduct }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "Books",
    description: "",
    department: "",
    price: "",
    originalPrice: "",
    negotiable: false,
    condition: "Good",
    pickupDetails: {
      hostel: "",
      location: "",
      meetingPoint: ""
    }
  });

  const [images, setImages] = useState([]); // Array of base64 strings
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  React.useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || "",
        category: editingProduct.category || "Books",
        description: editingProduct.description || "",
        department: editingProduct.department || "",
        price: editingProduct.price || "",
        originalPrice: editingProduct.originalPrice || "",
        negotiable: editingProduct.negotiable || false,
        condition: editingProduct.condition || "Good",
        pickupDetails: {
          hostel: editingProduct.pickupDetails?.hostel || "",
          location: editingProduct.pickupDetails?.location || "",
          meetingPoint: editingProduct.pickupDetails?.meetingPoint || ""
        }
      });
      setImages(editingProduct.images || (editingProduct.img ? [editingProduct.img] : []));
    } else {
      setFormData({
        title: "",
        category: "Books",
        description: "",
        department: "",
        price: "",
        originalPrice: "",
        negotiable: false,
        condition: "Good",
        pickupDetails: {
          hostel: "",
          location: "",
          meetingPoint: ""
        }
      });
      setImages([]);
    }
  }, [editingProduct]);

  const categories = ["Books", "Calculators", "Electronics", "Bicycles", "Lab Equipment", "Hostel Essentials", "Stationery", "Furniture", "Others"];
  const conditions = ["New", "Like New", "Good", "Fair"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.match("image.*"));

    if (images.length + validFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const makeCoverImage = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const newImages = [...prev];
      const temp = newImages[0];
      newImages[0] = newImages[index];
      newImages[index] = temp;
      return newImages;
    });
  };

  // Camera Functions
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  const confirmCapture = () => {
    if (images.length >= 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setImages((prev) => [...prev, capturedImage]);
    setCapturedImage(null);
    setIsCameraOpen(false);
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category) {
      alert("Please fill in all required fields (Title, Price, Category).");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        images, // These are still base64 strings right now
        seller: {
          userId: user?._id,
          name: user?.name || (user?.email ? user.email.split("@")[0] : "Seller"),
          rating: 0,
          verified: false,
          listingsCount: 1,
          responseRate: "100%"
        },
        status: isDraft ? "Draft" : "Active"
      };

      let response;
      if (editingProduct) {
        response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/products/${editingProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/marketplace/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error(editingProduct ? "Failed to update listing" : "Failed to create listing");
      }

      alert(isDraft ? "Draft saved successfully!" : editingProduct ? "Listing Updated Successfully" : "Listing Published Successfully");
      setFormData({
        title: "",
        category: "Books",
        description: "",
        department: "",
        price: "",
        originalPrice: "",
        negotiable: false,
        condition: "Good",
        pickupDetails: {
          hostel: "",
          location: "",
          meetingPoint: ""
        }
      });
      setImages([]);
      if (setEditingProduct) setEditingProduct(null);
      setActiveTab("listings");
    } catch (error) {
      console.error("Error posting listing:", error);
      alert("Failed to save listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 relative">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{editingProduct ? "Edit Listing" : "Post New Listing"}</h1>
          <p className="text-slate-500 mt-2 font-medium">{editingProduct ? "Update your listing details below." : "Create a compelling listing to sell your item quickly."}</p>
        </div>
        {editingProduct && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setActiveTab("listings");
            }}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            Cancel Edit
          </button>
        )}
      </div>

      {/* Camera Modal Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-theme-maroon" /> Capture Photo
              </h3>
              <button
                onClick={() => {
                  setIsCameraOpen(false);
                  setCapturedImage(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 relative flex items-center justify-center">
              {!capturedImage ? (
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: "environment" }} className="w-full h-full object-cover" />
              ) : (
                <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
              )}
            </div>

            <div className="flex justify-center gap-4">
              {!capturedImage ? (
                <button onClick={capture} className="bg-theme-maroon text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-theme-dark-maroon transition-all flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Capture
                </button>
              ) : (
                <>
                  <button onClick={retake} className="bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" /> Retake
                  </button>
                  <button onClick={confirmCapture} className="bg-theme-maroon text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-theme-dark-maroon transition-all flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Add to Gallery
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="xl:col-span-2 space-y-8">
          {/* 1. Image Upload Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-theme-maroon" /> Product Images
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Add up to 5 images. The first image will be the cover.</p>
              </div>
              <div className="text-sm font-bold text-theme-maroon bg-theme-maroon/10 px-3 py-1.5 rounded-lg border border-theme-maroon/20">{images.length}/5 Uploaded</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm">
                <span className="text-xl">📁</span> Upload Images
              </button>
              <button
                onClick={() => setIsCameraOpen(true)}
                className="flex-1 bg-theme-maroon text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-theme-maroon/20 hover:bg-theme-dark-maroon transition-all flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> Capture Photo
              </button>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isDragging ? "border-theme-maroon bg-theme-maroon/5" : "border-slate-300 hover:border-theme-maroon/50 bg-slate-50"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}>
              <input type="file" multiple accept="image/jpeg, image/png, image/jpg, image/webp" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 pointer-events-none">
                  <Upload className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-700 font-bold mb-1 pointer-events-none">Drag & drop images here</p>
                <p className="text-xs text-slate-500 font-medium pointer-events-none">or click 'Upload Images' above</p>
              </div>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm animate-in fade-in zoom-in duration-300">
                    <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                      {index !== 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            makeCoverImage(index);
                          }}
                          className="text-xs font-bold bg-white text-slate-900 px-2 py-1 rounded shadow hover:bg-slate-100">
                          Make Cover
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {index === 0 && <div className="absolute top-2 left-2 bg-theme-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">COVER</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Product Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-theme-maroon" /> Product Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Casio Scientific Calculator FX-991EX"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium appearance-none">
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Department (Optional)</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Computer Science"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the condition, features, and reason for selling..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* 3. Pricing & 4. Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Selling Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Original Price (₹) (Optional)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="negotiable"
                      id="negotiable"
                      checked={formData.negotiable}
                      onChange={handleInputChange}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-5 checked:border-theme-maroon"
                    />
                    <label
                      htmlFor="negotiable"
                      className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${formData.negotiable ? "bg-theme-maroon" : "bg-slate-300"}`}></label>
                  </div>
                  <label htmlFor="negotiable" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Price is negotiable
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Condition</h2>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map((cond) => (
                  <div
                    key={cond}
                    onClick={() => setFormData((prev) => ({ ...prev, condition: cond }))}
                    className={`p-3 border rounded-xl cursor-pointer text-center transition-all ${
                      formData.condition === cond ? "border-theme-maroon bg-theme-maroon/5 ring-1 ring-theme-maroon" : "border-slate-200 hover:border-slate-300 bg-slate-50"
                    }`}>
                    <span className={`font-bold text-sm ${formData.condition === cond ? "text-theme-maroon" : "text-slate-600"}`}>{cond}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Pickup Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-theme-maroon" /> Pickup Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Meeting Point</label>
                <input
                  type="text"
                  name="pickupDetails.meetingPoint"
                  value={formData.pickupDetails.meetingPoint}
                  onChange={handleInputChange}
                  placeholder="e.g., Main Gate, Library Cafe"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Hostel Name (Optional)</label>
                <input
                  type="text"
                  name="pickupDetails.hostel"
                  value={formData.pickupDetails.hostel}
                  onChange={handleInputChange}
                  placeholder="e.g., Garnet A"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview & Tips */}
        <div className="space-y-8">
          {/* 6. Live Product Preview */}
          <div className="sticky top-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Live Preview
              </h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden transition-all hover:shadow-xl group">
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {images.length > 0 ? (
                    <img src={images[0]} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Image Provided</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-black px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider">{formData.category || "Category"}</span>
                  </div>
                  {formData.condition && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-theme-maroon text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">{formData.condition}</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-tight line-clamp-2">{formData.title || "Product Title Will Appear Here"}</h3>
                  </div>

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-2xl font-black text-slate-900">₹{formData.price || "0"}</span>
                    {formData.originalPrice && <span className="text-sm text-slate-400 font-bold line-through mb-1">₹{formData.originalPrice}</span>}
                    {formData.negotiable && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded ml-auto mb-1 border border-green-100">Negotiable</span>}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <div className="flex items-center text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      <span className="truncate">{formData.pickupDetails.meetingPoint || "Meeting Point"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Seller Tips Widget */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600" /> Seller Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-amber-800">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Use clear, well-lit photos. Items with 3+ images sell 40% faster.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-amber-800">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Set a competitive price. Check similar listings to gauge the market.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-amber-800">
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Be specific about the condition to build trust with buyers.</span>
                </li>
              </ul>
            </div>

            {/* 8. Actions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-theme-maroon text-white font-bold text-lg py-4 px-6 rounded-xl hover:bg-theme-dark-maroon transition-all shadow-lg shadow-theme-maroon/20 flex justify-center items-center gap-2 mb-4 disabled:opacity-50">
                {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : null}
                {editingProduct ? "Save Changes" : "Publish Listing"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListing;
