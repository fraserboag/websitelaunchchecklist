import CheckListSection from "./CheckListSection";
import styles from "../styles/CheckListContainer.module.scss";
import { useSelector } from "react-redux";

export default function CheckListContainer() {
  const checklist = useSelector((state) => state.progress.checklist);

  return (
    <main className={styles.checklistcontainer}>
      {checklist.map((listSection, i) => (
        <CheckListSection key={i} title={listSection.title} />
      ))}
    </main>
  );
}
