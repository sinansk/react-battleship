import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/";
import StepButton from "../components/StepButton";
import AvailableShipsComponent from "../components/AvailableShipsComponent";

const PlacingPagePlayerOne = () => {
  const playerOneName = useSelector((state) => state.users.playerOne.name);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h2 className="mb-10 text-2xl font-bold">
        {playerOneName}, PLACE YOUR SHIPS
      </h2>
      <div className="flex flex-col sm:flex-row ">
        <AvailableShipsComponent />
        <PlacingComponent playerName={playerOneName} player="playerOne" />
      </div>
      <div className="flex gap-2">
        <NavLink to="/">
          <StepButton name="back" />
        </NavLink>
        <NavLink to="/player-2">
          <StepButton name="next" />
        </NavLink>
      </div>
    </div>
  );
};

export default PlacingPagePlayerOne;
