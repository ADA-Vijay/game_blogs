import React from 'react'
import styles from "@/styles/Home.module.css";
import Container from "react-bootstrap/Container";
import Link from 'next/link';
import { useRouter } from 'next/router';
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
const lisitng = ({newdata}) => {

     const router = useRouter()
     const {category} = router.query
    const formatDate = (isoDate) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', options);
      };
    
      const formatTime = (isoDate) => {
        const options = { hour: '2-digit', minute: '2-digit'};
        const date = new Date(isoDate);
        return date.toLocaleTimeString('en-US', options);
      };
  return (
    <div className={styles.latestWrap}>
    <Container>
      <div className={styles.latestBody}>
        <div className={styles.latestContent}>
          <div className={styles.titleName}>{}</div>
          <div className={styles.latestBox}>
            { newdata && newdata.length> 0 ? (newdata.map((card, index) => (
              <Link  href={card._embedded["wp:term"][0][0].slug + "/"+card.slug} key={index}>
                 <div
                className={styles.latestBoxItem}
                key={index}
                // onClick={() => Navigate(card)}
              >
                <img
                  className={styles.latestImg}
                  src={card.jetpack_featured_media_url}
                  alt="img"
                />
                <div className={styles.latestInfo} key={index}>
                  <h6>{card._embedded["wp:term"][0][0].name}</h6>
                  <p dangerouslySetInnerHTML={{__html:card.title.rendered}}></p>
                  <span>{formatDate(card.date)} {formatTime(card.date)}</span>
                  <h5 className="description">Author : {card._embedded.author[0].name}</h5>
                  {/* <h5
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: card.excerpt.rendered,
                    }}
                  ></h5> */}
                </div>
              </div>
              </Link>
           
            ))) : (<>
              <p>no data to show</p>
            </>)}
          </div>
        </div>
        <div className={styles.trendingTopWrap}>
          <div>
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4El1B5cOf9EjkuWgq4J_2RBIjo4jmzznJ8_3aMgezV3h3DJpE" alt="img"/>
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
  )
}

export default lisitng