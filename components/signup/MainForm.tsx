import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/sign.module.css';
import Signguide from '@/components/common/Signguide';
import InputForm from '@/components/signup/InputForm';
import Button from '@/components/common/Button';
import SocialLogin from '@/components/common/SocialLogin';
import { getSignup, getEmailCheck } from '@/utils/api';

const MainForm = () => {
  const [emailExist, setEmailExist] = useState<string | boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordCheckValue, setPasswordCheckValue] = useState<string>('');
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();
  const handleEmailChange = (email: string) => {
    setEmailValue(email);
  };
  const handlePasswordChange = (password: string) => {
    setPasswordValue(password);
  };
  const handlePasswordCheckChange = (passwordCheck: string) => {
    setPasswordCheckValue(passwordCheck);
  };
  useEffect(() => {
    const checkEmail = async () => {
      if (emailValue) {
        const data = await getEmailCheck(emailValue);
        setEmailExist(data);
      }
    };
    checkEmail();
  }, [emailValue]);
  const handleButtonClick = () => {
    const checkSign = async () => {
      try {
        const data = await getSignup(emailValue, passwordValue);
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
    if (passwordValue === passwordCheckValue && !emailExist) {
      checkSign();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Signguide guide="이미 회원이신가요?" linkstr="로그인하기" page="signup" />
      <InputForm
        emailExist={emailExist}
        handleEmail={handleEmailChange}
        handlePassword={handlePasswordChange}
        handlePasswordCheck={handlePasswordCheckChange}
        error={error}
      />
      <Button onClick={handleButtonClick}>로그인</Button>
      <SocialLogin description="소셜 로그인" />
    </div>
  );
};

export default MainForm;
