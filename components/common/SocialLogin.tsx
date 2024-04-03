import React from "react";
import styles from "@/styles/sign.module.css";
import Image from "next/image";
import kakao from "@/image/KakaoTalk_logo.svg";
import google from "@/image/google_logo.svg";
import Link from "next/link";
interface Props {
  description: string;
}
const SocialLogin: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.socialWrapper}>
      <span className={styles.socialGuide}>{description}</span>
      <div className={styles.imgWrapper}>
        <Link href="https://www.google.com">
          <Image className={styles.icon} src={google} alt="google" />
        </Link>
        <Link href="https://www.kakaocorp.com/page">
          <Image className={styles.icon} src={kakao} alt="kakao" />
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
