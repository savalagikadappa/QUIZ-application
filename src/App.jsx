import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Quiz from "./pages/Quiz";
import Results from './pages/Results';
import './App.css';

function Home() {
  return (
    <div className="content">
      <h1>Master New Skills,<br /> One Quiz at a Time!</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path='/Result' element={<Results />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
