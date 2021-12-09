import FunctionCard from "./functionCard";
import { H3 } from "@leafygreen-ui/typography";
import Link from "next/link";
import ReactPaginate from "react-paginate";

export default function FunctionList({ functions }) {
  return (
    <>
      {functions !== null && functions !== undefined ? (
        functions.map((func, idx) => (
          <Link key={func.name} href={`/functions/${func.name}`}>
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