import { Body } from "@leafygreen-ui/typography";

export default function Dependencies({ dependencies }) {
  return (
    <>
      {dependencies.length > 0 ? (
        <div>
          <Body>Function Dependencies:</Body>
          <ul style={{ marginTop: "0rem", paddingLeft: "1.5rem" }}>
            {dependencies.map((dep, idx) => (
              <li key={idx}>{dep}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
