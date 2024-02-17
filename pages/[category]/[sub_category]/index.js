import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/Home.module.css";

const index = ({ data }) => {
  console.log("Result Data", data);
  const router = useRouter();
  const { category, sub_category } = router.query;
  return (
    <div>
      <div className={styles.heroCardWrap}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>

            {data && data.length > 0 ? (
              <>
                <div key={index} className={styles.latestBoxItem}> 
                  <img
                    src={data[0].jetpack_featured_media_url}
                    alt="hero images"
                    className={styles.latestImg}
                  />
                  <div className={styles.latestInfo}>
                    <h6 className={styles.heroCardBoxItemBags}>
                      {data[0].title.rendered}
                    </h6>
                    {/* <a href="#">{card.name}</a> */}
                    <h5 className="description" dangerouslySetInnerHTML={{__html:data[0].excerpt.rendered}}></h5> 
                  </div>
                </div>
              </>
            ) : (
              <div key={index} className={styles.heroCardBoxItem}>
                <h2 className="text-center">
                  No Content found on {sub_category}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="commentSection">
       <h4 className="sitetitle">
       </h4>
       <div className="comments">
       </div>
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
