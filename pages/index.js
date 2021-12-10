import { H1, H3 } from "@leafygreen-ui/typography";
import Layout, { LayoutVariant } from "../components/layout/layout";

export default function Home({}) {
  return (
    <>
      <Layout variant={LayoutVariant.LandingPage}>
        <H1>Keybindings:</H1>
        <div>
          <H3>[Cmd+P] - Focus on search bar from anywhere</H3>
          <H3>[/] - Focus on search bar from anywhere</H3>
        </div>
      </Layout>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export function getStaticProps() {
  return {
    props: {},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
