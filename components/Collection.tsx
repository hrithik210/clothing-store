"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);
  
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };
  
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Anime Fashion Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="flex flex-col group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  alt={product.name}
                  className="object-cover w-full h-60"
                  src={product.image}
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 flex-grow">{product.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <button 
                      className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded-md text-sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        // Add to cart logic here
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}