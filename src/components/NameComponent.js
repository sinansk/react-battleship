import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/";

import { setPlayerTwoName, setPlayerOneName } from "../redux/gameRedux";
const NameComponent = () => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const dispatch = useDispatch();
  const player1Name = useSelector((state) => state.users.playerOne.name);
  const player2Name = useSelector((state) => state.users.playerTwo.name);
  // const handleNames = (e) => {
  //   e.preventDefault();
  //   dispatch(e.target.value);
  // };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">PLEASE ENTER YOUR NAMES!</h2>

      <div className="flex flex-col items-center justify-center text-2xl border-2 rounded-md w-96 bg-slate-100 h-96">
        <div className="flex flex-col m-10">
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            value={player1Name ? player1Name : ""}
            id="player1"
            placeholder="John Doe"
            onChange={(e) => dispatch(setPlayerOneName(e.target.value))}
          ></input>
        </div>
        <div className="flex flex-col m-10">
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            value={player2Name ? player2Name : ""}
            id="player2"
            placeholder="Don Joe"
            onChange={(e) => dispatch(setPlayerTwoName(e.target.value))}
          ></input>
        </div>
      </div>
    </>
  );
};

export default NameComponent;
