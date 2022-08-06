import { useDispatch, useSelector } from "react-redux";

import { placePlayerOneShips, placePlayerTwoShips } from "../redux/gameRedux";
const PlacingComponent = ({ player }) => {
  const coordsX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const dispatch = useDispatch();

  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerShips = activePlayer?.placedShipsCoords;

  const handleFilledAreas = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    if (player === "playerOne") {
      dispatch(placePlayerOneShips(area));
    } else if (player === "playerTwo") {
      dispatch(placePlayerTwoShips(area));
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
                data-coord={coordX + coordY}
                onClick={(e) => handleFilledAreas(e)}
              >
                {activePlayerShips?.includes(coordX + coordY) && (
                  <div className="cursor-pointer hover:bg-primary border-[0.5px] bg-slate-800 w-10 h-10"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlacingComponent;
