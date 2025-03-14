"use client"
import { Product } from  '@/types/index'

export default function MainCard({name, description,image}: Product) {
    return(
    <div>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                alt="Naruto Hokage Cloak"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src={image}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{name}</h2>
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
    </div>
    )
}