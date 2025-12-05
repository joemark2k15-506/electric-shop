// import Link from "next/link"
// import CartIcon from "@/components/cart-icon"
// import UserNav from "@/components/user-nav"
// import { Button } from "@/components/ui/button"
// import { Search } from "lucide-react"
// import MobileMenu from "@/components/mobile-menu"

// export default function Header() {
//   return (
//     <header className="border-b">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center">
//           <MobileMenu />
//           <Link href="/" className="text-xl font-bold">
//             Electric Shop
//           </Link>
//         </div>

//         <div className="hidden md:flex items-center space-x-6">
//           <Link href="/" className="text-sm font-medium hover:text-primary">
//             Home
//           </Link>
//           <Link href="/#" className="text-sm font-medium hover:text-primary">
//             Products
//           </Link>
//           <Link href="/#" className="text-sm font-medium hover:text-primary">
//             Categories
//           </Link>
//           <Link href="/#" className="text-sm font-medium hover:text-primary">
//             About
//           </Link>
//           <Link href="/#" className="text-sm font-medium hover:text-primary">
//             Contact
//           </Link>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Button variant="ghost" size="icon">
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>
//           <CartIcon />
//           <UserNav />
//         </div>
//       </div>
//     </header>
//   )
// }


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import CartIcon from "@/components/cart-icon";
// import UserNav from "@/components/user-nav";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import MobileMenu from "@/components/mobile-menu";
// import { motion } from "framer-motion";

// export default function Header() {
//   const pathname = usePathname(); // Get current page path

//   return (
//     <motion.header
//       className="border-b shadow-lg"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//     >
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo & Mobile Menu */}
//         <div className="flex items-center">
//           <MobileMenu />
//           <Link
//             href="/"
//             className="text-xl font-bold transform hover:scale-105 transition duration-300"
//           >
//             Electric Shop
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           <Link
//             href="/"
//             className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
//           >
//             Home
//           </Link>
//           {/* <Link
//             href="/products"
//             className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
//           >
//             Products
//           </Link> */}
//           <Link
//             href="/categories"
//             className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
//           >
//             Categories
//           </Link>
//           <Link
//             href="/about"
//             className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/contact"
//             className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
//           >
//             Contact
//           </Link>
//         </nav>

//         {/* Right Section: Search, Cart, UserNav */}
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="transform hover:scale-110 transition duration-300"
//           >
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>
//           <CartIcon />
//           <UserNav />
//         </div>
//       </div>

//       {/* Show Iframe Only on Homepage */}
//       {pathname === "/" && (
//         <motion.div
//           className="w-full hidden md:block"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <iframe
//             loading="lazy"
//             src="https://www.pressfitindia.com/wp-content/uploads/data102.html"
//             height="350"
//             width="100%"
//             className="w-full shadow-xl rounded-lg"
//           ></iframe>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// }

 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "@/components/cart-icon";
import UserNav from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import { motion } from "framer-motion";
// Ensure this filename matches exactly (Case Sensitive on some systems)
import HeroSlider from "@/components/HeroSlider"; 

export default function Header() {
  const pathname = usePathname(); // Get current page path

  return (
    <motion.div  
    // Fix: Use standard className prop instead of spread operator
    // @ts-ignore
    className="border-b shadow-lg bg-white" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center">
          <MobileMenu />
          <Link
            href="/"
            className="text-xl font-bold transform hover:scale-105 transition duration-300 ml-2"
          >
            Electric Shop
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transform hover:scale-105 transition duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Right Section: Search, Cart, UserNav */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="transform hover:scale-110 transition duration-300"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <CartIcon />
          <UserNav />
        </div>
      </div>

      {/* Show Hero Slider Only on Homepage */}
      {pathname === "/" && (
        <motion.div
        // @ts-ignore
          className="w-full hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSlider />
        </motion.div>
      )}
    </motion.div>
  );
}