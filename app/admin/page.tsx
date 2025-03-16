"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/index";
import MainCard from "@/components/MainCard";
import Featured from "@/components/Featured";
import Collection from "@/components/Collection";
import AdminMainCard from "@/components/MainCardAdmin";

interface mainCardType{
    name: string;
    description: string;
    image: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [mainCard, setMainCard] = useState<mainCardType>({
        name: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        axios.get("/api/products").then((res) => setProducts(res.data));
        axios.get("/api/maincard").then((res) => setMainCard(res.data));
    }, []);


 return (
     <div>
        <AdminMainCard image={mainCard.image} description={mainCard.description} name={mainCard.name} />
        <Featured />
        <Collection />
     </div>
    );
}
