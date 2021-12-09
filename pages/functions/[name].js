import { useRouter } from "next/router";
import Link from "next/link";
import FunctionCard from "../../components/functionCard";
import { H1, H2, H3, Body, Subtitle } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";
import Code from "@leafygreen-ui/code";
import Head from "next/head";
import Copyable from "@leafygreen-ui/copyable";

export async function getStaticPaths() {
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

  const paths = functions.data.function_registries.map((func) => {
    return {
      params: {
        name: func.name,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
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
            function_registry(query: {name:"${params.name}"}) {
                name
                owner_id
                tags
                downloads
                dependencies
                description
                raw
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
      func: functions.data.function_registry,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
}

export default function Function({ func }) {
  return (
    <>
      <Head>
        <title>Realm Functions Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        {func !== null && func !== undefined ? (
          <div>
            <div style={{ width: "40%" }}>
              <H1 style={{ paddingBottom: "1rem" }}>{func.name}</H1>
              <Body>{func.description}</Body>
              <Body>Function Dependencies:</Body>
              <ul style={{ marginTop: "0rem", paddingLeft: "1.5rem" }}>
                {func.dependencies.map((dep, idx) => (
                  <li key={idx}>{dep}</li>
                ))}
              </ul>
              <Code language="javascript">{func.raw}</Code>
            </div>
            <div style={{ flex: 1 }}>
              <Copyable label="Install">rfm i -s {func.name}</Copyable>
            </div>
          </div>
        ) : (
          <H3>No functions found</H3>
        )}
      </div>
    </>
  );
}
