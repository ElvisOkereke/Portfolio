import Head from "next/head";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import React from "react"; // Import React

// Dynamically import the Canvas component, disabling SSR
const DynamicLVBTProductsCanvas = dynamic(
  () => import('../components/3dProducts/LVBTProductsCanvas'), // Adjust the path to your new file
  { ssr: false } // Crucially, disable server-side rendering for this component
);

export default function Home() {
  return (
    <>
      <div
        className="bg-[rgb(36,36,36)] text-white h-screen snap-mandatory snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
      >
        <Head>
          <title>LVBT Products</title>
        </Head>
        {/* Assuming Banner is still desired */}
        {/* <Banner /> */}

        {/* Container for the 3D Canvas */}
        <section id="products" className="h-screen flex items-center justify-center">
           {/* The canvas container fills the available space */}
          <div className="w-full h-full flex-grow mx-auto" style={{ height: 'calc(100vh - 80px)' }}>
            {/* Render the dynamically imported Canvas component */}
            <DynamicLVBTProductsCanvas />
          </div>
        </section>

      </div>
    </>
  );
}