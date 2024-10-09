import { useState } from 'react';

interface Tile {
    x: number;
    y: number;
    value: number;
}

export type GridType = {
    rows: number;
    cols: number;
    tileSize: number;
    setRows: (rows: number) => void;
    setCols: (cols: number) => void;
    setTileSize: (tileSize: number) => void;
    setTile: (x: number, y: number, value: number) => void;
    getTileXYFromMousePos: (mouseX: number, mouseY: number) => { x: number; y: number };
    grid: Tile[][];
}

const useGrid = (initialRows: number, initialCols: number, initialTileSize: number) => {
    const [rows, setRows] = useState(initialRows);
    const [cols, setCols] = useState(initialCols);
    const [tileSize, setTileSize] = useState(initialTileSize);
    const [grid, setGrid] = useState<Tile[][]>(
        Array.from({ length: initialRows }, (_, rowIndex) =>
            Array.from({ length: initialCols }, (_, colIndex) => ({
                x: colIndex,
                y: rowIndex,
                value: 0,
            }))
        )
    );

    const setTile = (x: number, y: number, value: number) => {
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[y][x] = { ...newGrid[y][x], value };
            return newGrid;
        });
    };

    const getTileXYFromMousePos = (mouseX: number, mouseY: number) => {
        const x = Math.floor(mouseX / tileSize);
        const y = Math.floor(mouseY / tileSize);
        return { x, y };
    };

    return {
        rows,
        cols,
        tileSize,
        setRows,
        setCols,
        setTileSize,
        setTile,
        getTileXYFromMousePos,
        grid,
    };
};

export default useGrid;