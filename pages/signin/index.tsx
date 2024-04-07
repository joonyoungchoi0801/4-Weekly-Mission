import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MainForm from '@/components/signin/MainForm';
import SignLayout from '@/components/layout/SignLayout';
import styles from '@/styles/sign.module.css';

function Signin() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/folder');
      localStorage.removeItem('accessToken');
    }
  }, [router]);

  return (
    <SignLayout>
      <div className={styles.pageWrapper}>
        <MainForm />
      </div>
    </SignLayout>
  );
}

export default Signin;
