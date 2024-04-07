import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/sign.module.css';
import Signguide from '@/components/common/Signguide';
import InputForm from '@/components/signin/InputForm';
import Button from '@/components/common/Button';
import SocialLogin from '@/components/common/SocialLogin';
import { getSigninCheck } from '@/utils/api';

const MainForm = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();
  const handleEmailChange = (email: string) => {
    setEmailValue(email);
  };
  const handlePasswordChange = (password: string) => {
    setPasswordValue(password);
  };
  const handleButtonClick = () => {
    const checkSign = async () => {
      try {
        const data = await getSigninCheck(emailValue, passwordValue);
        if (data.error) {
          setError(true);
        } else {
          localStorage.setItem('accessToken', data.accessToken);
          router.push('/folder');
        }
      } catch (error) {
        alert('로그인 처리 중 오류가 발생했습니다.');
      }
    };
    checkSign();
  };

  return (
    <div className={styles.wrapper}>
      <Signguide guide="회원이 아니신가요?" linkstr="회원 가입하기" page="signin" />
      <InputForm handleEmail={handleEmailChange} handlePassword={handlePasswordChange} error={error} />
      <Button onClick={handleButtonClick}>로그인</Button>
      <SocialLogin description="소셜 로그인" />
    </div>
  );
};

export default MainForm;
