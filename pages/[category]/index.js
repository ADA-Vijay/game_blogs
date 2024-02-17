import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container } from "react-bootstrap";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
const Index = ({ data }) => {
  console.log("Category Data :", data);
  const router = useRouter();
  const { category } = router.query;
  console.log("Category:", category);

  return (
    <div>
      <div className={styles.heroCardWrap}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>
            {data &&
              data.map((card, index) => (
                <Link href={`${category}/${card.slug}`}>
                  <div key={index} className={styles.heroCardBoxItem}>
                    <img
                      src={card.jetpack_featured_media_url}
                      alt="hero images"
                      className={styles.heroCardBoxItemImg}
                    />
                    {/* <div className={styles.heroCardBoxItemInfo}>
                    <h6 className={styles.heroCardBoxItemBags}>{card.bags}</h6>
                    <h4 className={styles.heroCardBoxItemName}>{card.name}</h4>
                  </div> */}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
export async function getServerSideProps(context) {
  const { category } = context.query;

  if (!category) {
    return {
      props: { data: null },
    };
  }

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  //https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?slug=death-note
  try {
    const categoryResponse = await axios.get(
      `${ApiUrl}categories?slug=${category}`
    );
    const categoryId = categoryResponse.data[0]?.id;

    if (!categoryId) {
      return {
        props: { data: null },
      };
    }

    // Fetch posts based on the category ID
    const response = await axios.get(`${ApiUrl}posts?categories=${categoryId}`);
    const data = response.data;

    return {
      props: { data: data },
    };
  } catch (error) {
    console.error("Error while fetching the data", error);
    return {
      props: { data: null },
    };
  }
}
