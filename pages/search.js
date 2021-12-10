import Search from "../components/search-bar";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { useEffect, useState } from "react";
import FunctionList from "../components/functionList";
import { LayoutVariant } from "../components/layout/layout";

const PageSize = 10;

export default function Home({ functions, query }) {
  const [activeFunctions, setActiveFunctions] = useState(functions);
  const [currentPage, setCurrentPage] = useState(1);
  const [functionsOnPage, setFunctionsOnPage] = useState(null);

  useEffect(() => {
    const curPage = parseInt(localStorage.getItem("currentPage"));
    if (curPage) {
      setCurrentPage(curPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setFunctionsOnPage(activeFunctions.slice(firstPageIndex, lastPageIndex));
  }, [functions, currentPage, activeFunctions]);

  return (
    <Layout variant={LayoutVariant.SearchPage}>
      <Search
        functions={functions}
        setActiveFunctions={(functions) => {
          setActiveFunctions(functions);
          if (Math.ceil(functions.length / PageSize) < currentPage) {
            setCurrentPage(1);
          }
        }}
      />
      <h3 className="search-title">Search Results</h3>
      <div className="function-search-list">
        <FunctionList functions={functionsOnPage} />
        <Pagination
          className="pagination"
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={PageSize}
          totalCount={activeFunctions.length}
        />
      </div>
    </Layout>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch(
    "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/rfm-pzvlr/graphql",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.REALM_API_KEY,
      },
      body: JSON.stringify({
        query: `{
            function_registries {
                name
                owner_id
                tags
                downloads
                dependencies
                description
            }
        }`,
      }),
    }
  );
  const functionsRes = await res.json();

  if (!functionsRes) {
    return {
      notFound: true,
    };
  }

  let functions = functionsRes.data.function_registries;
  functions.sort((a, b) => (a.downloads.length < b.downloads.length ? 1 : -1));

  return {
    props: {
      functions: functions,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
