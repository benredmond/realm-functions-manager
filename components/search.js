import Fuse from "fuse.js";
import TextInput from "@leafygreen-ui/text-input";
import { useState, useEffect } from "react";

const fuzzOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["name"],
};

export default function Search({ functions, setActiveFunctions }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fuse = new Fuse(functions, fuzzOptions);

    if (query.length > 0) {
      const searchRes = fuse.search(query);
      let res = [];
      searchRes.forEach((result) => {
        res.push(result.item);
      });
      setActiveFunctions(res);
    } else {
      setActiveFunctions(functions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, functions]);

  return (
    <>
      <TextInput
        label={"Function Name"}
        aria-label={"Function Name"}
        // description="Enter your email below"
        // placeholder="your.email@example.com"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        value={query}
        handleValidation={(foo) => foo}
        type={"search"}
      />
    </>
  );
}
