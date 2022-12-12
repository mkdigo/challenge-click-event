import { useState, MouseEvent } from 'react';
import { RedoSvg } from './components/RedoSvg';
import { UndoSvg } from './components/UndoSvg';

type Position = {
  x: number;
  y: number;
};

function App() {
  const [circles, setCircles] = useState<Position[]>([]);
  const [removedCircles, setRemovedCircles] = useState<Position[]>([]);

  function handleClick(event: MouseEvent) {
    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    setCircles((prev) => [...prev, position]);
    setRemovedCircles([]);
  }

  function undo() {
    const updatedCircles = [...circles];
    const removedCircle = updatedCircles.pop();

    if (removedCircle) setRemovedCircles((prev) => [...prev, removedCircle]);

    setCircles(updatedCircles);
  }

  function redo() {
    const redoCircle = removedCircles.pop();
    if (redoCircle) setCircles((prev) => [...prev, redoCircle]);
  }

  return (
    <main onClick={handleClick}>
      <h1 onClick={(event: MouseEvent) => event.stopPropagation()}>
        Click on Screen
      </h1>

      <div
        className='buttons'
        onClick={(event: MouseEvent) => event.stopPropagation()}
      >
        <button onClick={undo} title='Undo'>
          <UndoSvg />
        </button>
        <button onClick={redo} title='Redo'>
          <RedoSvg />
        </button>
      </div>

      {circles.map((circle, i) => (
        <div
          key={i}
          className='ball'
          style={{
            ['--x' as any]: `${circle.x}px`,
            ['--y' as any]: `${circle.y}px`,
          }}
          onClick={(event: MouseEvent) => event.stopPropagation()}
        ></div>
      ))}
    </main>
  );
}

export default App;
