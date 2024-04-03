import React from "react";
import styles from "@/styles/sign.module.css";
import Input from "@/components/common/Input";

const InputForm = () => {
  return (
    <div className={styles.inputFormWrapper}>
      <Input usage="이메일" />
      <Input usage="비밀번호" />
    </div>
  );
};
export default InputForm;
