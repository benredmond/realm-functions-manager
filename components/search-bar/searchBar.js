import Fuse from "fuse.js";
import TextInput from "@leafygreen-ui/text-input";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

const fuzzOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: [
    { name: "name", weight: 3 },
    { name: "tags", weight: 1 },
  ],
};

export default function SearchBar({
  functions,
  setActiveFunctions,
  useReactSelect,
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

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
      setActiveFunctions(res);
    } else {
      setActiveFunctions(functions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, functions]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        if (searchQuery) {
          router.push(`/search?search=${searchQuery}`);
        }
      }}
    >
      <TextInput
        aria-label={"Function Name"}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Enter function name and/or any amount of #<tags>. Tags must follow name"
        value={query}
        handleValidation={(foo) => foo}
        type={"search"}
        name="search"
        className={styles.searchInput}
      />
    </form>
  );
}
