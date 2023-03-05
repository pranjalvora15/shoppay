// import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import ProductsSwiper from "@/components/productsSwiper";
import ProductCard from "@/components/productCard";
import Category from "@/components/home/category";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import Product from "@/models/Product";
import axios from "axios";
import db from "@/utlis/db";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";

export default function Home({ country, products }) {
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  // const data = await axios
  //   .get("https://api.ipregistry.co/?key=4glor7xgmb5fobmg")
  //   .then((res) => res.data.location.country)
  //   .catch((err) => console.log(err));
  // console.log(data);
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "IN",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/in.svg",
      },
    },
  };
}
