import { Body, H3 } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";

export default function FunctionCard({ func }) {
  return (
    <Card className="function-card">
      <H3>{func.name}</H3>
      <Body>{func.description}</Body>
      <div className="function-card-body">
        <Body>
          Tags: <div className="tags">#{func.tags.join(" #")}</div>
        </Body>
        <Body>{func.downloads.length} downloads</Body>
      </div>
    </Card>
  );
}
