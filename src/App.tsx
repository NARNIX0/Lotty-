import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Winner from './pages/Winner';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/winner" element={<Winner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

