import React from "react";
import FunctionsProvider from "../components/functions-provider/provider";
import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
    <FunctionsProvider>
      <Component {...pageProps} />
    </FunctionsProvider>
  );
}
