import React from "react";

import Layout, { LayoutVariant } from "../components/layout/layout";

export default function Home({ functions: fetchedFunctions }) {
  return (
    <Layout variant={LayoutVariant.LandingPage}>
      <h1>keybindings:</h1>
      <div>
        <h3>[Cmd+P] - focus on search bar from anywhere</h3>
        <h3>[/] - focus on search bar from anywhere</h3>
      </div>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  return {
    props: {},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
