import { Body, H3 } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";
import { useState } from "react";

import styles from "./styles.module.css";

export default function FunctionCard({ func, greyBackground }) {
  const [style, setStyle] = useState({
    background: greyBackground ? "#e8e8e8" : "white",
  });

  return (
    <Card
      className={styles.functionCard}
      style={style}
      onMouseEnter={(e) => {
        setStyle((prevState) => ({
          ...prevState,
          border: "1.5px solid #13AA52",
        }));
      }}
      onMouseLeave={(e) => {
        setStyle((prevState) => ({
          ...prevState,
          border: "unset",
        }));
      }}
    >
      <H3>{func.name}</H3>
      <Body style={{ marginTop: "0.5rem" }}>{func.description}</Body>
      <div className={styles.functionCardBody}>
        <Body className="function-tags-container">
          <div style={{ display: "flex" }}>
            Tags: <div className="tags"> #{func.tags.join(" #")}</div>
          </div>
        </Body>
        <Body className={styles.functionDownloadsContainer}>
          {func.downloads.length} downloads
        </Body>
      </div>
    </Card>
  );
}
