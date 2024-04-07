import { useState, useEffect, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Card.module.css';
import ErrorImage from '@/image/noimg.png';
import StarIcon from '@/image/star.svg';
import Kebab from '@/image/kebab.svg';
import { setTime } from '@/utils/setTime';
import { getFolderList, getFolderType } from '@/utils/api';
import Delete from '@/modals/Delete';
import Add from '@/modals/Add';
import { Folder, Item1 } from '@/consts/type';

interface CardClick {
  [key: number]: boolean;
}

interface Props {
  selectedFolder: Folder;
  dataInfo: (isDataNull: boolean) => void;
  inputValue: string;
}

function Cardfolder({ selectedFolder, dataInfo, inputValue }: Props) {
  const [handleVisibleMenu, setVisibleMenu] = useState<CardClick>({});
  const [items, setItems] = useState<Item1[]>([]);
  const [inputItems, setInputItems] = useState<Item1[]>(items);
  const [dataNull, setDataNull] = useState<boolean>(true);
  const [selectedItemDelete, setSelectedItemDelete] = useState<Item1 | null>(null);
  const [folderListData, setFolderListData] = useState<Folder[]>([]);
  const [addFolderSelected, setAddFolderSelected] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLBodyElement | null>(null);
  useEffect(() => {
    async function getFolderData() {
      const result = await getFolderList(selectedFolder.id);
      if (result.data?.length === 0) {
        setDataNull(true);
        dataInfo(true);
      } else {
        setDataNull(false);
        dataInfo(false);
        const updatedData = result.data.map((item: Item1) => ({
          ...item,
          image_source: item.image_source && item.image_source.startsWith('https') ? item.image_source : null,
        }));

        setItems(updatedData);
      }
    }
    async function getFolderListData() {
      const result = await getFolderType();
      const updateData = [...result.data];
      setFolderListData(updateData);
    }
    getFolderData();
    getFolderListData();
  }, [selectedFolder.id, dataInfo]);

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
  useEffect(() => {
    const root = document.getElementById('modal-root') as HTMLBodyElement;
    setModalRoot(root);
  }, []);

  const clickKebab = (event: MouseEvent, id: number) => {
    event.preventDefault();
    setVisibleMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const folderList = folderListData.map((item) => ({
    id: item.id,
    name: item.name,
    count: item.link.count,
  }));

  const handleAddFolderClick = (event: MouseEvent, item: Item1) => {
    event.preventDefault();
    setVisibleMenu((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    setAddFolderSelected(true);
  };
  const handleCloseClick = () => {
    setAddFolderSelected(false);
  };

  const handleOpenDelete = (event: MouseEvent, item: Item1) => {
    event.preventDefault();
    setVisibleMenu((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    setSelectedItemDelete(item);
  };
  const handleCloseDelete = () => {
    setSelectedItemDelete(null);
  };
  if (dataNull) return <span className="errorInfo">저장된 링크가 없습니다.</span>;
  return (
    <>
      {inputItems.map((item) => (
        <Link href={item.url} target="_blank" rel="noopener noreferrer" className={styles.card} key={item.id}>
          <div className={styles.imgSection}>
            {item.image_source ? (
              <img src={item.image_source} alt={item.title}></img>
            ) : (
              <Image src={ErrorImage} alt={item.title}></Image>
            )}
            <Image src={StarIcon} alt="star" id={styles.starIcon}></Image>
          </div>
          <div className={styles.infoSection}>
            <Image src={Kebab} alt="kebab" id={styles.kebab} onClick={(event) => clickKebab(event, item.id)}></Image>
            {handleVisibleMenu[item.id] && (
              <div className={styles.menuOptions}>
                <p
                  className={`${styles.folder} ${styles.deleteFolder}`}
                  onClick={(event) => handleOpenDelete(event, item)}
                >
                  삭제하기
                </p>
                <p
                  className={`${styles.folder} ${styles.addFolder}`}
                  onClick={(event) => handleAddFolderClick(event, item)}
                >
                  폴더에 추가
                </p>
              </div>
            )}
            {selectedItemDelete &&
              ReactDOM.createPortal(
                <Delete
                  title="링크 삭제"
                  main={selectedItemDelete.url}
                  buttonText="삭제하기"
                  onClose={handleCloseDelete}
                />,
                modalRoot as HTMLBodyElement
              )}
            {addFolderSelected &&
              ReactDOM.createPortal(<Add data={folderList} onClose={handleCloseClick} />, modalRoot as HTMLBodyElement)}
            <span className={styles.time}>{setTime(item.created_at)}</span>
            <span className={styles.info}>{item.title}</span>
            <span className={styles.date}>{item.description}</span>
            <span className={styles.timeStamp}>{item.created_at.split('T')[0]}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Cardfolder;
