import styles from "../styles/Button.module.scss";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <small>{children}</small>
    </button>
  );
}
