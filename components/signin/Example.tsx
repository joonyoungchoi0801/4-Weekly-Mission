import React from 'react';
import Input from './Input';
import styles from '@/styles/sign.module.css';

export default function Example() {
  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <Input usage="이메일" />
        <Input usage="비밀번호" />
      </div>
    </div>
  );
}
