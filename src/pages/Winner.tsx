import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLotteryData, drawWinner } from '../utils/storage';
import { Participant } from '../types';

function Winner() {
  const [winner, setWinner] = useState<Participant | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getLotteryData();
    setParticipants(data.participants);
    setWinner(data.winner);
  }, []);

  const handleDraw = () => {
    if (participants.length === 0) return;

    setIsDrawing(true);
    setWinner(null);

    // Simulate drawing animation
    let count = 0;
    const interval = setInterval(() => {
      const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
      setWinner(randomParticipant);
      count++;
      
      if (count > 10) {
        clearInterval(interval);
        const finalWinner = drawWinner();
        setWinner(finalWinner);
        setIsDrawing(false);
      }
    }, 150);
  };

  const prizeAmount = participants.length * 10;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Back to Pool
          </button>

          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            🎊 Winner Draw 🎊
          </h1>

          {participants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">
                No participants in the lottery yet!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              {/* Winner Display Area */}
              <div className="mb-8 min-h-[300px] flex items-center justify-center">
                {!winner && !isDrawing && (
                  <div className="text-center">
                    <p className="text-2xl text-gray-600 mb-4">
                      Ready to draw the winner?
                    </p>
                    <p className="text-gray-500">
                      {participants.length} participant{participants.length !== 1 ? 's' : ''} in the pool
                    </p>
                  </div>
                )}

                {isDrawing && (
                  <div className="text-center">
                    <div className="animate-bounce mb-4 text-6xl">🎲</div>
                    <p className="text-2xl font-semibold text-gray-600 animate-pulse">
                      Drawing...
                    </p>
                  </div>
                )}

                {winner && !isDrawing && (
                  <div className="text-center animate-bounce">
                    <div className="text-6xl mb-4">🏆</div>
                    <p className="text-2xl text-gray-600 mb-2">Winner:</p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                      {winner.name}
                    </p>
                    <div className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full">
                      <p className="text-3xl font-bold text-white">
                        ${prizeAmount}
                      </p>
                    </div>
                    <p className="mt-6 text-gray-500">
                      Congratulations! 🎉
                    </p>
                  </div>
                )}
              </div>

              {/* Draw Button */}
              <button
                onClick={handleDraw}
                disabled={isDrawing || participants.length === 0}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isDrawing ? 'Drawing...' : winner ? 'Draw Again' : '🎲 Draw Winner'}
              </button>

              {/* Participants Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-center text-sm text-gray-600">
                  Total Participants: {participants.length} • Prize Pool: ${prizeAmount}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Winner;

