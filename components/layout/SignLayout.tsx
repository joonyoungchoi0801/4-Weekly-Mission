import styles from "@/styles/layout.module.css";
import { HookProps } from "@/consts/type";
const SignLayout: React.FC<HookProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default SignLayout;
