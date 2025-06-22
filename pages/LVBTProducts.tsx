import Head from "next/head";
import { Inter } from "next/font/google";
import Banner from "@/components/banner";
import Products from "@/components/Products";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div
        className="bg-[rgb(36,36,36)] text-white h-screen snap-mandatory
       snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
        scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
      >
        <Head>
          <title>LVBT Products</title>
        </Head>
        <Banner />
        <section id="products" className="">
          <Products />
        </section>
      </div>
    </>
  );
}
