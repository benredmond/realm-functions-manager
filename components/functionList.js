import FunctionCard from "./function-card";
import Link from "next/link";

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
        <h3>No functions found</h3>
      )}
    </>
  );
}
