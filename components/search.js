import Fuse from "fuse.js";
import TextInput from "@leafygreen-ui/text-input";
import { useState, useEffect } from "react";

const fuzzOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: [
    { name: "name", weight: 3 },
    { name: "tags", weight: 1 },
  ],
};

export default function Search({ functions, setActiveFunctions }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fuse = new Fuse(functions, fuzzOptions);

    if (query.length > 0) {
      let tags = query.match(/(?<!\w)#\w+/g);
      let queryParams = [];

      if (tags && tags.length > 0) {
        tags.forEach((tag) => {
          queryParams.push({ tags: tag });
        });

        const matchedName = query.match(/.+?(?=#)/);
        if (matchedName && matchedName.length > 0) {
          let name = matchedName[0].trim();
          queryParams.push({ name });
        }
      } else {
        queryParams.push({ name: query });
      }

      const searchRes = fuse.search({ $or: queryParams });

      let res = [];
      searchRes.forEach((result) => {
        res.push(result.item);
      });
      // console.log(res);
      setActiveFunctions(res);
    } else {
      setActiveFunctions(functions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, functions]);

  return (
    <>
      <TextInput
        // label={"Function Name"}
        aria-label={"Function Name"}
        description="Enter function name and/or any amount of #<tags>. Tags must follow name"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        value={query}
        handleValidation={(foo) => foo}
        type={"search"}
        className="search"
      />
    </>
  );
}
