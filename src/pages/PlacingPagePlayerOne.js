import PlacingComponent from "../components/PlacingComponent";

import { useNavigate } from "react-router-dom";
import StepButton from "../components/StepButton";

const PlacingPagePlayerOne = () => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <PlacingComponent playerName="player-1" />
      <StepButton name="back" />
    </div>
  );
};

export default PlacingPagePlayerOne;
