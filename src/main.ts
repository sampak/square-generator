import { ISquare } from './interfaces/ISquare';
import './style.css';
import { getRandomColor } from './utils/getRandomColor';
import { getRandomValue } from './utils/getRandomValue';

const canvas = document.getElementById('squareCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const squareCountInput = document.getElementById('squareCount') as HTMLInputElement;

if (!canvas || !ctx || !generateBtn || !clearBtn || !squareCountInput) {
  throw new Error('Required DOM elements not found');
}

const squares: ISquare[] = [];


const drawSquare = (square: ISquare): void => {
  if (ctx) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
  }
};

const redrawAllSquares = (): void => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const square of squares) {
    drawSquare(square);
  }
};

const generateSquares = (): void => {
  const squareCount = parseInt(squareCountInput.value, 10);
  for (let i = 0; i < squareCount; i++) {
    const size = getRandomValue(30, 100);
    const x = getRandomValue(0, canvas.width - size);
    const y = getRandomValue(0, canvas.height - size);
    const color = getRandomColor();

    const square: ISquare = { x, y, size, color };
    squares.push(square);
    drawSquare(square);
  }
};

const clearCanvas = (): void => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    squares.length = 0;
  }
};


const handleClick = (event: MouseEvent): void => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;


  for (const square of [...squares].reverse()) {
    if (
      clickX >= square.x &&
      clickX <= square.x + square.size &&
      clickY >= square.y &&
      clickY <= square.y + square.size
    ) {
      square.color = getRandomColor();
      redrawAllSquares(); 
      break;
    } 
  }
}


canvas.addEventListener('click', handleClick);
generateBtn.addEventListener('click', generateSquares);
clearBtn.addEventListener('click', clearCanvas);
