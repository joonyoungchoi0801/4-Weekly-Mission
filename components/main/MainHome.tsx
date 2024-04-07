import React from 'react';
import Link from 'next/link';

import styles from '@/styles/homepage.module.css';

function MainHome() {
  return (
    <div className={styles.home}>
      <Link className={styles.homebtn} href="/shared">
        Shared Page
      </Link>
      <Link className={styles.homebtn} href="/folder">
        Folder page
      </Link>
      <Link className={styles.homebtn} href="/signin">
        Signin Page
      </Link>
      <Link className={styles.homebtn} href="/signup">
        Signup Page
      </Link>
    </div>
  );
}

export default MainHome;
