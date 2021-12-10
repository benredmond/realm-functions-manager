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
      <h3>{func.name}</h3>
      <p style={{ marginTop: "0.5rem" }}>{func.description}</p>
      <div className={styles.functionCardBody}>
        <p className="function-tags-container">
          <div style={{ display: "flex" }}>
            Tags: <div className="tags"> #{func.tags.join(" #")}</div>
          </div>
        </p>
        <p className={styles.functionDownloadsContainer}>
          {func.downloads.length} downloads
        </p>
      </div>
    </Card>
  );
}
