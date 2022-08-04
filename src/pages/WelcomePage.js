import NameComponent from "../components/NameComponent";
import StepButton from "../components/StepButton";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <NameComponent />
      <div className="flex gap-2">
        <NavLink to="/player-1">
          <StepButton name="next" />
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
