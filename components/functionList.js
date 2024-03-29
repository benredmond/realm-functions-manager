import FunctionCard from "./functionCard";
import { H3 } from "@leafygreen-ui/typography";
import Link from "next/link";

export default function FunctionList({ functions }) {
  return (
    <>
      {functions !== null && functions !== undefined ? (
        functions.map((func, idx) => (
          <Link key={idx} href={`/functions/${func.name}`}>
            <a>
              <FunctionCard func={func} greyBackground={idx % 2 !== 0} />
            </a>
          </Link>
        ))
      ) : (
        <H3>No functions found</H3>
      )}
    </>
  );
}
