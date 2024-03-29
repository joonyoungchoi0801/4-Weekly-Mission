import { MouseEvent, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Card.module.css";
import ErrorImage from "@/image/noimg.png";
import StarIcon from "@/image/star.svg";
import Kebab from "@/image/kebab.svg";
import { setTime } from "@/utils/setTime";
import { Item2 } from "@/consts/type";
interface CardClick {
  [key: number]: boolean;
}

interface Props {
  items: Item2[];
  inputValue: string;
}

function Card({ items, inputValue }: Props) {
  const [handleVisibleMenu, setVisibleMenu] = useState<CardClick>({});
  const [inputItems, setInputItems] = useState<Item2[]>(items);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      return (
        item.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.url?.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    setInputItems(filteredItems);
  }, [items, inputValue]);

  const clickKebab = (event: MouseEvent, id: number) => {
    event.preventDefault();
    setVisibleMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {inputItems.map((item) => (
        <Link
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          key={item.id}
        >
          <div className={styles.imgSection}>
            {item.imageSource ? (
              <img src={item.imageSource} alt={item.title}></img>
            ) : (
              <Image src={ErrorImage} alt={item.title}></Image>
            )}
            <Image src={StarIcon} alt="star" id={styles.starIcon}></Image>
          </div>
          <div className={styles.infoSection}>
            <Image
              src={Kebab}
              alt="kebab"
              id={styles.kebab}
              onClick={(event) => clickKebab(event, item.id)}
            ></Image>
            {handleVisibleMenu[item.id] && (
              <div className={styles.menuOptions}>
                <p className={`${styles.folder} ${styles.deleteFolder}`}>
                  삭제하기
                </p>
                <p className={`${styles.folder} ${styles.addFolder}`}>
                  폴더에 추가
                </p>
              </div>
            )}
            <span className={styles.time}>{setTime(item.createdAt)}</span>
            <span className={styles.info}>{item.title}</span>
            <span className={styles.date}>{item.description}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Card;
