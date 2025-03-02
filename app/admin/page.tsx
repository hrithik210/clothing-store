"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("/api/products").then((res) => setProducts(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                        <div className="relative h-48 w-full mb-2">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
                            />
                        </div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p>{product.price} rs</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
