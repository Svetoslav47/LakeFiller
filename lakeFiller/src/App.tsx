import './App.css';
import { useEffect, useRef } from 'react';
import GridRenderer from './GridRenderer';
import useGrid from './Grid';

function App() {
  const tileSize = 50;
  const Grid = useGrid(10, 10, tileSize);
  const gridRef = useRef<HTMLDivElement>(null); // Ref for the grid container

  const updateDimensions = () => {
    if (gridRef.current) {
      const gridHeight = gridRef.current.clientHeight;
      const gridWidth = gridRef.current.clientWidth;
      Grid.setRows(Math.floor(gridHeight / tileSize));
      Grid.setCols(Math.floor(gridWidth / tileSize));
    }
  };



  useEffect(() => {
    // Set initial dimensions after the first render
    updateDimensions();

    // Add resize event listener
    window.addEventListener('resize', updateDimensions);
    
    let mousedown = false;

    function handleMouseMove(e: MouseEvent) {
      console.log(`Mouse is at (${e.clientX}, ${e.clientY}), mousedown: ${mousedown}`);
      if (mousedown) {
        const { x, y } = Grid.getTileXYFromMousePos(e.clientX, e.clientY);

        Grid.setTile(x, y, 1);
      }
    }

    window.addEventListener('mousedown', () => {
      mousedown = true;
    } );

    window.addEventListener('mouseup', () => {
      mousedown = false;
    } );

    window.addEventListener('mousemove', handleMouseMove);
  

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousedown', (e) => {
        e.preventDefault();
        mousedown = true;
      } );
      window.removeEventListener('mouseup', (e) => {
        e.preventDefault();
        mousedown = false;
      } );
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <header>
        <h1>Lake Filler</h1>
      </header>
      <main ref={gridRef} style={{ width: '100vw', height: '100vh' }}> {/* Set the main container size */}
        <GridRenderer Grid={Grid} />
      </main>
    </>
  );
}

export default App;
