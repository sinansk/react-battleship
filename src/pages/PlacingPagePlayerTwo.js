import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/";
import StepButton from "../components/StepButton";
import AvailableShipsComponent from "../components/AvailableShipsComponent";

const PlacingPagePlayerTwo = () => {
  const playerTwoName = useSelector((state) => state.users.playerTwo.name);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h2 className="mb-10 text-2xl font-bold">
        {playerTwoName}, PLACE YOUR SHIPS
      </h2>
      <div className="flex flex-col sm:flex-row ">
        <AvailableShipsComponent />
        <PlacingComponent playerName={playerTwoName} player="playerTwo" />
      </div>
      <div className="flex gap-2">
        <NavLink to="/player-1">
          <StepButton name="back" />
        </NavLink>
        <NavLink to="/game-1">
          <StepButton name="next" />
        </NavLink>
      </div>
    </div>
  );
};

export default PlacingPagePlayerTwo;
