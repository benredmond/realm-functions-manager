export default function Tags({ tags }) {
  return (
    <>
      {tags.length > 0 ? (
        <p>
          <div className="flex-container">
            <div className="tags-label">Tags:</div>
            <div className="tags">#{tags.join(" #")}</div>
          </div>
        </p>
      ) : (
        ""
      )}
    </>
  );
}
