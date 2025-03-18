"use client"
import { useState } from 'react'
import axios from 'axios'
import { Edit, MoreVertical, X } from 'lucide-react'

interface AdminMainCardProps {
  id: Number;
  name: string;
  description: string;
  image: string;
  price?: number;
  category?: string;
}

export default function AdminMainCard({id, name, description, image, price = 0, category = "uncategorized"}: AdminMainCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: name,
    price: price,
    description: description,
    image: image,
    category: category,
    isMainCard: true,
  });
  
  const [status, setStatus] = useState({
    uploading: false,
    error: "",
    success: false
  });
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const openEditForm = () => {
    setIsMenuOpen(false)
    setIsEditFormOpen(true)
  }
  
  const closeEditForm = () => {
    setIsEditFormOpen(false)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
  
    const file = e.target.files[0];
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
    if (!cloudName || !uploadPreset) {
      setStatus(prev => ({ ...prev, error: "Cloudinary configuration missing" }));
      console.error("Missing environment variables for Cloudinary");
      return;
    }
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
  
    try {
      setStatus(prev => ({ ...prev, uploading: true, error: "" }));
  
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      });
  
      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }
  
      const cloudinaryData = await res.json();
      setFormData(prev => ({ ...prev, image: cloudinaryData.secure_url }));
      setStatus(prev => ({ ...prev, uploading: false, error: "" }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus(prev => ({
        uploading: false,
        error: "Failed to upload image. Please try again.",
        success: false,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, error: "", success: false });
    
    // Form validation
    if (!formData.name) {
      return setStatus({ ...status, error: "Product name is required" });
    }
    if (formData.price <= 0) {
      return setStatus({ ...status, error: "Price must be greater than 0" });
    }
    if (!formData.description) {
      return setStatus({ ...status, error: "Description is required" });
    }
    if (!formData.category) {
      return setStatus({ ...status, error: "Category is required" });
    }
    if (!formData.image) {
      return setStatus({ ...status, error: "Product image is required" });
    }
    
    try {
      await axios.put("/api/products", {
        id: id,
        ...formData
      });
      setStatus({ ...status, success: true });
      
      // Close form after successful update
      setTimeout(() => {
        setIsEditFormOpen(false)
        window.location.reload() // Refresh to show updated data
      }, 1500)
      
    } catch (error) {
      console.error("Error updating product:", error);
      setStatus({ ...status, error: "Failed to update product. Please try again." });
    }
  };
  
  const deleteHandler = async() => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete("/api/products", {
          data: { id: id }
        })
        alert("Product deleted successfully")
        // Reload page to refresh data
        window.location.reload()
      } catch (error) {
        console.error("Failed to delete product:", error)
        alert("Failed to delete product")
      }
    }
    setIsMenuOpen(false)
  }

  return(
    <div className="relative">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              alt={name}
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              src={image}
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{name}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleMenu}
                      className="p-2 rounded-full hover:bg-gray-200"
                      aria-label="More options"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description}
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md">Add to Cart</button>
                <button className="px-4 py-2 border border-black text-black hover:bg-gray-100 rounded-md">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {isMenuOpen && (
        <div className="absolute top-16 right-8 bg-white shadow-lg rounded-md p-2 z-10">
          <ul className="space-y-1">
            <li>
              <button
                onClick={openEditForm}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Edit Product
              </button>
            </li>
            <li>
              <button 
                onClick={deleteHandler}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Delete Product
              </button>
            </li>
            <li>
              <button 
                onClick={openEditForm}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Change Image
              </button>
            </li>
          </ul>
        </div>
      )}
      
{/* Edit Form Popup */}
{isEditFormOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md relative overflow-y-auto max-h-[90vh]">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
        <button 
          onClick={closeEditForm}
          className="p-1 rounded-full hover:bg-gray-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4">
        {status.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Product updated successfully!
          </div>
        )}
        
        {status.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {status.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product name"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product category"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter product description"
            />
          </div>
          
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
            
            {status.uploading && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg className="animate-spin h-4 w-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading image...
              </div>
            )}
            
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Product preview" 
                  className="w-24 h-24 object-cover rounded border border-gray-300" 
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={status.uploading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 w-full sm:w-auto"
          >
            {status.uploading ? "Please wait..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  )
}