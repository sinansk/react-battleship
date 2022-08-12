import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/";
import StepButton from "../components/StepButton";

const PlacingPagePlayerTwo = () => {
  const playerTwo = useSelector((state) => state.users.playerTwo);
  const playerTwoName = playerTwo.name;
  const isPlayerTwoReady = playerTwo.isReady;

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-full overflow-hidden sm:h-screen">
      <h2 className="text-2xl font-bold sm:mb-10 sm:text-3xl animate-pulse">
        {playerTwoName}, PLACE YOUR SHIPS
      </h2>
      <PlacingComponent playerName={playerTwoName} player="playerTwo" />
      <div className="flex gap-2 -mt-7 sm:mt-0">
        <NavLink to="/player-1">
          <StepButton buttonName="back" />
        </NavLink>
        {isPlayerTwoReady && (
          <NavLink to="/game-1">
            <StepButton buttonName="play" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default PlacingPagePlayerTwo;
