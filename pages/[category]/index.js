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
              {data && data.map((card, index) => (
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
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(ApiUrl)
  console.log("Category from getServerSideProps:", category);

  try {
    const response = await axios.get(ApiUrl +"posts?categories?slug" + category);
    const data = response.data;
    return {
      props: { data: data },
    };
  } catch (error) {
    console.error("Error while fetching the data",error);
    return {
      props: { data: null },
    };
  }
}
