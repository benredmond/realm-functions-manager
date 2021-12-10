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
import { Table, HeaderRow, TableHeader, Row, Cell } from "@leafygreen-ui/table";

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
                values {
                    name
                    description
                }
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
    revalidate: 10, // In seconds
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
          <Card
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#FAFBFA",
              marginTop: "4rem",
            }}
          >
            {/*<div*/}
            {/*  className="container"*/}
            {/*  style={{*/}

            {/*  }}*/}
            {/*>*/}
            <div
              style={{
                flex: "auto",
                width: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1rem",
                marginBottom: "3rem",
              }}
            >
              <H1 style={{ paddingBottom: "1rem" }}>{func.name}</H1>
              <hr />
              <div className="flex-container">
                <Author author={func.owner_email} />
                <Body style={{ marginTop: "0.5rem", marginLeft: "auto" }}>
                  {func.downloads.length}{" "}
                  {func.downloads.length === 1 ? "download" : "downloads"}
                </Body>
              </div>
              <Tags tags={func.tags} style={{ flex: 1 }} />
              <Description description={func.description} />
              <Dependencies dependencies={func.dependencies} />

              {func.values.length > 0 ? (
                <div>
                  <Body style={{ fontWeight: "bold" }}>Function Values:</Body>
                  <Table
                    data={func.values}
                    columns={[
                      <TableHeader label="Name" key="name" />,
                      <TableHeader label="Description" key="description" />,
                    ]}
                    style={{
                      width: "50%",
                      backgroundColor: "#F9FAF10",
                    }}
                  >
                    {({ datum }, idx) => (
                      <Row key={idx}>
                        <Cell style={{ width: "20%" }}>{datum.name}</Cell>
                        <Cell>{datum.description}</Cell>
                      </Row>
                    )}
                  </Table>
                </div>
              ) : (
                ""
              )}

              <div style={{ display: "flex", marginTop: "0.5rem" }}>
                <div
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    marginRight: "3rem",
                  }}
                >
                  <Body style={{ fontWeight: "bold" }}>
                    Function Source Code:
                  </Body>
                  <Code language="javascript">{func.raw}</Code>
                </div>
                <div
                  style={{
                    flex: 1,
                    marginTop: "1.2rem",
                    width: "50%",
                  }}
                >
                  <Copyable label="Install">{`rfm i -s ${func.name}`}</Copyable>
                </div>
              </div>
            </div>
            {/*</div>*/}
          </Card>
        ) : (
          <H3 style={{ color: "#8F221B" }}>No functions found</H3>
        )}
      </div>
    </>
  );
}
