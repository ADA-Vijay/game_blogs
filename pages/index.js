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

const heroData = [
  {
    imageUrl:
      "https://live.staticflickr.com/65535/53457230978_912df9e01e_o.jpg",
    bags: "palworld",
    name: "Palworld Guide: How to Fain Your Base",
  },
  {
    imageUrl:
      "https://live.staticflickr.com/65535/53457231183_ae61664133_o.jpg",
    bags: "GENSHIN IMPACT",
    name: "Genshin Impact 4.4: All Things You Need to Know",
  },
  {
    imageUrl:
      "https://live.staticflickr.com/65535/53476768569_9287b8293d_b.jpg",
    bags: "DESTINY",
    name: "Destiny 2 Players Are Shocked with the New Character",
  },
  {
    imageUrl:
      "https://live.staticflickr.com/65535/53457421164_f7d7c06e2a_o.jpg",
    bags: "CYBERPUNK",
    name: "Keanu Reeves Cameo in the Newest Cyberpunk Update",
  },
];

const promoData = [
  {
    imageUrl:
      "https://wallpapercosmos.com/w/full/7/9/b/1232424-3840x2160-desktop-4k-gothic-anime-wallpaper-image.jpg",
    name: "Palworld",
  },
  {
    imageUrl:
      "https://templatefor.net/wp-content/uploads/2018/03/wp-anime-65248541.jpg",
    name: "GENSHIN IMPACT",
  },
  {
    imageUrl:
      "https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg",
    name: "jujutsu kaisen",
  },
];

const latestData = [
  {
    imageUrl:
      "https://qph.cf2.quoracdn.net/main-qimg-10f11f6672991badc073cb461b0ccc4c-lq",
    bags: "palworld",
    name: "Palworld Guide: How to Fain Your Base How to Fain Your Base How to Fain Your Base",
    activeDate: "arzan khan 2 months ago",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmOwTCWWlOhrCKwGhG__tZp9Zn6FHW9pDxA&usqp=CAU",
    bags: "GENSHIN IMPACT",
    name: "Genshin Impact 4.4: All Things You Need to Know All Things You Need to KnowAll Things You Need to KnowAll Things You Need to KnowAll Things You Need to Know",
    activeDate: "arzan khan 2 months ago",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZS78ND27z4Df9n4xDeq1K2nv7y7o1rjsX0X_XVszdUj_wY14t-l3Z5_11BAnYdkpAmY&usqp=CAU",
    bags: "DESTINY",
    name: "Destiny 2 Players Are Shocked with the New Character Players Are Shocked with the New Character",
    activeDate: "arzan khan 2 months ago",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbZPqBF_l7EEJggsDyY-kt8LSwYxJ97KNBeA&usqp=CAU",
    bags: "CYBERPUNK",
    name: "Keanu Reeves Cameo in the Newest Cyberpunk Update Cameo in the Newest Cyberpunk Update",
    activeDate: "arzan khan 2 months ago",
  },
];

export default function Home({ newdata, bannerData, trendingPosts }) {
  const router = useRouter();

  const Navigate = async (data) => {
    const categoryArray = data._embedded["wp:term"][0];

    if (categoryArray && categoryArray.length > 0) {
      const firstCategory = categoryArray[0];

      //     if (data.errors) {
      //       console.log("GraphQL Errors:", data.errors);
      //     } else {
      //       setNewData(data)
      //     }
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // };

      const Navigate = async (data) => {
        const categoryArray = data._embedded["wp:term"][0];

        if (categoryArray && categoryArray.length > 0) {
          const firstCategory = categoryArray[0];

          if (firstCategory.name) {
            const categoryName = firstCategory.name;
            const postTitle = data.slug;

            if (categoryName && postTitle) {
              router.push(`/${categoryName}/${postTitle}`);
            } else {
              console.error(
                "Category name or post title is missing in the response."
              );
            }
          } else {
            console.error("Category information not found in the response.");
          }
        } else {
          console.error("No categories found for this post.");
        }
      };

      if (firstCategory.name) {
        const categoryName = firstCategory.slug;
        const postTitle = data.slug;

        if (categoryName && postTitle) {
          router.push(`/${categoryName}/${postTitle}`);
        } else {
          console.error(
            "Category name or post title is missing in the response."
          );
        }
      } else {
        console.error("Category information not found in the response.");
      }
    } else {
      console.error("No categories found for this post.");
    }
  };

  return (
    <>
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

      <main className="">
        {/* <Header></Header> */}
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
