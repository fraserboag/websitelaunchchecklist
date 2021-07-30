import styles from "../styles/Footer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setEndModalOpen } from "../slices/progressSlice";
import * as gtag from "../utils/gtag";

export default function Footer() {
  const dispatch = useDispatch();
  const checklist = useSelector((state) => state.progress.checklist);

  let totalComplete = 0;
  let totalItems = 0;

  checklist.forEach((sec) => {
    sec.listItems.forEach((item) => {
      totalItems++;
      if (item.checked) totalComplete++;
    });
  });

  const percentage = Math.round((totalComplete / totalItems) * 100);

  let title = "Get going!";
  if (percentage > 10) {
    title = "Off to a good start!";
  }
  if (percentage > 40) {
    title = "Doing great!";
  }
  if (percentage > 80) {
    title = "Nearly there!";
  }
  if (percentage === 100) {
    title = "Well done!";
    dispatch(setEndModalOpen(true));
  }

  return (
    <>
      <div className={styles.progress}>
        <h3>{title}</h3>
        <p>
          <strong>{totalComplete}</strong> of <strong>{totalItems}</strong>{" "}
          tasks marked as complete. Progress is saved within your web browser,
          so feel free to come back later once you're ready to check off some
          more.
        </p>
      </div>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.bar}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        />
        <div className={styles.total}>{percentage}%</div>
      </div>

      <footer className={styles.footer}>
        <h3>
          About <br />
          this website
        </h3>
        <p>
          Just a little side project by web developer{" "}
          <a
            href="https://www.boag.online"
            target="_blank"
            onClick={() =>
              gtag.event({
                action: "Click Boag.online Footer Link",
                category: "Link Click",
              })
            }
          >
            Fraser Boag
          </a>
          . Please feel free to get in touch via my personal website if you have
          any suggestions, corrections or questions.
        </p>
        <small>
          Find this useful and want to say thanks?{" "}
          <a
            href="https://www.buymeacoffee.com/boag"
            target="_blank"
            onClick={() =>
              gtag.event({
                action: "Click Buy Me a Beer Link",
                category: "Link Click",
              })
            }
          >
            Buy me a beer!
          </a>
        </small>
      </footer>
    </>
  );
}
