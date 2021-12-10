import Head from "next/head";
import React from "react";
import classNames from "classnames";

import SearchBar from "../search-bar";
import { FunctionsContext } from "../functions-provider/provider";

import styles from "./styles.module.css";

export const TopNavVariant = {
  Small: "small",
  Large: "large",
};

export default function TopNav({
  variant,
  title = "Realm Functions Manager",
  functions,
}) {
  // const { functions } = React.useContext(FunctionsContext);
  const [functionOptions, setFunctionOptions] = React.useState([]);

  React.useEffect(() => {
    if (functions) {
      console.log("creating func opts", functions);
      setFunctionOptions(functions.map((func) => `${func.name}`));
    }
  }, [functions]);

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

      <div
        className={classNames({
          [styles.topNav]: true,
          [styles.topNavLarge]: variant == TopNavVariant.Large,
        })}
      >
        <h1>realm functions manager</h1>
        {variant === TopNavVariant.Large && (
          <h3>"like npm but for realm functions!" - someone</h3>
        )}
        {variant === TopNavVariant.Large && (
          <div className={styles.searchBar}>
            <SearchBar
              functions={functions || []}
              setActiveFunctions={() => {}}
              options={functionOptions}
              useReactSelect
            />
          </div>
        )}
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      functions: ["foo"],
    },
  };
}
