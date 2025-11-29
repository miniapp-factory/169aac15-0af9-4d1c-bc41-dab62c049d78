'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

const fruits = ['Apple', 'Banana', 'Cherry', 'Lemon'];
const fruitImages: Record<string, string> = {
  Apple: '/apple.png',
  Banana: '/banana.png',
  Cherry: '/cherry.png',
  Lemon: '/lemon.png',
};

function getRandomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>([
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
    [getRandomFruit(), getRandomFruit(), getRandomFruit()],
  ]);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const interval = setInterval(() => {
      setGrid(prev => {
        const newGrid = prev.map(row => [...row]);
        // shift each column down
        for (let col = 0; col < 3; col++) {
          const newFruit = getRandomFruit();
          newGrid[2][col] = newGrid[1][col];
          newGrid[1][col] = newGrid[0][col];
          newGrid[0][col] = newFruit;
        }
        return newGrid;
      });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
    }, 2000);
  };

  const win =
    (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||
    (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||
    (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||
    (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||
    (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||
    (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flat().map((fruit, idx) => (
          <img
            key={idx}
            src={fruitImages[fruit]}
            alt={fruit}
            className="w-16 h-16 object-contain"
          />
        ))}
      </div>
      <Button onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin'}
      </Button>
      {win && !isSpinning && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">You Win!</h2>
          <Share text={`I just won with the Fruit Slot Machine! ${url}`} />
        </div>
      )}
    </div>
  );
}
