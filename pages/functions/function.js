import Card from "@leafygreen-ui/card";
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  Disclaimer,
  Overline,
} from "@leafygreen-ui/typography";
import Search from "../../components/search";
import { useState } from "react";

function Function({ functions }) {
  const [viewableFunctions, setViewableFunctions] = useState(functions);

  return (
    <>
      <Search functions={functions} setActiveFunctions={setViewableFunctions} />
      {viewableFunctions !== null && viewableFunctions !== undefined ? (
        viewableFunctions.map((func) => (
          <Card key={func.name}>
            <H3>{func.name}</H3>
            <Body>Tags: {func.tags}</Body>
          </Card>
        ))
      ) : (
        <H3>No functions found</H3>
      )}
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
    revalidate: 10, // In seconds
  };
}

export default Function;
