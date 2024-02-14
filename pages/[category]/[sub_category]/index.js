import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from "@/styles/Home.module.css";

const index = ({resultData}) => {
  console.log("Result Data", resultData)
  const router = useRouter()
  const {category,sub_category} = router.query
  console.log("category : ", category)
  console.log("subcategory :", sub_category)
  return (
    <div>
     <div className={styles.heroCardWrap}>
          <div className={styles.heroCardBody}>
            <div className={styles.heroCardBox}>
              {resultData && resultData.map((card, index) => (
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
  )
}

export default index


export async function getServerSideProps(context) {
  const { category, sub_category } = context.query;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(ApiUrl + "posts?slug=" + sub_category);
    const { data } = response; 

    console.log("Data for Subcategory", data);
    return {
      props: {
        resultData: data,
      },
    };
  } catch (error) {
    console.log("error while fetching the data", error);
  }
}

