import React, { useState, useEffect, useCallback } from 'react';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Speed = 'slow' | 'normal' | 'fast';
type Theme = 'neon' | 'rainbow' | 'classic';

const SPEED_VALUES: Record<Speed, number> = {
  slow: 200,
  normal: 150,
  fast: 100,
};

const SPEED_LABELS: Record<Speed, string> = {
  slow: '慢速',
  normal: '正常',
  fast: '快速',
};

const THEME_COLORS: Record<Theme, {
  snake: string,
  food: string,
  glow: string,
}> = {
  neon: {
    snake: 'bg-green-400',
    food: 'bg-pink-400',
    glow: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]',
  },
  rainbow: {
    snake: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    food: 'bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500',
    glow: 'shadow-[0_0_10px_rgba(236,72,153,0.5)]',
  },
  classic: {
    snake: 'bg-green-600',
    food: 'bg-red-600',
    glow: '',
  },
};

export default function SnakeGameV2() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState<Speed>('normal');
  const [theme, setTheme] = useState<Theme>('neon');
  const [highScore, setHighScore] = useState(0);

  const gridSize = 20;

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const checkCollision = (head: Position) => {
    if (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, gameStarted, score, generateFood, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, SPEED_VALUES[speed]);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speed]);

  const SpeedButton = ({ speedValue }: { speedValue: Speed }) => (
    <button
      onClick={() => setSpeed(speedValue)}
      className={`px-3 py-1 rounded transition-all duration-200 ${
        speed === speedValue
          ? 'bg-blue-500 text-white scale-105'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {SPEED_LABELS[speedValue]}
    </button>
  );

  const ThemeButton = ({ themeValue }: { themeValue: Theme }) => (
    <button
      onClick={() => setTheme(themeValue)}
      className={`px-3 py-1 rounded capitalize transition-all duration-200 ${
        theme === themeValue
          ? 'bg-purple-500 text-white scale-105'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {themeValue}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">得分: {score}</div>
        <div className="text-2xl font-bold text-purple-600">最高分: {highScore}</div>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2 justify-center">
          <SpeedButton speedValue="slow" />
          <SpeedButton speedValue="normal" />
          <SpeedButton speedValue="fast" />
        </div>
        <div className="flex gap-2 justify-center">
          <ThemeButton themeValue="neon" />
          <ThemeButton themeValue="rainbow" />
          <ThemeButton themeValue="classic" />
        </div>
      </div>

      <div 
        className="grid bg-gray-900 border-2 border-gray-700 rounded-lg p-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gap: '1px',
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`w-5 h-5 rounded-sm transition-all duration-200 ${
                isSnake
                  ? `${THEME_COLORS[theme].snake} ${THEME_COLORS[theme].glow}`
                  : isFood
                  ? `${THEME_COLORS[theme].food} ${THEME_COLORS[theme].glow} animate-pulse`
                  : 'bg-gray-800'
              }`}
            />
          );
        })}
      </div>

      {!gameStarted ? (
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
        >
          开始游戏
        </button>
      ) : gameOver ? (
        <div className="text-center">
          <div className="text-xl text-red-500 mb-2">游戏结束!</div>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
          >
            重新开始
          </button>
        </div>
      ) : null}

      <div className="text-gray-600 text-sm mt-2">
        使用方向键控制蛇的移动
      </div>
    </div>
  );
}