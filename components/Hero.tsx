export default function Hero() {
 return(
    <div>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Dress Like Your Favorite Anime Characters
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Transform your wardrobe with DressMate's exclusive anime-inspired fashion collection.
                </p>
              </div>
              <div className="space-x-4">
                <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-md">Shop Now</button>
                <button className="px-4 py-2 text-white border border-white hover:bg-white hover:text-black rounded-md">
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </section>
    </div>
 )
}