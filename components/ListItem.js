import Checkbox from "./Checkbox";
import styles from "../styles/ListItem.module.scss";
import { FiExternalLink } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { checkItem } from "../slices/progressSlice";
import * as gtag from "../utils/gtag";

export default function ListItem({ id, sectionTitle }) {
  const dispatch = useDispatch();

  const checklist = useSelector((state) => state.progress.checklist);
  const section = checklist.find((sec) => sec.title === sectionTitle);
  const item = section.listItems[id];

  const hideLinks = useSelector((state) => state.progress.hideLinks);
  const hideCompleted = useSelector((state) => state.progress.hideCompleted);

  const handleClick = () => {
    dispatch(checkItem({ sectionTitle: sectionTitle, itemId: id }));
  };

  if (hideCompleted && item.checked) {
    return null;
  }

  return (
    <li className={styles.listitem}>
      <div className={styles.col1}>
        <Checkbox checked={item.checked} onClick={handleClick} />
      </div>
      <div className={`${styles.col2} ${item.checked ? styles.checked : ""}`}>
        <p onClick={handleClick}>{item.text}</p>
        {!hideLinks && item.link && (
          <small>
            <a
              href={item.link}
              target="_blank"
              onClick={() =>
                gtag.event({
                  action: "Click Additional Reading Link",
                  category: "Link Click",
                  label: item.link,
                })
              }
            >
              <FiExternalLink />
              Additional reading
            </a>
          </small>
        )}
      </div>
    </li>
  );
}
