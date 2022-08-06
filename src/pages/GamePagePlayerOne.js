import { useSelector } from "react-redux";
import GameComponent from "../components/GameComponent";

const GamePagePlayerOne = () => {
  const activePlayerName = useSelector((state) => state.users.activePlayerName);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-rose-400">
      <h2 className="mb-10 text-2xl font-bold">
        YOUR TURN, {activePlayerName}
      </h2>
      <GameComponent opponent="playerTwo" player="playerOne" />
    </div>
  );
};

export default GamePagePlayerOne;
