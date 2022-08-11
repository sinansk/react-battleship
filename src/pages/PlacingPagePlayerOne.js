import PlacingComponent from "../components/PlacingComponent";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/";
import StepButton from "../components/StepButton";

const PlacingPagePlayerOne = () => {
  const playerOne = useSelector((state) => state.users.playerOne);
  const playerOneName = playerOne.name;
  const isPlayerOneReady = playerOne.isReady;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full sm:h-screen ">
      <h2 className="mb-3 text-2xl font-bold sm:mb-10 sm:text-3xl animate-pulse">
        {playerOneName}, PLACE YOUR SHIPS
      </h2>
      <PlacingComponent playerName={playerOneName} player="playerOne" />
      <div className="flex gap-2">
        <NavLink to="/">
          <StepButton buttonName="back" />
        </NavLink>
        {isPlayerOneReady && (
          <NavLink to="/player-2">
            <StepButton buttonName="next" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default PlacingPagePlayerOne;
