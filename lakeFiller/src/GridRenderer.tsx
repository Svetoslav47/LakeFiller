import React from 'react';
import './GridRenderer.css'; // Ensure this file exists and is correctly styled
import Tile from './Tile'; // Ensure Tile component is correctly defined

import {GridType} from './Grid';

interface GridProps {
  Grid: GridType;
}

const GridRenderer: React.FC<GridProps> = ({ Grid } : GridProps) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: `repeat(${Grid.rows}, ${Grid.tileSize}px)`,
    gridTemplateColumns: `repeat(${Grid.cols}, ${Grid.tileSize}px)`,
    width: '100%', // Make the grid fill its parent container
    height: '100%', // Make the grid fill its parent container
  };

  const generateGrid = () => {
    const tiles = [];
    for (let i = 0; i < Grid.rows; i++) {
      for (let j = 0; j < Grid.cols; j++) {
        tiles.push(<Tile key={`${i}-${j}`} value={0} size={Grid.tileSize} />);
      }
    }
    return tiles;
  };

  return <div style={gridStyle}>{generateGrid()}</div>;
};

export default GridRenderer;
