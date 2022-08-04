import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";
import StepButton from "../components/StepButton";

const PlacingPagePlayerTwo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <PlacingComponent playerName="player-2" />
      <div className="flex gap-2">
        <NavLink to="/player-1">
          <StepButton name="back" />
        </NavLink>
        <NavLink to="/game">
          <StepButton name="next" />
        </NavLink>
      </div>
    </div>
  );
};

export default PlacingPagePlayerTwo;
