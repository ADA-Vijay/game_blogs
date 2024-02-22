import React from "react";
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

const index = ({ data }) => {
  console.log("Result Data", data);
  const router = useRouter();
  const { category, sub_category } = router.query;
  return (
    <div>
      <NextSeo
        title={data[0].title.rendered}
        description={data[0].excerpt.rendered}
        openGraph={{
          title: data[0].title.rendered,
          description: data[0].excerpt.rendered,
          images: [
            {
              url: data[0].jetpack_featured_media_url,
              width: 1000,
              height: 600,
              alt: "Alt",
            },
          ],
        }}
      />

      <div className={styles.latestWrap}>
        <Container>
          <div className={styles.latestBody}>
            <div className={styles.latestContent}>
              {/* <div className={styles.titleName}>Latest</div> */}
              <div className={styles.latestBox}>
                {data && data.length > 0 ? (
                  <>
                    <div className={styles.listingDetailMainImg}>
                      <img src={data[0].jetpack_featured_media_url} />
                    </div>
                    <div className={styles.listingDetailMainTitle} dangerouslySetInnerHTML={{__html:data[0].title.rendered}}></div>
                    <div
                      key={index}
                      className={styles.subListingDetailsItem}
                      dangerouslySetInnerHTML={{
                        __html: data[0].content.rendered,
                      }}
                    ></div>
                  </>
                ) : (
                  <div key={index} className={styles.heroCardBoxItem}>
                    <h2 className="text-center">
                      No Content found on {sub_category}
                    </h2>
                  </div>
                )}
                {/* {newdata.map((card, index) => (
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
                      <a href="#">{card.title.rendered}</a>
                      <h5
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: card.excerpt.rendered,
                        }}
                      ></h5>
                    </div>
                  </div>
                ))} */}
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
          </div>
        </Container>
      </div>
      <div className="commentSection">
        <h4 className="sitetitle"></h4>
        <div className="comments"></div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { category, sub_category } = context.query;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(ApiUrl + `posts?slug=${sub_category}`);
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
