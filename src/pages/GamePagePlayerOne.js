import { useSelector } from "react-redux";
import GameComponent from "../components/GameComponent";
import { setGameStarted } from "../redux/gameRedux";
import { useDispatch } from "react-redux/";

const GamePagePlayerOne = () => {
  const activePlayer = useSelector((state) => state.users.activePlayer);
  const activePlayerName = useSelector(
    (state) => state.users[activePlayer]?.name
  );
  const isGameStarted = useSelector((state) => state.users.isGameStarted);
  const dispatch = useDispatch();

  !isGameStarted && dispatch(setGameStarted());

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen transition ease-in-out delay-1500">
      <h2 className="mb-10 text-3xl font-bold animate-pulse">
        YOUR TURN, {activePlayerName}
      </h2>
      <GameComponent opponent="playerTwo" player="playerOne" />
    </div>
  );
};

export default GamePagePlayerOne;
