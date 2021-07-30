import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Header.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { ImSpinner11 } from "react-icons/im";
import Checkbox from "./Checkbox";
import Button from "./Button";
import {
  openSettings,
  closeSettings,
  doHideLinks,
  dontHideLinks,
  doHideCompleted,
  dontHideCompleted,
  resetListItems,
  setEndModalOpen,
} from "../slices/progressSlice";
import { motion } from "framer-motion";

export default function Header() {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const settingsOpen = useSelector((state) => state.progress.settingsOpen);
  const endModalOpen = useSelector((state) => state.progress.endModalOpen);
  const hideLinks = useSelector((state) => state.progress.hideLinks);
  const hideCompleted = useSelector((state) => state.progress.hideCompleted);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  const handleHideLinks = () => {
    dispatch(hideLinks ? dontHideLinks() : doHideLinks());
  };

  const handleHideCompleted = () => {
    dispatch(hideCompleted ? dontHideCompleted() : doHideCompleted());
  };

  const handleReset = () => {
    dispatch(resetListItems());
    dispatch(closeSettings());
  };

  return (
    <header className={styles.header}>
      <h1>
        Website
        <br />
        Launch
        <br />
        Checklist
      </h1>
      <p>
        Launching a website is hard! And not just because of the tech. Run
        through this list before setting your next project live and at least
        feel 5% more like you know what you’re doing.
      </p>
      <button
        className={`${styles.menubutton} ${settingsOpen ? styles.open : ""}`}
        onClick={() =>
          dispatch(settingsOpen ? closeSettings() : openSettings())
        }
      >
        {settingsOpen ? (
          <IoMdClose />
        ) : (
          <IoSettingsOutline
            style={{ transform: `rotate(${offset / 5}deg)` }}
          />
        )}
      </button>

      <motion.div
        className={`${styles.menuOverlay} ${
          settingsOpen || endModalOpen ? styles.open : ""
        }`}
        initial={{ opacity: 0 }}
        animate={settingsOpen || endModalOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ type: "spring", duration: 0.2, bounce: 0 }}
        onClick={() => {
          dispatch(closeSettings());
          dispatch(setEndModalOpen(false));
        }}
      />

      <motion.div
        className={`${styles.endModal} ${endModalOpen ? styles.open : ""}`}
        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
        animate={
          endModalOpen
            ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            : { opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }
        }
        transition={{ type: "spring", duration: 0.7, bounce: 0.5 }}
      >
        <iframe
          src="https://giphy.com/embed/102VfCWF40oAuI"
          frameBorder="0"
          allowFullScreen
        />

        <div className={styles.content}>
          <h3>You did it!</h3>
          <p>Amazing, I guess you're ready to launch!</p>
          <p>
            If you found this website useful and want to say thanks, I would
            love if you{" "}
            <a href="https://www.buymeacoffee.com/boag" target="_blank">
              bought me a beer
            </a>{" "}
            or shared this within your network.
          </p>
          <p>
            If you have any questions, corrections or suggestions please see the
            footer to find out how to get in touch.
          </p>
        </div>
      </motion.div>

      <motion.aside
        className={styles.menu}
        initial={{ x: "100%" }}
        animate={settingsOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
      >
        <motion.div
          className={styles.menuinner}
          initial={{ x: "100%" }}
          animate={settingsOpen ? { x: 0 } : { x: "100%" }}
          transition={{ type: "spring", duration: 0.7, bounce: 0 }}
        >
          <h3 className="h1">Settings</h3>
          <div className={styles.setting} onClick={handleHideLinks}>
            <div className={styles.col1}>
              <Checkbox checked={hideLinks} white />
            </div>
            <div className={styles.col2}>
              <p>Hide additonal reading links</p>
              <small>
                These links to 3rd party websites and articles may help you
                understand each list item a little better.
              </small>
            </div>
          </div>
          <div className={styles.setting} onClick={handleHideCompleted}>
            <div className={styles.col1}>
              <Checkbox checked={hideCompleted} white />
            </div>
            <div className={styles.col2}>
              <p>Hide completed tasks</p>
              <small>
                If this is checked, only uncompleted tasks will be shown. This
                won't affect progress indicators.
              </small>
            </div>
          </div>
          <Button onClick={handleReset}>
            <ImSpinner11 /> Reset Checklist
          </Button>
        </motion.div>
      </motion.aside>
    </header>
  );
}
