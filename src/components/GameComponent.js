import { useDispatch, useSelector } from "react-redux";
import { playerOneFires, playerTwoFires } from "../redux/gameRedux";

const GameComponent = ({ opponentFires, playerName, player }) => {
  const coordsX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const dispatch = useDispatch();

  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerFires = activePlayer.fires;
  const handleFire = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    if (player === "playerOne") {
      dispatch(playerOneFires(area));
    } else if (player === "playerTwo") {
      dispatch(playerTwoFires(area));
    }
  };

  return (
    <>
      {/* Creating grid cells with XY coordinates  */}
      <div className="relative grid grid-cols-10 text-sm ">
        <div className="absolute right-0 grid grid-cols-10 text-center -top-6 ">
          {coordsY.map((item) => (
            <div key={item} className="w-10">
              {item}
            </div>
          ))}
        </div>
        <div className="absolute top-0 grid items-center text-right -left-4  grid-rows-10">
          {coordsX.map((item) => (
            <div key={item} className="h-10 grid items-center">
              {item}
            </div>
          ))}
        </div>
        {coordsY.map((coordY) => (
          <div coord={coordY} key={coordY} className="grid grid-rows-10">
            {coordsX.map((coordX) => (
              <div
                className="cursor-pointer hover:bg-primary border-[0.5px] bg-slate-100 w-10 h-10"
                value={coordX + coordY}
                key={coordX + coordY}
                // isFilled={false} //turn true when user place ships on cells//
                data-coord={coordX + coordY}
                onClick={(e) => handleFire(e)}
              >
                {activePlayerFires.successFires?.includes(coordX + coordY) && (
                  <div
                    data-coord={coordX + coordY}
                    className="cursor-pointer hover:bg-primary border-[0.5px] bg-green-500 w-10 h-10"
                  ></div>
                )}
                {activePlayerFires.missedFires?.includes(coordX + coordY) && (
                  <div
                    data-coord={coordX + coordY}
                    className="cursor-pointer hover:bg-primary border-[0.5px] bg-red-500 w-10 h-10"
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
