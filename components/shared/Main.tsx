import Card from "./Card";
import Image from "next/image";
import styles from "@/styles/main.module.css";
import { getFolder } from "@/utils/api";
import searchIcon from "@/image/Search.svg";
import closeIcon from "@/image/close.svg";
import { useEffect, useState } from "react";
import { Item2 } from "@/consts/type";

function Main() {
  const [data, setData] = useState<Item2[]>([]);
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    async function getFolderData() {
      const result = await getFolder();
      const { folder } = result;
      setData(folder.links);
    }
    getFolderData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const handleInputClear = () => {
    setInputData("");
  };
  const closeIconStyle = inputData ? {} : { display: "none" };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainframe}>
        <div className={styles.searchbar}>
          <input
            id={styles.searchtopic}
            value={inputData}
            onChange={handleInputChange}
            placeholder="링크를 검색해 보세요"
          />
          <Image src={searchIcon} id={styles.searchIcon} alt="searchIcon" />
          <Image
            src={closeIcon}
            onClick={handleInputClear}
            style={closeIconStyle}
            id={styles.searchIcon}
            alt="closeIcon"
          />
        </div>
      </div>
      <div className={styles.gridframe}>
        <Card items={data} inputValue={inputData} />
      </div>
    </div>
  );
}

export default Main;
