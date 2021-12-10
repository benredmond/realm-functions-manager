import Head from "next/head";
import SearchBar from "../search-bar";

import styles from "./styles.module.css";

export const TopNavVariant = {
  Small: "small",
  Large: "large",
};
export default function TopNav({ variant, title = "Realm Functions Manager" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Montserrat/Montserrat-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Montserrat/Montserrat-Black.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <h1>realm functions manager</h1>
      {variant === TopNavVariant.Large && (
        <h3>"like npm but for realm functions!" - someone</h3>
      )}
      <div className={styles.searchBar}>
        <SearchBar functions={[]} setActiveFunctions={() => {}} />
      </div>
    </>
  );
}
