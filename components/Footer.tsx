export default function Footer() {
  return (
    <div>
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">About DressMate</h4>
              <p className="text-sm">
                Bringing your favorite anime characters' style to your everyday
                wardrobe.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="text-sm space-y-1">
                <li>
                  <a className="hover:underline" href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    FAQs
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Shipping & Returns
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="text-sm space-y-1">
                <li>
                  <a className="hover:underline" href="#">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Anime Collaborations
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">
                Join the DressMate Community
              </h4>
              <form className="space-y-2">
                <input
                  className="w-full px-3 py-2 bg-white text-black rounded-md"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="w-full px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center text-sm">
            © 2023 DressMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
