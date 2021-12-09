import { Body, H3 } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";
import { useEffect, useState } from "react";

export default function FunctionCard({ func, greyBackground }) {
  const [style, setStyle] = useState({
    background: greyBackground ? "#E7EEEC" : "#F9FBFA",
  });

  useEffect(() => {
    setStyle((prevState) => ({
      ...prevState,
      background: greyBackground ? "#E7EEEC" : "#F9FBFA",
    }));
  }, [greyBackground]);

  return (
    <Card
      className="function-card"
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
      <div className="flex-container">
        <H3 style={{ flex: 1 }}>{func.name}</H3>
        <Body className="function-card-container">
          <div className="function-author">Author:</div>
          abc@gmail.com
        </Body>
      </div>
      <Body className="function-description">{func.description}</Body>
      <div className="function-card-container">
        <Body style={{ flex: 1 }}>
          <div className="flex-container">
            <div className="tags-label">Tags:</div>
            <div className="tags">#{func.tags.join(" #")}</div>
          </div>
        </Body>
        <Body className="function-downloads-container">
          {func.downloads.length}{" "}
          {func.downloads.length === 1 ? "download" : "downloads"}
        </Body>
      </div>
    </Card>
  );
}
