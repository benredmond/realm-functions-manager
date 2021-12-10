export default function Description({ description }) {
  return (
    <>
      {description.length > 0 ? (
        <p style={{ flex: 1 }}>
          <div className="flex-container" style={{ marginTop: "1rem" }}>
            <div className="description-label">Description:</div>
            <div className="function-description">{description}</div>
          </div>
        </p>
      ) : (
        ""
      )}
    </>
  );
}
