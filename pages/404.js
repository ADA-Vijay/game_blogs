import React from "react";
import styles from "@/styles/404.module.css";
import { useRouter } from 'next/router';

const pagenotfound = () => {
    const router = useRouter();

    const backToPrevious = (e) => {
        e.preventDefault();
        router.back();
    }

    return (
        <>
            <div className={`${styles["edgt-content"]}`}>
                <div className={`${styles["edgt-content-inner"]}`}>
                    <div className={`${styles["edgt-container"]} ${styles["edgt-404-page"]}`}>
                        <div className={`${styles["edgt-page-not-found"]}`}>
                            <div className={`${styles["edgt-404-image"]}`}>
                                <img
                                    src="https://eldritch.qodeinteractive.com/wp-content/themes/eldritch/assets/img/404.png"
                                    alt="404"
                                />
                            </div>
                            <h1 className={`${styles["edgt-error-page-title"]}`}>Go Back To The Shadow! </h1>
                            <div className={`${styles["edgt-404-separator"]}`}>
                                <img
                                    src="https://eldritch.qodeinteractive.com/wp-content/themes/eldritch/assets/img/separator.png"
                                    alt="404 separator"
                                />
                            </div>
                            <h5 className={styles["edgt-error-page-subtitle"]}>
                                The page you are looking for no longer exists. Perhaps you can
                                return back to the site's homepage and see if you can find what
                                you are looking for.{" "}
                            </h5>
                            <button
                                onClick={backToPrevious}
                                className={`${styles["edgt-btn"]} ${styles["edgt-btn-white-outline"]} ${styles["edgt-btn-medium"]} ${styles["edgt-btn-custom-border-hover"]} ${styles["edgt-404-button"]} ${styles["edgt-btn-glow"]} ${styles["edgt-btn-with-animation"]} ${styles["edgt-btn-hover-black"]}`}
                                data-hover-border-color="#fff"
                            >
                                <span className="edgt-btn-text">Go Back</span>
                                <span className="edgt-btn-helper"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default pagenotfound;
