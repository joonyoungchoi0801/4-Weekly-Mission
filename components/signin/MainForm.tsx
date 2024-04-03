import styles from "@/styles/sign.module.css";
import Signguide from "@/components/common/Signguide";
import InputForm from "@/components/signin/InputForm";
import Button from "@/components/common/Button";
import SocialLogin from "@/components/common/SocialLogin";
const MainForm = () => {
  return (
    <div className={styles.wrapper}>
      <Signguide guide="회원이 아니신가요?" linkstr="회원 가입하기" />
      <InputForm />
      <Button>로그인</Button>
      <SocialLogin description="소셜 로그인" />
    </div>
  );
};

export default MainForm;
