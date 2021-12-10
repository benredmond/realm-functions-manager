import Head from "next/head";
import Link from "next/link";
import Search from "../components/search";
import Card from "@leafygreen-ui/card";
import { Body, H1, H3 } from "@leafygreen-ui/typography";
import { useEffect, useState } from "react";
import FunctionList from "../components/functionList";
import Pagination from "../components/pagination";

const PageSize = 10;

export default function Home({ functions }) {
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
    <>
      <Head>
        <title>Realm Functions Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <H1>Realm Functions Manager</H1>
      </div>
      <div>
        <main>
          <div className="container">
            <div className="function-search-list">
              <Search
                functions={functions}
                setActiveFunctions={(functions) => {
                  setActiveFunctions(functions);
                  if (Math.ceil(functions.length / PageSize) < currentPage) {
                    setCurrentPage(1);
                  }
                }}
              />
              <H3 className="search-title">Search Results</H3>
              <FunctionList functions={functionsOnPage} />
              <Pagination
                className="pagination"
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                pageSize={PageSize}
                totalCount={activeFunctions.length}
              />
            </div>
          </div>
        </main>
      </div>
    </>
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
                owner_email
                tags
                downloads
                description
            }
        }`,
      }),
    }
  );
  const functionsRes = await res.json();

  if (!functionsRes || !functionsRes.data) {
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
    revalidate: 10, // In seconds
  };
}
