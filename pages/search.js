import Head from "next/head";
import Link from "next/link";
import Search from "../components/search";
import Card from "@leafygreen-ui/card";
import { Body, H1 } from "@leafygreen-ui/typography";
import { useEffect, useState } from "react";
import FunctionList from "../components/functionList";
import ReactPaginate from "react-paginate";

const functionsPerPage = 2;

export default function Home({ functions }) {
  const [viewableFunctions, setViewableFunctions] = useState(functions);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [functionsOnPage, setFunctionsOnPage] = useState(null);

  useEffect(() => {
    const endOffset = offset + functionsPerPage;
    setFunctionsOnPage(viewableFunctions.slice(offset, endOffset));
    setPageCount(Math.ceil(functions.length / functionsPerPage));
  }, [offset, functions, functionsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * functionsPerPage) % functions.length;
    setOffset(newOffset);
  };

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
                setActiveFunctions={setViewableFunctions}
              />
              <FunctionList functions={viewableFunctions} />
            </div>
            {/*<ReactPaginate*/}
            {/*  pageCount={pageCount}*/}
            {/*  breakLabel="..."*/}
            {/*  nextLabel="next"*/}
            {/*  onPageChange={handlePageClick}*/}
            {/*  previousLabel="< previous"*/}
            {/*  id={"container"}*/}
            {/*/>*/}
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