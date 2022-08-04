import Home from "./pages/Home";
import PlacingPagePlayerOne from "./pages/PlacingPagePlayerOne";
import PlacingPagePlayerTwo from "./pages/PlacingPagePlayerTwo";
import GamePage from "./pages/GamePage";
import WelcomePage from "./pages/WelcomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/player-1" element={<PlacingPagePlayerOne />} />
          <Route path="/player-2" element={<PlacingPagePlayerTwo />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
