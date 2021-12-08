import { useRouter } from "next/router";
import Link from "next/link";
import FunctionCard from "../../components/functionCard";
import { H3 } from "@leafygreen-ui/typography";

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
      {func !== null && func !== undefined ? (
        <p>Post: {func.name}</p>
      ) : (
        <H3>No functions found</H3>
      )}
    </>
  );
}
