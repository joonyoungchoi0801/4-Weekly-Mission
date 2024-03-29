import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";
import facebookIcon from "@/image/akar-icons_facebook-fill.svg";
import twitterIcon from "@/image/akar-icons_twitter-fill.svg";
import youtubeIcon from "@/image/akar-icons_youtube-fill.svg";
import instagramIcon from "@/image/ant-design_instagram-filled.svg";
import { useFooterVisibility } from "@/hooks/useComponentVisible";

function Footer() {
  const { setFooterVisibility } = useFooterVisibility();
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisibility(entry.isIntersecting);
    });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [setFooterVisibility]);
  return (
    <div ref={footerRef} className={styles.footer}>
      <div className={styles.footerBox}>
        <span id={styles.codeit}>©codeit - 2023</span>
        <div className={styles.centerfooter}>
          <Link
            className={styles.centerlink}
            href="https://www.codeit.kr/subscription"
          >
            Privacy Policy
          </Link>
          <Link className={styles.centerlink} href="https://www.codeit.kr/faq">
            FAQ
          </Link>
        </div>
        <div className={styles.endfooter}>
          <Link href="https://www.facebook.com/">
            <Image
              className={styles.endimg}
              src={facebookIcon}
              alt="facebook"
            ></Image>
          </Link>
          <Link href="https://twitter.com/home?lang=ko">
            <Image
              className={styles.endimg}
              src={twitterIcon}
              alt="twitter"
            ></Image>
          </Link>
          <Link href="https://www.youtube.com/">
            <Image
              className={styles.endimg}
              src={youtubeIcon}
              alt="youtube"
            ></Image>
          </Link>
          <Link href="https://www.instagram.com/">
            <Image
              className={styles.endimg}
              src={instagramIcon}
              alt="instagram"
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
