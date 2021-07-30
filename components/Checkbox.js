import styles from "../styles/Checkbox.module.scss";
import { BiCheck } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Checkbox({ checked, onClick, white }) {
  return (
    <motion.button
      onClick={onClick}
      className={`${styles.checkbox} ${checked ? styles.checked : ""} ${
        white ? styles.white : ""
      }`}
      initial={{
        scale: 1,
      }}
      animate={checked ? { scale: 1.1 } : { scale: 1 }}
      transition={{ type: "spring", duration: 0.7, bounce: 0.7 }}
    >
      <motion.div
        className={styles.iconWrapper}
        initial={{
          scale: 0,
        }}
        animate={checked ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.7 }}
      >
        <BiCheck />
      </motion.div>
    </motion.button>
  );
}
