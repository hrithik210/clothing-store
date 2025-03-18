"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/index";
import MainCard from "@/components/MainCard";
import Featured from "@/components/Featured";
import Collection from "@/components/Collection";
import AdminMainCard from "@/components/MainCardAdmin";

interface mainCardType{
    _id: string;
    name: string;
    description: string;
    image: string;
}

export default function AdminDashboard() {
  const [mainCard, setMainCard] = useState<mainCardType | null>(null);

  useEffect(() => {
    try {
      axios.get("/api/maincard").then((res) => setMainCard(res.data));
      console.log("maincard",mainCard);
    }
    catch (error) {
      console.log('error fetching main card',error);
    }
  }, []);

  if (!mainCard) return <p>Loading...</p>;
  console.log("maincard",mainCard);


 return (
     <div>
        <AdminMainCard
            id={mainCard._id}
            name={mainCard.name}
            description={mainCard.description}
            image={mainCard.image}

        />
        <Featured />
        <Collection />
     </div>
    );
}
