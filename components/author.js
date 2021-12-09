import { Body } from "@leafygreen-ui/typography";

export default function Author({ author }) {
  return (
    <>
      <Body className="function-card-container">
        <div className="function-author">Author:</div>
        {author}
      </Body>
    </>
  );
}
