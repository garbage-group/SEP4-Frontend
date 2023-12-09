import { useState } from "react";
import { useBins } from "../../contexts/BinContext";
import "../../styles/Bin_css/BinList.css";
import { Spinner } from "../Spinner";
import { ListPagination } from "../utils/ListPagination";
import BinItem from "./BinItem";

function BinList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { bins, isLoading } = useBins();

  const itemsPerPage = 3;

  function handlePaginationChange(event, value) {
    setCurrentPage(value);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="binList">
        {bins
          .slice(startIndex, endIndex) // Create a copy of the array to avoid mutating the original
          .sort((a, b) => a.id - b.id) // Sort the array based on id in ascending order
          .map((bin) => (
            <BinItem bin={bin} key={bin.id} id="binItem" />
          ))}
      </ul>

      <div className="bins-footer">
        <ListPagination
          totalItems={bins ? bins.length : 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePaginationChange}
        />
      </div>
    </>
  );
}

export default BinList;
