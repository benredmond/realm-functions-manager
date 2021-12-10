import Head from "next/head";
import SearchBar from "../search-bar";
import { H1 } from "@leafygreen-ui/typography";

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
      </Head>

      <H1>Realm Functions Manager</H1>
      <div className={styles.searchBar}>
        <SearchBar functions={[]} setActiveFunctions={() => {}} />
      </div>
    </>
  );
}
