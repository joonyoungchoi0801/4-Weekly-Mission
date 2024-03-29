import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.css";
import logo from "@/image/logo.svg";
import { getUser, getFolder } from "@/utils/api";
import { HeaderItem } from "@/consts/type";

function Header() {
  const [userInfo, setInfo] = useState<HeaderItem>({
    name: "",
    email: "",
    profileImageSource: "",
  });
  const [folderInfo, setFolder] = useState({ name: "", profile: "" });
  const [isUserInfo, setIsUserInfo] = useState(true);

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
    async function getFolderData() {
      const folderData = await getFolder();
      const folderName = folderData.folder.name;
      const folderImg = folderData.folder.owner.profileImageSource;
      setFolder({ name: folderName, profile: folderImg });
    }
    getData();
    getFolderData();
  }, []);
  const username = userInfo.name;
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
                    src={profileImg}
                    id={styles.bottomimg}
                    width={500}
                    height={500}
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
      <div className={styles.headermain}>
        <div className={styles.maininfo}>
          <div className={styles.frameinfo}>
            <Image
              width={500}
              height={500}
              src={folderInfo.profile}
              id={styles.folderImg}
              alt="folderprofile"
            ></Image>

            <span>{username}</span>
          </div>
          <div className={styles.bookmarkinfo}>
            <span>{folderInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
