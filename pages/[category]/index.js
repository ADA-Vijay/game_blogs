import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import HeroBanner from "@/components/heroBanner";
import { Container } from "react-bootstrap";
import { NextSeo } from "next-seo";
import ListingPage from "@/components/lisitng"

const Index = ({ initialData, bannerData }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setData(initialData);
    setPage(1);
    setLoading(false);
    setHasMoreData(true);
  }, [initialData]);
  const { category } = router.query;
 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        if (hasMoreData) {
          loadMoreData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, loading, hasMoreData]);


  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);

    try {
      const categoryResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}categories?slug=${category}`
      );
      const categoryId = categoryResponse.data[0]?.id;

      if (!categoryId) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }posts?categories=${categoryId}&per_page=10&page=${page + 1}&_embed`
      );

      const newData = response.data;

      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Error while fetching more data", error);
    } finally {
      setLoading(false);
    }
  };

  





  return (
    <div>
      {initialData && initialData.length > 0 ? (
        <NextSeo
          title={initialData[0]._embedded["wp:term"][0][0].name}
          description={initialData[0].yoast_head_json.og_description}
          openGraph={{
            title: initialData[0]._embedded["wp:term"][0][0].name,
            description: initialData[0].yoast_head_json.og_description,
            images: initialData[0].yoast_head_json.og_image,
          }}
        />
      ) : (
        <NextSeo
        title="AshGamewitted"
        description="Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms."
        openGraph= {{
          title:"AshGamewitted",
          description:"Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
          images :[
            {
              url:"",
              width: 1200,
              height: 630,
              alt: 'AshGamewitted',
            }
          ]
        }}
      />      )}
       <div className={styles.latestWrap}>
        <Container>
          {bannerData && bannerData.length > 0 && (
            <HeroBanner bannerData={bannerData}></HeroBanner>
          )}
          {/* <div className={styles.latestBody}>
            <div className={styles.latestContent}>
              <div className={styles.latestBox}>
                {data && data.length > 0 ? (
                  data.map((card, index) => (
                    <>
                      <div className={styles.latestInfo}>
                        
                        <h5
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: card.excerpt.rendered,
                          }}
                        ></h5>
                      </div>

                      <div
                        className={styles.latestBoxItem}
                        key={index}
                        onClick={() => Navigate(card)}
                      >
                        <img
                          className={styles.latestImg}
                          src={card.jetpack_featured_media_url}
                        />
                        <div className={styles.latestInfo}>
                          <h6>{card._embedded["wp:term"][0][0].name}</h6>
                          <p dangerouslySetInnerHTML={{__html:card.title.rendered}}></p>
                        <span>{formatDate(card.date)} {formatTime(card.date)}</span>
                        <h5 className="description">Author : {card._embedded.author[0].name}</h5>
                          <h5
                            className="description"
                            dangerouslySetInnerHTML={{
                              __html: card.excerpt.rendered,
                            }}
                          ></h5>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div className={styles.heroCardBoxItem}>
                    No data found on this category
                  </div>
                )}
              </div>
            </div>
            <div className={styles.trendingTopWrap}>
              <div>
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4El1B5cOf9EjkuWgq4J_2RBIjo4jmzznJ8_3aMgezV3h3DJpE" />
              </div>
              <div className={styles.trendingTopHead}>
                <div className={styles.trendingTopTitle}>trending topics</div>
                <div className={styles.trendingTopBody}>
                  <ul>
                    {trendingTopData.map((card, index) => (
                      <li key={index}>
                        <h4>{card.name}</h4>
                        <p>{card.activeDate}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </Container>
      </div> 
      <ListingPage newdata={data} />

    </div>
  );
};

export default Index;





export async function getServerSideProps(context) {
  const { category } = context.query;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const categoryResponse = await axios.get(
      `${ApiUrl}categories?slug=${category}`
    );
    const categoryId = categoryResponse.data[0]?.id;

    let initialData = [];
    if (categoryId) {
      const response = await axios.get(
        `${ApiUrl}posts?categories=${categoryId}&per_page=10&_embed`
      );
      initialData = response.data || [];
    }

    const bannerResponse = await axios.get(
      `${ApiUrl}posts?tags=606508198&_embed&per_page=4&orderby=date&order=desc`
    );
    const bannerData = bannerResponse.data || [];

    return {
      props: {
        initialData,
        bannerData,
      },
    };
  } catch (error) {
    console.error("Error while fetching the data", error);
    return {
      props: {
        initialData: [],
        bannerData: [],
      },
    };
  }
}
