"use client"
import { Product } from '@/types/index'
import axios from 'axios'
import { Edit, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface AdminMainCardProps {
    setname: (name: string) => void
    setdescription: (description: string) => void
    setimage: (image: string) => void
}

export default function AdminMainCard({setname, setdescription, setimage}:AdminMainCardProps ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const Edithandler = async() => {

    await axios.put("/api/products", {
      name: name,
      description: description,
      image: image
    })
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
                      onClick={() => toggleMenu()} 
                      className="p-2 rounded-full hover:bg-gray-200"
                      aria-label="Edit product"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => toggleMenu()} 
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
              onClick={Edithandler}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Edit Product
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Delete Product
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                Change Image
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}