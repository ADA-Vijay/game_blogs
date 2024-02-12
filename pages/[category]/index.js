import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container } from "react-bootstrap";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
const Index = ({ data }) => {
  console.log("Data :", data);
  const router = useRouter();
  const { category } = router.query;
  console.log("Category:", category);

  return (
    <div>
      <div className={styles.heroCardWrap}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>
            {/* {data.nodes.map((card, index) => (
                <div key={index} className={styles.heroCardBoxItem}>
                  <img
                    src={card.imageUrl}
                    alt="hero images"
                    className={styles.heroCardBoxItemImg}
                  />
                  <div className={styles.heroCardBoxItemInfo}>
                    <h6 className={styles.heroCardBoxItemBags}>{card.bags}</h6>
                    <h4 className={styles.heroCardBoxItemName}>{card.name}</h4>
                  </div>
                </div>
              ))} */}
            {data.nodes &&
              data.nodes[0] &&
              data.nodes[0].posts &&
              data.nodes[0].posts.nodes.map((card, index) => (
                <Link
                   href={`/${data.nodes[0].name}/${card.title}`}
                  key={index}
                  className={styles.heroCardBoxItem}
                  dangerouslySetInnerHTML={{ __html: card.content }}
                ></Link>
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
  console.log("Category from getServerSideProps:", category);
  const queryObj = {
    query: `
      query MyQuery {
        categories(where: { name: "${category}" }) {
          nodes {
            categoryId
            name
            posts {
              nodes {
                postId
                title
                content
              }
            }
          }
        }
      }
    `,
  };

  try {
    const response = await axios.post(ApiUrl, queryObj, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return {
      props: { data: data.data.categories },
    };
  } catch (error) {
    console.error("Error while fetching the data");
    return {
      props: { data: null },
    };
  }
}
