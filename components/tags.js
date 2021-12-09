import { Body } from "@leafygreen-ui/typography";

export default function Tags({ tags }) {
  return (
    <>
      {tags.length > 0 ? (
        <Body>
          <div className="flex-container">
            <div className="tags-label">Tags:</div>
            <div className="tags">#{tags.join(" #")}</div>
          </div>
        </Body>
      ) : (
        ""
      )}
    </>
  );
}
