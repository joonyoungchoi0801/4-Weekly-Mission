import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '@/styles/sign.module.css';
import Input from '@/components/common/Input';
import { getSigninCheck } from '@/utils/api';

interface FormValues {
  email: string;
  password: string;
}

interface InputFormProps {
  handleEmail: (email: string) => void;
  handlePassword: (password: string) => void;
  error: string | boolean;
}
const InputForm: React.FC<InputFormProps> = ({ handleEmail, handlePassword, error }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    trigger,
  } = useForm<FormValues>();
  const emailValue = getValues('email');
  const passwordValue = getValues('password');
  const router = useRouter();
  useEffect(() => {
    handleEmail(emailValue);
    handlePassword(passwordValue);
  }, [emailValue, passwordValue]);
  const emailRegister = register('email', {
    required: '이메일은 필수입니다.',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: '유효한 이메일 형식이 아닙니다.',
    },
  });
  const passwordRegister = register('password', {
    required: '비밀번호는 필수입니다.',
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
      message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await getSigninCheck(data.email, data.password);
      if (result.error) {
        error = true;
      } else {
        localStorage.setItem('accessToken', result.accessToken);
        router.push('/folder');
      }
    } catch (error) {
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.inputFormWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
        <Input
          usage="이메일"
          placeholder="이메일을 입력하세요"
          register={emailRegister}
          errors={errors.email}
          type="text"
          onBlur={() => trigger('email')}
          apiError={error}
        />
        {errors.email && <label className={styles.alert}>{errors.email.message}</label>}
        {!errors.email && error && <label className={styles.alert}>이메일을 확인해 주세요.</label>}
      </form>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
        <Input
          usage="비밀번호"
          placeholder="비밀번호를 입력하세요"
          register={passwordRegister}
          errors={errors.password}
          type="password"
          onBlur={() => trigger('password')}
          apiError={error}
        />
        {errors.password && <label className={styles.alert}>{errors.password.message}</label>}
        {!errors.password && error && <label className={styles.alert}>비밀번호를 확인해 주세요.</label>}
      </form>
    </div>
  );
};
export default InputForm;
