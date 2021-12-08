import FunctionCard from "./functionCard";
import { H3 } from "@leafygreen-ui/typography";

export default function FunctionList({ functions }) {
  return (
    <>
      {functions !== null && functions !== undefined ? (
        functions.map((func) => <FunctionCard key={func.name} func={func} />)
      ) : (
        // functions.map((func) => <h2>{func.name}</h2>)
        <H3>No functions found</H3>
      )}
    </>
  );
}
