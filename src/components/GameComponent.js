import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playerOneFires,
  playerTwoFires,
  checkWinner,
} from "../redux/gameRedux";

const GameComponent = ({ player, opponent }) => {
  const coordsX = ["A0", "B1", "C2", "D3", "E4", "F5", "G6", "H7", "I8", "J9"];
  const coordsY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const dispatch = useDispatch();

  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerFires = activePlayer.fires;
  console.log(activePlayerFires);
  const handleFire = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    if (player === "playerOne") {
      dispatch(playerOneFires(area));
    } else if (player === "playerTwo") {
      dispatch(playerTwoFires(area));
    }
    dispatch(checkWinner({ player, opponent }));
  };
  console.log(player);

  const winner = useSelector((state) => state.users.winner);

  useEffect(() => {
    console.log("winner", winner);
  }, [winner]);

  return (
    <>
      {/* Creating grid cells with XY coordinates  */}
      <div
        className={`${
          player === `playerTwo` ? `bg-teal-300` : `bg-blue-300`
        } relative grid grid-cols-10 text-sm `}
      >
        <div className="absolute right-0 grid grid-cols-10 text-center -top-6 ">
          {coordsY.map((item) => (
            <div key={item} className="w-10">
              {item}
            </div>
          ))}
        </div>
        <div className="absolute top-0 grid items-center text-right -left-4 grid-rows-10">
          {coordsX.map((item) => (
            <div key={item[0]} className="grid items-center h-10">
              {item[0]}
            </div>
          ))}
        </div>
        {coordsY.map((coordY) => (
          <div coord={coordY} key={coordY} className="grid grid-rows-10">
            {coordsX.map((coordX) => (
              <div
                className={`cursor-crosshair hover:bg-${player}-hover border-[0.5px] bg-${player}-bg w-10 h-10`}
                key={coordX[1] + coordY}
                // isFilled={false} //turn true when user place ships on cells//
                data-coord={coordX[1] + coordY}
                onClick={(e) => handleFire(e)}
              >
                {activePlayerFires.successFires?.includes(
                  coordX[1] + coordY
                ) && (
                  <div
                    data-coord={coordX[1] + coordY}
                    className="cursor-not-allowed border-[0.5px] bg-green-500 w-10 h-10"
                  ></div>
                )}
                {activePlayerFires.missedFires?.includes(
                  coordX[1] + coordY
                ) && (
                  <div
                    data-coord={coordX[1] + coordY}
                    className="cursor-not-allowed border-[0.5px] bg-red-500 w-10 h-10"
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameComponent;
