import Head from "next/head";
import Search from "../search";
import { H1 } from "@leafygreen-ui/typography";

import "./styles.module.css";

export const TopNavVariant = {
  Small: "small",
  Large: "large",
};
export default function TopNav({ variant, title = "Realm Functions Manager" }) {
  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <H1>Realm Functions Manager</H1>
      </div>
      <div className="function-search-list">
        <Search functions={[]} setActiveFunctions={() => {}} />
      </div>
    </>
  );
}
