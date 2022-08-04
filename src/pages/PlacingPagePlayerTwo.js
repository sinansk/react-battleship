import PlacingComponent from "../components/PlacingComponent";
import { useNavigate } from "react-router-dom";
import StepButton from "../components/StepButton";

const PlacingPagePlayerTwo = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <PlacingComponent playerName="player-2" />
      <StepButton name="back" />
      <StepButton name="next" onClick={navigate("/game", { replace: true })} />
    </div>
  );
};

export default PlacingPagePlayerTwo;
