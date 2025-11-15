import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLotteryData, addParticipant, resetLottery } from '../utils/storage';
import { Participant } from '../types';

function Home() {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = () => {
    const data = getLotteryData();
    setParticipants(data.participants);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addParticipant(name.trim());
      setName('');
      setShowConfirmation(true);
      loadParticipants();
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the lottery? This will clear all participants.')) {
      resetLottery();
      loadParticipants();
    }
  };

  const totalPool = participants.length * 10;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            🎟️ Lotty
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Family Lottery Pool
          </p>

          {/* Entry Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                maxLength={50}
              />
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Join
              </button>
            </div>
            {showConfirmation && (
              <p className="mt-3 text-green-600 font-medium animate-pulse">
                ✓ You're in! Good luck!
              </p>
            )}
          </form>

          {/* Pool Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-gray-600 text-sm">Participants</p>
                <p className="text-3xl font-bold text-purple-700">
                  {participants.length}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Pool</p>
                <p className="text-3xl font-bold text-pink-700">
                  ${totalPool}
                </p>
              </div>
            </div>
          </div>

          {/* Participants List */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Current Participants
            </h2>
            {participants.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No participants yet. Be the first to join!
              </p>
            ) : (
              <div className="max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg">
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {index + 1}. {participant.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(participant.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/winner')}
              disabled={participants.length === 0}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎉 Draw Winner
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

