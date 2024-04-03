import MainForm from "@/components/signin/MainForm";
import SignLayout from "@/components/layout/SignLayout";

import styles from "@/styles/sign.module.css";

function Signin() {
  return (
    <SignLayout>
      <div className={styles.pageWrapper}>
        <MainForm />
      </div>
    </SignLayout>
  );
}

export default Signin;
