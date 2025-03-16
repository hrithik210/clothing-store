"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    isMainCard: false,
  });
  
  const [status, setStatus] = useState({
    uploading: false,
    error: "",
    success: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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
      await axios.post("/api/products", formData);
      setStatus({ ...status, success: true });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "",
        isMainCard: false,
      });
      
      // Clear file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error("Error adding product:", error);
      setStatus({ ...status, error: "Failed to add product. Please try again." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
      {status.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Product added successfully!
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
            rows={4}
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          
          {status.uploading && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="animate-spin h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                className="w-32 h-32 object-cover rounded border border-gray-300" 
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isMainCard"
            name="isMainCard"
            checked={formData.isMainCard}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isMainCard" className="ml-2 block text-sm text-gray-700">
            Set as Main Card
          </label>
          <div className="ml-2 text-xs text-gray-500">
            (Only one product can be set as Main Card)
          </div>
        </div>
        
        <button
          type="submit"
          disabled={status.uploading}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {status.uploading ? "Please wait..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}