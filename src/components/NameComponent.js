import { useDispatch } from "react-redux/";
import { setPlayerNames } from "../redux/gameRedux";
import StepButton from "../components/StepButton";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NameComponent = () => {
  const dispatch = useDispatch();
  const [userNames, setUserNames] = useState({
    playerOneName: "",
    playerTwoName: "",
  });

  const handleNames = (e) => {
    setUserNames((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <h2 className="mb-10 text-2xl font-bold sm:text-3xl 2xl:text-4xl">
        PLEASE ENTER YOUR NAMES!
      </h2>
      <div className="flex flex-col items-center justify-center text-2xl bg-gray-400 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 w-96 h-96 2xl:h-[574px] 2xl:w-[574px] 2xl:text-3xl">
        <div className="flex flex-col m-10">
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            name="playerOneName"
            id="player1"
            placeholder="John Doe"
            onChange={handleNames}
          ></input>
        </div>
        <div className="flex flex-col m-10">
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            name="playerTwoName"
            id="player2"
            placeholder="Don Joe"
            onChange={handleNames}
          ></input>
        </div>
      </div>
      <div
        className={`${
          (userNames.playerOneName === "" || userNames.playerTwoName === "") &&
          `invisible`
        } mt-4`}
        onClick={(e) => dispatch(setPlayerNames(userNames))}
      >
        <NavLink to="/player-1">
          <StepButton buttonName="next" />
        </NavLink>
      </div>
    </>
  );
};

export default NameComponent;
