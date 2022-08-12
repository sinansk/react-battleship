import PlacingPagePlayerOne from "./pages/PlacingPagePlayerOne";
import PlacingPagePlayerTwo from "./pages/PlacingPagePlayerTwo";
import GamePagePlayerOne from "./pages/GamePagePlayerOne";
import GamePagePlayerTwo from "./pages/GamePagePlayerTwo";
import WelcomePage from "./pages/WelcomePage";
import EndPage from "./pages/EndPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const activePlayer = useSelector((state) => state.users.activePlayer);
  const isGameEnd = useSelector((state) => state.users.isGameEnd);
  const isGameStarted = useSelector((state) => state.users.isGameStarted);

  return (
    <div className="min-h-screen bg-center bg-no-repeat bg-cover min-w-screen overlow-hidden bg-sea-bg-image">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          {!isGameStarted && (
            <>
              <Route path="/player-1" element={<PlacingPagePlayerOne />} />
              <Route path="/player-2" element={<PlacingPagePlayerTwo />} />
            </>
          )}
          <>
            <Route
              path="/game-1"
              element={
                isGameEnd ? (
                  <Navigate to="/end" />
                ) : activePlayer === "playerTwo" ? (
                  <Navigate to="/game-2" />
                ) : (
                  <GamePagePlayerOne />
                )
              }
            />
            <Route
              path="/game-2"
              element={
                isGameEnd ? (
                  <Navigate to="/end" />
                ) : activePlayer === "playerOne" ? (
                  <Navigate to="/game-1" />
                ) : (
                  <GamePagePlayerTwo />
                )
              }
            />
          </>

          {isGameEnd && <Route path="/end" element={<EndPage />} />}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
