// import ProductList from "@/components/product-list"
// import { getProducts } from "@/lib/products"

// export default async function Home() {
//   const products = await getProducts()

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Electric Shop</h1>
//       <ProductList products={products} />
//     </div>
//   )
// }



// import Image from "next/image";

// const joemark = [
//   { name: "PVC CONDUIT PIPES", image: "/images/conduit-pipes.png" },
//   { name: "CASING-CAPPING", image: "/images/casing-capping.png" },
//   { name: "WIRES & CABLES", image: "/images/wires-cables.png" },
//   { name: "SWITCHES", image: "/images/switches.png" },
//   { name: "SWITCHGEAR", image: "/images/switchgear.png" },
//   { name: "ENCLOSURES", image: "/images/enclosures.png" },
//   { name: "CONSUMER LIGHTING", image: "/images/consumer-lighting.png" },
//   { name: "OUTDOOR LIGHTING", image: "/images/outdoor-lighting.png" },
// ];

// const Categories = () => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
//       <h2 className="col-span-2 md:col-span-4 text-2xl font-bold mb-4">
//         Our Premimum products 
//       </h2>
//       {joemark.map((category, index) => (
//         <div key={index} className="text-center">
//           <div className="relative w-full h-48">
//             <Image
//               src={category.image}
//               alt={category.name}
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//           <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;


"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const joemark = [
  { name: "PVC CONDUIT PIPES", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659561/one_hexn0m.png "},
  { name: "CASING-CAPPING", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659558/2_gurx8u.png" },
  { name: "WIRES & CABLES", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659559/3_uopgba.png" },
  { name: "SWITCHES", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659561/4_g2hasq.png" },
  { name: "SWITCHGEAR", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659562/5_s9fvwp.png" },
  { name: "ENCLOSURES", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659561/6_ueqsw5.png" },
  { name: "CONSUMER LIGHTING", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659557/7_qbogqk.jpg" },
  { name: "OUTDOOR LIGHTING", image: "https://res.cloudinary.com/dsuoxnr6l/image/upload/v1743659562/8_il3hay.png" },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      <h2 className="col-span-2 md:col-span-4 text-2xl font-bold mb-4 text-center">
        Our Premium Products
      </h2>
      {joemark.map((category, index) => (
        <motion.div
          key={index}
          {...{ className: "text-center bg-white rounded-2xl shadow-lg p-4 transform transition-all hover:scale-105 hover:shadow-2xl" }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
        >
          <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-md">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            {category.name}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default Categories;
