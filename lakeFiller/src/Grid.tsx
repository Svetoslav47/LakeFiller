import { useEffect, useState, useCallback, useMemo } from "react";

interface Tile {
    x: number;
    y: number;
    value: number;
}

export interface GridType {
    rows: number;
    cols: number;
    tileSize: number;
    setRows: (rows: number) => void;
    setCols: (cols: number) => void;
    setTileSize: (tileSize: number) => void;
    setTile: (x: number, y: number, value: number) => Promise<void>;
    getTileXYFromMousePos: (
        mouseX: number,
        mouseY: number
    ) => Promise<{ x: number; y: number } | undefined>;
    grid: Tile[][];
}

const createInitialGrid = (rows: number, cols: number): Tile[][] =>
    Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => ({
            x,
            y,
            value: 0,
        }))
    );

const useGrid = (
    initialRows: number,
    initialCols: number,
    initialTileSize: number,
    containerRef: React.RefObject<HTMLDivElement>
): GridType => {
    const [rows, setRows] = useState(initialRows);
    const [cols, setCols] = useState(initialCols);
    const [tileSize, setTileSize] = useState(initialTileSize);
    const [grid, setGrid] = useState<Tile[][]>(() =>
        createInitialGrid(initialRows, initialCols)
    );

    const updateGridSize = useCallback(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const newCols = Math.floor(containerWidth / tileSize);
            const newRows = Math.floor(containerHeight / tileSize);
            setRows(newRows);
            setCols(newCols);
            setGrid(createInitialGrid(newRows, newCols));
        }
    }, [tileSize, containerRef]);

    useEffect(() => {
        updateGridSize();
        window.addEventListener('resize', updateGridSize);
        return () => window.removeEventListener('resize', updateGridSize);
    }, [updateGridSize]);

    const setTile = useCallback(async (x: number, y: number, value: number): Promise<void> => {
        return new Promise((resolve) => {
            setGrid(prevGrid => {
                if (prevGrid[y]?.[x]?.value === value) {
                    resolve();
                    return prevGrid;
                }
                const newGrid = [...prevGrid];
                if (newGrid[y] && newGrid[y][x]) {
                    newGrid[y] = [...newGrid[y]];
                    newGrid[y][x] = { ...newGrid[y][x], value };
                }
                resolve();
                return newGrid;
            });
        });
    }, []);

    const getTileXYFromMousePos = useCallback(async (
        mouseX: number,
        mouseY: number
    ): Promise<{ x: number; y: number } | undefined> => {
        return new Promise((resolve) => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const xOffset = containerRect.left;
                const yOffset = containerRect.top;
                const xIndex = Math.floor((mouseX - xOffset) / tileSize);
                const yIndex = Math.floor((mouseY - yOffset) / tileSize);
                resolve({ x: xIndex, y: yIndex });
            } else {
                resolve(undefined);
            }
        });
    }, [tileSize, containerRef]);

    return useMemo(() => ({
        rows,
        cols,
        tileSize,
        setRows,
        setCols,
        setTileSize,
        setTile,
        getTileXYFromMousePos,
        grid,
    }), [rows, cols, tileSize, setTile, getTileXYFromMousePos, grid]);
};

export default useGrid;
