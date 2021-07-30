import styles from "../styles/Index.module.scss";
import Header from "../components/Header";
import CheckListContainer from "../components/CheckListContainer";
import Footer from "../components/Footer";
import data from "../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { setChecklist } from "../slices/progressSlice";

export default function Home({ listData }) {
  const checklist = useSelector((state) => state.progress.checklist);
  if (!checklist.length) {
    const dispatch = useDispatch();
    dispatch(setChecklist(listData));
  }
  return (
    <div className={styles.container}>
      <Header />
      <CheckListContainer />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      listData: data,
    },
  };
}
