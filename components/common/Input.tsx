import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styles from '@/styles/sign.module.css';
import eyeon from '@/image/eye-on.svg';
import eyeoff from '@/image/eye-off.svg';
import { checkEmailValid, checkPasswordValid } from '@/utils/checkValueValid';

interface Props {
  usage: string;
}
interface FormValues {
  email: string;
  password: string;
}
const Input: React.FC<Props> = ({ usage }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormValues>();
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const usageInput = usage === '이메일';

  const handleClickeye = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  // const emailmessage = emailValue?.length > 0 ? '유효한 이메일 형식이 아닙니다.' : '이메일은 필수입니다.';
  const handleEmailFocusOut = () => {
    const emailInputValid = checkEmailValid(emailValue);
    setEmailValid(emailInputValid);
  };
  const handlePasswordFocusOut = () => {
    const passwordInputValid = checkPasswordValid(passwordValue);
    setPasswordValid(passwordInputValid);
  };
  return (
    <>
      {usageInput ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
          <label className={styles.usage}>{usage}</label>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            className={styles.input}
            style={{ borderColor: errors.email ? '#FF5B56' : '' }}
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            })}
            onBlur={handleEmailFocusOut}
          />
          {/* {!emailValid && !errors.email && <label className={styles.alert}>{emailmessage} </label>} */}
          {errors.email && <label className={styles.alert}>{errors.email.message}</label>}
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
          <label className={styles.usage}>{usage}</label>
          <div className={styles.inputFrame}>
            <input
              type={passwordShown ? 'text' : 'password'}
              placeholder="비밀번호을 입력하세요"
              className={styles.input}
              style={{ borderColor: errors.password ? '#FF5B56' : '' }}
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
                  message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
                },
              })}
              onBlur={handlePasswordFocusOut}
            />
            <Image
              onClick={handleClickeye}
              src={passwordShown ? eyeon : eyeoff}
              className={styles.passwordIcon}
              alt="eye-icon"
            />
          </div>
          {/* {!passwordValid && !errors.password && (
            <label className={styles.alert}>비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.</label>
          )} */}
          {errors.password && <label className={styles.alert}>{errors.password.message}</label>}
        </form>
      )}
    </>
  );
};

export default Input;
