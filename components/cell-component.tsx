import { cn } from '@/lib/utils';
import { Cell } from '@/models/cell';
import { useWindowSize } from '@uidotdev/usehooks';
import React, {FC, useEffect, useRef} from 'react';


interface CellProps {
    cell: Cell;
}

const CellComponents : FC<CellProps> = ({cell}) => {
    
    const windowSize = useWindowSize()
    
    const cellRef = useRef<HTMLHeadingElement>(null)
    const bgClass = cell.isEmpty ? '' : 'bg-amber-500';
    useEffect(() => {
        cell.setLeft(cellRef.current?.getBoundingClientRect().left ?? 0)
        cell.setTop(cellRef.current?.getBoundingClientRect().top ?? 0)
    }, [windowSize, cell])

    return (
        <div
            // className={['cell', cell.isEmpty ? '' : 'cell_full'].join(' ')}
            className={cn('aspect-square border-amber-600 border border-collapse w-12', bgClass)}
            ref={cellRef}
            //onMouseUp={() => console.log(cell)}
        >
        </div>
    );
};

export default CellComponents;