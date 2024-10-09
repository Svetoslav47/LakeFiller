import React from 'react';
import './grid.css'; // Import the CSS file

interface TileProps {
    value: number;
    size: number;
}

const Tile: React.FC<TileProps> = ({ value, size }) => {
    const tileStyle: React.CSSProperties = {
        width: size,
        height: size,
        display: 'inline-block',
        border: '1px solid black',
        textAlign: 'center',
        lineHeight: `${size}px`,
        backgroundColor: value === 0 ? 'white' : 'blue',
    };

    return <div style={tileStyle}></div>;
};

export default Tile;
