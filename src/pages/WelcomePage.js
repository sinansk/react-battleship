import { useEffect } from "react";
import NameComponent from "../components/NameComponent";
import StepButton from "../components/StepButton";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../redux/gameRedux";

const WelcomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
