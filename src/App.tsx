import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import SnakeGameV2 from './components/SnakeGameV2';

function App() {
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
        <div className="space-y-2">
          <button
            onClick={() => setVersion('v1')}
            className={`w-full px-4 py-2 rounded ${
              version === 'v1'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            经典版
          </button>
          <button
            onClick={() => setVersion('v2')}
            className={`w-full px-4 py-2 rounded ${
              version === 'v2'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            炫彩版
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">贪吃蛇游戏</h1>
        {version === 'v1' ? <SnakeGame /> : <SnakeGameV2 />}
      </div>
    </div>
  );
}

export default App;