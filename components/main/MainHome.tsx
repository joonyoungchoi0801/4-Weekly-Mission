import React from "react";
import Link from "next/link";
import styled from "styled-components";
import styles from "@/styles/homepage.module.css";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 20px;
  background-color: #6d6afe;
  color: black;
  border-radius: 25px;
  text-decoration: none;
`;

function MainHome() {
  return (
    <div className={styles.home}>
      <Link className={styles.homebtn} href="/shared">
        Shared Page
      </Link>
      <Link className={styles.homebtn} href="/folder">
        Folder page
      </Link>
    </div>
  );
}

export default MainHome;
