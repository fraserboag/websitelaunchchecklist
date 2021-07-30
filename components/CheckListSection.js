import ListItem from "./ListItem";
import styles from "../styles/CheckListSection.module.scss";
import { useSelector } from "react-redux";
import {
  ImPencil2,
  ImEnvelop,
  ImStatsBars,
  ImAccessibility,
  ImPowerCord,
  ImStatsDots,
  ImStack,
} from "react-icons/im";

export default function CheckListSection({ title }) {
  const checklist = useSelector((state) => state.progress.checklist);
  const section = checklist.find((sec) => sec.title === title);
  const numComplete = section.listItems.filter(
    (item) => item.checked === true
  ).length;

  return (
    <div className={styles.checklistsection}>
      <h2>
        {title === "Content" && <ImPencil2 />}
        {title === "Communication" && <ImEnvelop />}
        {title === "Benchmarks & Performance" && <ImStatsBars />}
        {title === "Accessibility" && <ImAccessibility />}
        {title === "Infrastructure" && <ImPowerCord />}
        {title === "Analytics" && <ImStatsDots />}
        {title === "Miscellaneous" && <ImStack />}

        {title}
      </h2>
      <small>
        {numComplete} of {section.listItems.length} tasks complete
      </small>
      <ul>
        {section.listItems.map((item, i) => (
          <ListItem key={i} id={i} sectionTitle={title} />
        ))}
      </ul>
    </div>
  );
}
