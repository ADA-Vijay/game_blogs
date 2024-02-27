import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import Container from "react-bootstrap/Container";
import { NextSeo } from "next-seo";

const trendingTopData = [
  {
    name: "Palworld Guide: How to Fain Your Base",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Genshin Impact 4.4: All Things You Need to Know",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Destiny 2 Players Are Shocked with the New Character",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Keanu Reeves Cameo in the Newest Cyberpunk Update",
    activeDate: "arzan khan 2 months ago",
  },
];

const Index = ({ data }) => {
  const router = useRouter();
  const { category, sub_category } = router.query;
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToSection();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollToSection = () => {
    const sectionId = window.location.hash.substring(1);
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <NextSeo
          title={data[0].yoast_head_json.title}
          description={data[0].yoast_head_json.description}
          openGraph={{
            title: data[0].yoast_head_json.title,
            description: data[0].yoast_head_json.description,
            images: [
              {
                url: data[0].yoast_head_json.og_image[0].url,
                height: 1200,
                width: 600,
                alt: "Alt",
              },
            ],
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
        />
      )}

      <div className={styles.latestWrap}>
        <Container>
          <div className={styles.listingDetailsWrap}>
            <div className={styles.latestBody}>
              <div className={styles.latestContent}>
                <div className={styles.listingDetailsBody}>
                  <div className={styles.latestBox}>
                    {data && data.length > 0 ? (
                      <>
                        <div
                          className={`${styles.listingDetailMainTitle} mb-4`}
                          dangerouslySetInnerHTML={{
                            __html: data[0].title.rendered,
                          }}
                        ></div>
                        <div className={styles["author-section"]}>
                          <h2 className="description">
                            Author : {data[0]._embedded.author[0].name}
                          </h2>
                          <h2>Published On : {formatDate(data[0].date)}</h2>
                        </div>
                        <div className={styles.listingDetailMainImg}>
                          <img
                            src={data[0].jetpack_featured_media_url}
                            alt="img"
                          />
                        </div>
                        <div
                          id="overview%20of%20the%20hu-taos%20kit"
                          className={styles.subListingDetailsItem}
                          ref={sectionRef}
                        >
                          {/* Content with links goes here */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data[0].content.rendered,
                            }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <div className={styles.heroCardBoxItem}>
                        <h2 className="text-center">
                          No Content found on {sub_category}
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.trendingTopWrap}>
                <div>
                  <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4El1B5cOf9EjkuWgq4J_2RBIjo4jmzznJ8_3aMgezV3h3DJpE"
                    alt="img"
                  />
                </div>
                <div className={styles.trendingTopHead}>
                  <div
                    className={styles.trendingTopTitle}
                    onClick={scrollToSection}
                  >
                    trending topics
                  </div>
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
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const { category, sub_category } = context.query;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(
      ApiUrl + `posts?slug=${sub_category}&_embed`
    );
    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error while fetching the data", error);
    return {
      props: {
        error: true,
      },
    };
  }
}
