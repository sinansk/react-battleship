import { coordsX, coordsY } from "../coords";
import { useDispatch, useSelector } from "react-redux";
import { playerOneFires, playerTwoFires, setWinner } from "../redux/gameRedux";

const GameComponent = ({ player, opponent }) => {
  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerFires = activePlayer.fires;
  const successFires = activePlayerFires.successFires;
  const opponentShips = useSelector((state) =>
    state.users[opponent].placedShipsCoords.flat()
  );

  const dispatch = useDispatch();

  ///I TRIED REFACTORING TO DISPATCH FUNCTIONS FOR FIRES, BUT IT DID NOT WORKED SOMEHOW//
  const handleFire = (e) => {
    let area = e.target.dataset.coord;
    player === "playerOne" &&
      dispatch(playerOneFires({ area, player, opponent }));

    player === "playerTwo" &&
      dispatch(playerTwoFires({ area, player, opponent }));
  };

  const handleWinner = (successFires, opponentShips) => {
    if (successFires.length === opponentShips.length) {
      return successFires.every((element) => {
        if (opponentShips.includes(element)) {
          dispatch(setWinner(player));
          return true;
        }
        return false;
      });
    }
    return false;
  };
  handleWinner(successFires, opponentShips);

  return (
    <>
      {/* Creating grid cells with XY coordinates  */}
      <div
        className={`${
          player === `playerTwo` ? `bg-lime-300` : `bg-sky-300`
        } relative grid grid-cols-10 text-sm scale-95 sm:scale-100 `}
      >
        <div className="absolute right-0 grid grid-cols-10 text-center -top-6 ">
          {coordsY.map((item) => (
            <div key={item} className="w-10 2xl:w-14">
              {item}
            </div>
          ))}
        </div>
        <div className="absolute top-0 grid items-center text-right -left-4 grid-rows-10">
          {coordsX.map((item) => (
            <div key={item[0]} className="grid items-center h-10 2xl:h-14">
              {item[0]}
            </div>
          ))}
        </div>
        {coordsY.map((coordY) => (
          <div
            coord={coordY}
            key={coordY}
            className="grid scale-95 grid-rows-10 sm:scale-100"
          >
            {coordsX.map((coordX) => (
              <div
                className={`cursor-crosshair hover:bg-${player}-hover border-[0.5px] bg-${player}-bg 2xl:w-14 2xl:h-14 w-10 h-10`}
                key={coordX[1] + coordY}
                data-coord={coordX[1] + coordY}
                onClick={(e) => handleFire(e)}
              >
                {activePlayerFires.successFires?.includes(
                  coordX[1] + coordY
                ) && (
                  <div
                    data-coord={coordX[1] + coordY}
                    className="cursor-not-allowed border-[0.5px] bg-green-500 w-10 h-10 2xl:w-14 2xl:h-14"
                  ></div>
                )}
                {activePlayerFires.missedFires?.includes(
                  coordX[1] + coordY
                ) && (
                  <div
                    data-coord={coordX[1] + coordY}
                    className="cursor-not-allowed border-[0.5px] bg-red-500 w-10 h-10 2xl:w-14 2xl:h-14"
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
