// import React from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import styles from "@/styles/Home.module.css";
// import Link from "next/link";
// const Index = ({ data }) => {
//   console.log("Category Data :", data);
//   const router = useRouter();
//   const { category } = router.query;
//   console.log("Category:", category);

//   return (
//     <div>
//       <div className={styles.heroCardWrap}>
//         <div className={styles.heroCardBody}>
//           <div className={styles.heroCardBox}>
//             {data &&
//               data.map((card, index) => (
//                 <Link href={`${category}/${card.slug}`}>
//                   <div key={index} className={styles.heroCardBoxItem}>
//                     <img
//                       src={card.jetpack_featured_media_url}
//                       alt="hero images"
//                       className={styles.heroCardBoxItemImg}
//                     />
//                     {/* <div className={styles.heroCardBoxItemInfo}>
//                     <h6 className={styles.heroCardBoxItemBags}>{card.bags}</h6>
//                     <h4 className={styles.heroCardBoxItemName}>{card.name}</h4>
//                   </div> */}
//                   </div>
//                 </Link>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;
// export async function getServerSideProps(context) {
//   const { category } = context.query;

//   if (!category) {
//     return {
//       props: { data: null },
//     };
//   }

//   const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
//   try {
//     const categoryResponse = await axios.get(
//       `${ApiUrl}categories?slug=${category}`
//     );
//     const categoryId = categoryResponse.data[0]?.id;

//     if (!categoryId) {
//       return {
//         props: { data: null },
//       };
//     }

//     const response = await axios.get(
//       `${ApiUrl}posts?categories=${categoryId}&per_page=10`
//     );    const data = response.data;

//     return {
//       props: { data: data },
//     };
//   } catch (error) {
//     console.error("Error while fetching the data", error);
//     return {
//       props: { data: null },
//     };
//   }
// }

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const Index = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const router = useRouter();

  const { category } = router.query; 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMoreData
      ) {
        loadMoreData();
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
        `${process.env.NEXT_PUBLIC_API_URL}posts?categories=${categoryId}&per_page=10&page=${page + 1}`
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
      <div className={styles.heroCardWrap}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>
            {data &&
              data.map((card, index) => (
                <Link href={`/${category}/${card.slug}`} key={index}>
                  <div className={styles.heroCardBoxItem}>
                    <img
                      src={card.jetpack_featured_media_url}
                      alt="hero images"
                      className={styles.heroCardBoxItemImg}
                    />
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
      props: { initialData: null },
    };
  }

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const categoryResponse = await axios.get(
      `${ApiUrl}categories?slug=${category}`
    );

    const categoryId = categoryResponse.data[0]?.id;

    if (!categoryId) {
      return {
        props: { initialData: null },
      };
    }

    const response = await axios.get(
      `${ApiUrl}posts?categories=${categoryId}&per_page=10`
    );
    const initialData = response.data;

    return {
      props: { initialData },
    };
  } catch (error) {
    console.error("Error while fetching the data", error);
    return {
      props: { initialData: null },
    };
  }
}
