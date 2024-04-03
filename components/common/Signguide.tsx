import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/sign.module.css";
import logo from "@/image/signlogo.svg";

interface Props {
  guide: string;
  linkstr: string;
}

const Signguide: React.FC<Props> = ({ guide, linkstr }) => {
  return (
    <div className={styles.logoWrapper}>
      <Link className={styles.link} href="./">
        <Image src={logo} alt="logo"></Image>
      </Link>
      <div className={styles.guide}>
        <span id={styles.guideSpan}>{guide}</span>
        <Link id={styles.guideLink} href="./signup">
          {linkstr}
        </Link>
      </div>
    </div>
  );
};

export default Signguide;
