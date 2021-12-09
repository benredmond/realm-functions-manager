import { useRouter } from "next/router";
import Link from "next/link";
import FunctionCard from "../../components/functionCard";
import { H1, H2, H3, Body, Subtitle } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";
import Code from "@leafygreen-ui/code";
import Head from "next/head";
import Copyable from "@leafygreen-ui/copyable";
import Description from "../../components/description";
import Tags from "../../components/tags";
import Dependencies from "../../components/dependencies";
import Author from "../../components/author";

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
                owner_email
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
      <div>
        {func !== null && func !== undefined ? (
          <div
            style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
            className="container"
          >
            <div style={{ flex: "auto" }}>
              <H1 style={{ paddingBottom: "1rem" }}>{func.name}</H1>
              <Author author={func.owner_email} />
              <Tags tags={func.tags} style={{ flex: 1 }} />
              <Description description={func.description} />
              <Dependencies dependencies={func.dependencies} />
              <div style={{ marginTop: "1rem" }}>
                <Code language="javascript">{func.raw}</Code>
              </div>
            </div>
            <div style={{ flex: 1, marginLeft: "3rem", width: "10%" }}>
              <Copyable label="Install">rfm i -s {func.name}</Copyable>
            </div>
          </div>
        ) : (
          <H3 style={{ color: "#8F221B" }}>No functions found</H3>
        )}
      </div>
    </>
  );
}
