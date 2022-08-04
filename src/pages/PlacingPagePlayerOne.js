import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";

import StepButton from "../components/StepButton";

const PlacingPagePlayerOne = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <PlacingComponent playerName="player-1" />
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
