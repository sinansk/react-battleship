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
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2 h-3/4 flex flex-col text-center items-evenly justify-evenly bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h2 className="text-4xl font-extrabold animate-pulse">
          {winnerName} IS WON!
        </h2>
        <div className=" text-2xl">
          <ol>
            <li>
              <h3 className="underline font-semibold">{playerOneName}</h3>
              <h3>Succesfull Fires: {playerOne.fires.successFires.length}</h3>
              <h3>Missed Fires: {playerOne.fires.missedFires.length}</h3>
            </li>
            <hr></hr>
            <li>
              <h3 className="underline font-semibold">{playerTwoName}</h3>
              <h3>Succesfull Fires: {playerTwo.fires.successFires.length}</h3>
              <h3>Missed Fires: {playerTwo.fires.missedFires.length}</h3>
            </li>
          </ol>
        </div>
        <Link to="/">
          <StepButton name="new game" />
        </Link>
      </div>
    </div>
  );
};

export default EndPage;
