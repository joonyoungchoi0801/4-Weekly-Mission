import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.css";
import logo from "@/image/logo.svg";
import { getUser } from "@/utils/api";
import { HeaderItem } from "@/consts/type";

function Header() {
  const [userInfo, setInfo] = useState<HeaderItem>({
    name: "",
    email: "",
    profileImageSource: "",
  });
  const [isUserInfo, setIsUserInfo] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      const userData = await getUser();
      if (userData && !userData.error) {
        setIsUserInfo(true);
        setInfo(userData);
      } else {
        setIsUserInfo(false);
      }
    }
    getData();
  }, []);
  const useremail = userInfo.email;
  const profileImg = userInfo.profileImageSource;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headersub}>
        <div className={styles.subcontainer}>
          <Link href="./">
            <Image src={logo} alt="homelogo"></Image>
          </Link>
          <div className={styles.userInfo}>
            {isUserInfo ? (
              <>
                <div className={styles.headerimgContainer}>
                  <Image
                    width={500}
                    height={500}
                    src={profileImg}
                    id={styles.bottomimg}
                    alt="profile"
                  ></Image>
                </div>
                <span>{useremail}</span>
              </>
            ) : (
              <button id={styles.login}>로그인</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
