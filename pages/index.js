import Head from "next/head";
import Link from "next/link";
import Search from "../components/search";
import Card from "@leafygreen-ui/card";
import { Body, H1 } from "@leafygreen-ui/typography";
import { useState } from "react";
import FunctionList from "../components/functionList";

export default function Home({ functions }) {
  const [viewableFunctions, setViewableFunctions] = useState(functions);

  return (
    <>
      <Head>
        <title>Realm Functions Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <H1>Realm Functions Manager</H1>
      </div>
      <div className="container">
        <main className="function-search-list">
          <Search
            functions={functions}
            setActiveFunctions={setViewableFunctions}
          />
          <FunctionList functions={viewableFunctions} />
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
  const functions = await res.json();

  if (!functions) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      functions: functions.data.function_registries,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}
