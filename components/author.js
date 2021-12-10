export default function Author({ author }) {
  return (
    <>
      <p className="function-card-container">
        <div className="function-author">Author:</div>
        {author}
      </p>
    </>
  );
}
