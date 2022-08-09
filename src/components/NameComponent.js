import { useDispatch, useSelector } from "react-redux/";

import { setPlayerTwoName, setPlayerOneName } from "../redux/gameRedux";
const NameComponent = () => {
  const dispatch = useDispatch();
  const player1Name = useSelector((state) => state.users.playerOne.name);
  const player2Name = useSelector((state) => state.users.playerTwo.name);

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold ">PLEASE ENTER YOUR NAMES!</h2>

      <div className="flex flex-col items-center justify-center text-2xl bg-blue-300 border-2 rounded-md w-96 h-96">
        <div className="flex flex-col m-10">
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            value={player1Name ? player1Name : ""}
            id="player1"
            placeholder="John Doe"
            onChange={(e) =>
              dispatch(setPlayerOneName(e.target.value.toUpperCase()))
            }
          ></input>
        </div>
        <div className="flex flex-col m-10">
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            value={player2Name ? player2Name : ""}
            id="player2"
            placeholder="Don Joe"
            onChange={(e) =>
              dispatch(setPlayerTwoName(e.target.value.toUpperCase()))
            }
          ></input>
        </div>
      </div>
    </>
  );
};

export default NameComponent;
