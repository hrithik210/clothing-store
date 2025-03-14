import Collection from "@/components/Collection";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MainCard from "@/components/MainCard";


export default function Home() {
  return (
    <div>
      <Hero />
      <MainCard  />
      <Featured />
      <Collection />
      <Footer />
    </div>
  );
}
