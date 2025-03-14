"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/index";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("/api/products").then((res) => setProducts(res.data));
    }, []);

    return (
    <div>
      <section className="w-full py-6 md:py-8 lg:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Anime Fashion Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col group relative overflow-hidden rounded-lg shadow-lg">
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
                      <button className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded-md text-sm">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
    );
}
