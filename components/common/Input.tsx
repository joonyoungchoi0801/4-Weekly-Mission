import React, { useState } from 'react';
import Image from 'next/image';

import styles from '@/styles/sign.module.css';
import eyeon from '@/image/eye-on.svg';
import eyeoff from '@/image/eye-off.svg';
import { FieldError } from 'react-hook-form';

interface Props {
  usage: string;
  register: any;
  placeholder: string;
  errors: FieldError | undefined;
  type: string;
  onBlur: () => void;
  apiError: string | boolean;
}

const Input: React.FC<Props> = ({ usage, register, placeholder, errors, type, onBlur, apiError }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const handleClickeye = () => {
    setPasswordShown(!passwordShown);
  };
  const inputType = type === 'password' ? (passwordShown ? 'text' : 'password') : type;
  return (
    <>
      <label className={styles.usage}>{usage}</label>
      <div className={styles.inputFrame}>
        <input
          type={inputType}
          placeholder={placeholder}
          className={styles.input}
          style={{ borderColor: errors || apiError ? '#FF5B56' : '' }}
          {...register}
          onBlur={onBlur}
        />
        <Image
          onClick={handleClickeye}
          style={{ display: usage == '이메일' ? 'none' : '' }}
          src={passwordShown ? eyeon : eyeoff}
          className={styles.passwordIcon}
          alt="eye-icon"
        />
      </div>
    </>
  );
};

export default Input;
