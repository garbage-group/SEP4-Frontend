import { useBins } from "../../contexts/BinContext";
import "../../styles/Bin_css/BinList.css";
import { Spinner } from "../Spinner";
import BinItem from "./BinItem";

function BinList() {
  const { bins, isLoading } = useBins();
  console.log(bins)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="binList">
      {bins
        .slice() // Create a copy of the array to avoid mutating the original
        .sort((a, b) => a.id - b.id) // Sort the array based on id in ascending order
        .map((bin) => (
          <BinItem bin={bin} key={bin.id} />
        ))}
    </ul>
  );
}

export default BinList;
