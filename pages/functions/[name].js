import Code from "@leafygreen-ui/code";
import Head from "next/head";

export default function Function({ func }) {
  return (
    <>
      <Head>
        <title>Realm Functions Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        {func !== null && func !== undefined ? (
          <div style={{ width: "30%" }}>
            <h1 style={{ paddingBottom: "1rem" }}>{func.name}</h1>
            <p>{func.description}</p>
            <p>Function Dependencies:</p>
            <ul style={{ marginTop: "0rem", paddingLeft: "1.5rem" }}>
              {func.dependencies.map((dep, idx) => (
                <li key={idx}>{dep}</li>
              ))}
            </ul>
            <p>{func.dependencies}</p>
            <Code language="javascript">{func.raw}</Code>
          </div>
        ) : (
          <h3>No functions found</h3>
        )}
      </div>
    </>
  );
}

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
