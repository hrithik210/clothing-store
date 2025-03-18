"use client"

import Collection from "@/components/Collection";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MainCard from "@/components/MainCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface mainCardType{
  id: Number;
  name: string;
  description: string;
  image: string;
}


export default function Home() {

  const [mainCard, setMainCard] = useState<mainCardType | null>(null);

  useEffect(() => {
    axios.get("/api/maincard").then((res) => setMainCard(res.data));
  }, []);

  if (!mainCard) return <p>Loading...</p>;
  return (
    <div>
      <Hero />
      <MainCard  
        id={Number(mainCard.id)}
        name={mainCard.name}
        description={mainCard.description}
        image={mainCard.image}/>
      <Featured />
      <Collection />
      <Footer />
    </div>
  );
}
