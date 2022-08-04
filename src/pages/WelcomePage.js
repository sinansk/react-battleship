import NameComponent from "../components/NameComponent";
import StepButton from "../components/StepButton";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  let navigate = useNavigate();
  //I am trying to adding steps pages to starting a game
  //To do that I am trying to use useNavigate with a click but it doesnt work now
  const routeChange = () => {
    console.log("clicked");
    navigate("/player-1", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <NameComponent />
      <StepButton name="next" onClick={routeChange()} />
    </div>
  );
};

export default WelcomePage;
