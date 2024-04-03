import React from "react";
import styles from "@/styles/sign.module.css";
import { HookProps } from "@/consts/type";
import Link from "next/link";

const Button: React.FC<HookProps> = ({ children }) => {
  return (
    <Link href="./" className={styles.button}>
      {children}
    </Link>
  );
};

export default Button;
