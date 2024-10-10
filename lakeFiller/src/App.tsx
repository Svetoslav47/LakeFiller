import './App.css';
import { useRef, useCallback } from 'react';
import GridRenderer from './GridRenderer';
import useGrid from './Grid';

function App() {
  const tileSize = 35; // Increased tile size for better visibility
  const gridRef = useRef<HTMLDivElement>(null);
  const Grid = useGrid(10, 10, tileSize, gridRef);

  const handleMouseEvent = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    const coordinates = await Grid.getTileXYFromMousePos(e.clientX, e.clientY);
    if (coordinates) {
      const { x, y } = coordinates;
      if (x >= 0 && x < Grid.cols && y >= 0 && y < Grid.rows) {
        await Grid.setTile(x, y, 1);
      }
    }
  }, [Grid]);

  return (
    <>
      <header>
        <h1>Lake Filler</h1>
      </header>
      <main 
        ref={gridRef} 
        style={{ width: '100vw', height: 'calc(100vh - 60px)' }}
        onMouseDown={(e) => handleMouseEvent(e)}
        onMouseMove={(e) => e.buttons === 1 && handleMouseEvent(e)}
      >
        <GridRenderer Grid={Grid} />
      </main>
    </>
  );
}

export default App;
