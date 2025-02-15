import { Menu, Search, ShoppingCart } from "lucide-react";

export default function Header(){
return(
    <header className="sticky top-0 z-50 w-full border-b bg-white bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a className="flex items-center space-x-2" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
            </svg>
            <span className="text-2xl font-bold text-black">DressMate</span>
          </a>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a className="transition-colors hover:text-gray-600 text-black" href="#">Home</a>
            <a className="transition-colors hover:text-gray-600 text-black" href="#">Shop</a>
            <a className="transition-colors hover:text-gray-600 text-black" href="#">About</a>
            <a className="transition-colors hover:text-gray-600 text-black" href="#">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  className="pl-8 pr-4 py-2 border rounded-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  placeholder="Search for anime outfits..."
                  type="search"
                />
              </div>
            </form>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </button>
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </header>
    )
}   