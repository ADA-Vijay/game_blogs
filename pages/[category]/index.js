// import React from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { Container } from "react-bootstrap";
// import styles from "@/styles/Home.module.css";
// import Link from "next/link";
// const Index = ({ data }) => {
//   console.log("Category Data :", data);


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
  useEffect(() => {
    setData(initialData);
    setPage(1)
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
  
  useEffect(() => {
    console.log("useEffect - initialData:", initialData);
  }, [initialData]);
  
  useEffect(() => {
    console.log("useEffect - data, loading, hasMoreData:", data, loading, hasMoreData);
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
        `${process.env.NEXT_PUBLIC_API_URL}posts?categories=${categoryId}&per_page=10&page=${page + 1}&_embed`
      );
      const newData = response.data;
  
      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setLoading(false)
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Error while fetching more data", error);
    } finally {
      setLoading(false);
    }
  };
   const redirect = (card)=>{
    router.push(`/${category}/${card.slug}`)
   }

  return (
    <div>
      <div className={styles.heroCardWrap}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>
            {data && data.length > 0 ?(
              data.map((card, index) => (
                  <div className={styles.heroCardBoxItem} dangerouslySetInnerHTML={{__html:card.content.rendered}} onClick={()=>redirect(card)}>
                  </div>
              )) 
            ):( <div className={styles.heroCardBoxItem}>
              No data found on this category
            </div>)
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const { category } = context.query;
   console.log("category choosen by the user",category)
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
    console.log("Category Response from the server ", categoryResponse)
    const categoryId = categoryResponse.data[0]?.id;
    
    if (!categoryId) {
      return {
        props: { initialData: [] },
      };
    }

    const response = await axios.get(
      `${ApiUrl}posts?categories=${categoryId}&per_page=10`
    ); 
    // if(response.pageProps.initialData){
    //   console.log("Page props comes")
    // }
    const initialData = response.data;
    console.log("response for the categoryid ",initialData)
     if(initialData.length > 0){
      return {
        props: { initialData :initialData  },
      };
     }else{
      return {
        props: { initialData :initialData },
      };
     }
  
  } catch (error) {
    console.error("Error while fetching the data", error);
    return {
      props: { initialData: null },
    };
  }
}
