import { BigCell } from "@/models/big-cell";
import { FC } from "react";
import CellComponents from "./cell-component";

interface BigCellProps {
    bigCell: BigCell;
}


const BigCellComponent : FC<BigCellProps> = ( {bigCell} ) => {
  return (
    <div className="aspect-square grid grid-cols-3 grid-rows-3 border-amber-600 border border-collapse">
      {bigCell.cells.map((row, index) =>
        row.map((cell, index) => <CellComponents cell={cell} key={cell.id} />)
      )}
    </div>
  );
};

export default BigCellComponent;
