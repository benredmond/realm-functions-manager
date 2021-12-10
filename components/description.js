import { Body } from "@leafygreen-ui/typography";

export default function Description({ description }) {
  return (
    <>
      {description.length > 0 ? (
        <Body style={{ flex: 1 }}>
          <div className="flex-container">
            <div className="description-label">Description:</div>
            <div className="function-description">{description}</div>
          </div>
        </Body>
      ) : (
        ""
      )}
    </>
  );
}
