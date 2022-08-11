import React from "react";
import { useSelector } from "react-redux";
import StepButton from "../components/StepButton";
import { Link } from "react-router-dom";

const EndPage = () => {
  const winner = useSelector((state) => state.users.winner);
  const winnerName = useSelector((state) => state.users[winner]?.name);
  const playerOne = useSelector((state) => state.users.playerOne);
  const playerOneName = playerOne.name;
  const playerTwo = useSelector((state) => state.users.playerTwo);
  const playerTwoName = playerTwo.name;
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-full text-center bg-gray-400 border border-gray-100 rounded-md justify-evenly lg:w-1/2 h-3/4 md:w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <h2 className="text-4xl font-extrabold animate-pulse">
          {winnerName} WON!
        </h2>
        <div className="flex flex-col w-full text-2xl divide-y divide-solid ">
          <div>
            <h3 className="font-semibold underline ">{playerOneName}</h3>
            <h3>Succesfull Fires: {playerOne.fires.successFires.length}</h3>
            <h3>Missed Fires: {playerOne.fires.missedFires.length}</h3>
          </div>

          <div>
            <h3 className="my-auto font-semibold underline">{playerTwoName}</h3>
            <h3>Succesfull Fires: {playerTwo.fires.successFires.length}</h3>
            <h3>Missed Fires: {playerTwo.fires.missedFires.length}</h3>
          </div>
        </div>
        <Link to="/">
          <StepButton buttonName="new game" />
        </Link>
      </div>
    </div>
  );
};

export default EndPage;
