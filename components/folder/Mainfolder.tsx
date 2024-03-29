import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cardfolder from './Cardfolder';
import FolderList from './FolderList';
import styles from '@/styles/main.module.css';
import { getFolderType } from '@/utils/api';
import searchIcon from '@/image/Search.svg';
import closeIcon from '@/image/close.svg';

interface Folder {
  id: number | null;
  name: string;
  link: {
    count?: number;
  };
}

function Mainfolder() {
  const [data, setData] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder>({
    id: null,
    name: '',
    link: {},
  });
  const [dataNull, setDataNull] = useState(true);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    async function getFolderData() {
      const result = await getFolderType();
      const updateData: Folder[] = [{ id: null, name: '전체', link: {} }, ...result.data];
      setData(updateData);
    }
    getFolderData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const handleInputClear = () => {
    setInputData('');
  };
  const closeIconStyle = inputData ? {} : { display: 'none' };

  const folderList = data.map((item) => ({
    id: item.id,
    name: item.name,
    count: item.link.count,
  }));

  const onFolderSelect = (id: number | null) => {
    const folder = folderList.find((folder) => folder.id === id);
    if (folder) {
      const updatedFolder: Folder = {
        ...folder,
        link: {
          count: folder.count,
        },
      };
      setSelectedFolder(updatedFolder);
    }
  };

  const handleDataNullUpdate = (isDataNull: boolean) => {
    setDataNull(isDataNull);
  };
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
            id={styles.closeIcon}
            alt="closeIcon"
          />
        </div>
      </div>
      <div className={styles.listFrame}>
        <FolderList folderListData={folderList} onFolderSelect={onFolderSelect} selectedFolder={selectedFolder} />
      </div>
      <div className={dataNull ? styles.nullContent : styles.gridframe}>
        <Cardfolder selectedFolder={selectedFolder} inputValue={inputData} dataInfo={handleDataNullUpdate}></Cardfolder>
      </div>
    </div>
  );
}

export default Mainfolder;
