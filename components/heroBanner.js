import styles from "@/styles/Home.module.css";

function HeroBanner(bannerData) {
  return (
    <div className={styles.heroCardWrap}>
          <div className={styles.heroCardBody}>
            <div className={styles.heroCardBox}>
              {bannerData.map((card, index) => (
                <Link
                  href={`${card._embedded["wp:term"][0][0].slug}/${card.slug}`}
                >
                  <div key={index} className={styles.heroCardBoxItem}>
                    <img
                      src={card.jetpack_featured_media_url}
                      alt="hero images"
                      className={styles.heroCardBoxItemImg}
                    />
                    <div className={styles.heroCardBoxItemInfo}>
                      <h6 className={styles.heroCardBoxItemBags}>
                        {card._embedded["wp:term"][0][0].name}
                      </h6>
                      <h4 className={styles.heroCardBoxItemName}>
                        {card.title.rendered}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
  );
}

export default HeroBanner;