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
import Container from "react-bootstrap/Container";
import HeroBanner from "../../components/heroBanner"


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
      {/* <div className={styles.heroCardWrap}>
        <Container>
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
        </Container>
      </div> */}
      <div className={styles.latestWrap}>
        <Container>
          <div className={styles.latestBody}>
            <HeroBanner></HeroBanner>
            <div className={styles.latestContent}>
              {/* <div className={styles.titleName}>Latest</div> */}
                <div className={styles.latestBox}>
                  {data && data.length > 0 ?(
                    data.map((card, index) => (
                        <div className={styles.subListingsItem} dangerouslySetInnerHTML={{__html:card.content.rendered}} onClick={()=>redirect(card)}>
                        </div>
                    )) 
                  ):( <div className={styles.heroCardBoxItem}>
                    No data found on this category
                  </div>)
                  }
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
