import React, { useEffect, useRef, useCallback } from "react";
import "./GridRenderer.css"; // Ensure this file exists and is correctly styled

import { GridType } from "./Grid";

interface GridProps {
    Grid: GridType;
}

const GridRenderer: React.FC<GridProps> = React.memo(({ Grid }: GridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const drawTile = useCallback((
        x: number,
        y: number,
        value: number
    ) => {
        if (!contextRef.current) return;
        const context = contextRef.current;
        const tileSize = Grid.tileSize;
        const xOffset = x * tileSize;
        const yOffset = y * tileSize;

        context.fillStyle = value === 1 ? "black" : "white";
        context.fillRect(xOffset, yOffset, tileSize, tileSize);
        context.strokeStyle = "gray";
        context.strokeRect(xOffset, yOffset, tileSize, tileSize);
    }, [Grid.tileSize]);

    const drawGrid = useCallback(() => {
        if (!contextRef.current) return;
        const context = contextRef.current;
        context.fillStyle = "white";
        context.fillRect(0, 0, Grid.cols * Grid.tileSize, Grid.rows * Grid.tileSize);
        Grid.grid.forEach((row, y) => {
            row.forEach((tile, x) => {
                drawTile(x, y, tile.value);
            });
        });
    }, [Grid.cols, Grid.rows, Grid.tileSize, Grid.grid, drawTile]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = Grid.cols * Grid.tileSize;
            canvas.height = Grid.rows * Grid.tileSize;
            contextRef.current = canvas.getContext("2d");
            drawGrid();
        }
    }, [Grid.cols, Grid.rows, Grid.tileSize, drawGrid]);

    useEffect(() => {
        drawGrid();
    }, [Grid.grid, drawGrid]);

    return <canvas ref={canvasRef} style={{ width: Grid.cols * Grid.tileSize, height: Grid.rows * Grid.tileSize }} />;
});

export default GridRenderer;
