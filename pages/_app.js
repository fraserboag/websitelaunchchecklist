import { Provider } from "react-redux";
import { store, persistor } from "../slices/index";
import "../styles/globals.scss";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Head>
        <title>
          Website Launch Checklist - 38 things to check to launch your next
          project with confidence
        </title>
        <meta
          name="description"
          content="The most comprehensive website launch checklist, with links to additional resources on the most important points. Launch your next web project with complete confidence by checking off all 38 items on the list."
        />
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
