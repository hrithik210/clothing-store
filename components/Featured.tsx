"use client"

import { products } from "@/data/HardCoded"

export default function Featured(){
    return (
    <div>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Cosplay Essentials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt={product.name}
                    className="object-cover w-full h-60"
                    src={product.image}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-md">View Product</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
    )
}