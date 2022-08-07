import { useSelector } from "react-redux";
import GameComponent from "../components/GameComponent";

const GamePagePlayerTwo = () => {
  const activePlayer = useSelector((state) => state.users.activePlayer);
  console.log(activePlayer);
  const activePlayerName = useSelector(
    (state) => state.users[activePlayer].name
  );

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-400 transition ease-in-out delay-1500">
      <h2 className="mb-10 text-2xl font-bold">
        YOUR TURN, {activePlayerName}
      </h2>
      <GameComponent opponent="playerOne" player="playerTwo" />
    </div>
  );
};

export default GamePagePlayerTwo;