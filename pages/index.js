import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroBanner from "../components/heroBanner";
import Container from "react-bootstrap/Container";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import ListingPage from "@/components/lisitng";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });


export default function Home({ newdata, bannerData, trendingPosts }) {

  return (
    <>

{newdata && newdata.length > 0 ? (
         <NextSeo
         title="Home | AshGamewitted"
         description={newdata[0].yoast_head_json.og_description}
         openGraph={{
           title: "Home | AshGamewitted",
           description: newdata[0].yoast_head_json.og_description,
           images: [
             {
               url: newdata[0].yoast_head_json.og_image[0].url,
               height: 1200,
               width: 600,
             },
           ],
         }}
       />
      ) : (
        <NextSeo
        title="Home | AshGamewitted"
        description="" 
        openGraph={{}} />
      )}


     

      <main className="">
        {bannerData && bannerData.length > 0 && (
          <HeroBanner bannerData={bannerData}></HeroBanner>
        )}
        <div className={styles.promoWrap}>
          <Container>
            <div className={styles.promoBody}>
              <div className={styles.promoTitles}><h4>POPULAR CATEGORIES</h4><div className={styles.headingLine}></div></div>
              <div className={styles.promoBox}>
                {trendingPosts && trendingPosts.length > 0
                  ? trendingPosts.map((card, index) => (
                      <Link
                        key={index}
                        href={`/${card._embedded["wp:term"][0][0].slug}/`}
                      >
                        <div className={styles.promoBoxItem} key={index}>
                          <img
                            className={styles.promoImg}
                            src={card.jetpack_featured_media_url}
                            alt="img"
                          />
                          <div className={styles.promoInfo} key={index}>
                            <h4 className={styles.promoName}>
                              {card._embedded["wp:term"][0][0].name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))
                  : ""}
              </div>
            </div>
          </Container>
        </div>
        
        <Container>
          <div className={styles.promoTitles}><h4>Latest</h4><div className={styles.headingLine}></div></div>
          </Container>
        <ListingPage newdata={newdata} />
        <Footer></Footer>
      </main>
    </>
  );
}

export async function getServerSideProps({ context }) {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const bannerId = 606508198;
  const trendingId = 606508208;
  try {
    const bannerResponse = await axios.get(
      ApiUrl + "posts?tags=606508198&_embed&per_page=4&orderby=date&order=desc"
    );
    const bannerData = bannerResponse.data;
    const response = await axios.get(
      ApiUrl + "posts?per_page=10&order=desc&orderby=date&_embed=1"
    );
    const newdata = response.data;
    const trending = await axios.get(
      `${ApiUrl}posts?tags=${trendingId}&_embed&per_page=3&orderby=date&order=desc`
    );

    const trendingPosts = trending.data;
    if (newdata && bannerData) {
      return { props: { newdata, bannerData, trendingPosts } };
    }
  } catch (error) {
    console.error("Error While Fetching the Data :", error);
  }
}
