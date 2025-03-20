"use client"
import { Product } from '@/types/index'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

 useEffect(() => {
  if (productId) {
    setLoading(true);
    axios.get('/api/product', {
      params: {
        id: productId
      }
    })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }
}, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product?.name} to cart`);
    // You can implement your cart logic or API call here
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={handleGoBack}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Go Back to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <button 
        onClick={handleGoBack}
        className="mb-8 flex items-center text-gray-600 hover:text-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
          
          <div className="border-t border-b py-4 my-4">
            <p className="text-gray-700 mb-4">{product.description}</p>
        
          </div>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-3 font-medium">Quantity:</label>
            <select 
              id="quantity" 
              value={quantity} 
              onChange={handleQuantityChange}
              className="border rounded-md p-2 w-20"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleAddToCart}
            className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors w-full md:w-auto md:inline-block text-center"
          >
            Add to Cart
          </button>
        </div>
      </div>

      
    </div>
  );
}