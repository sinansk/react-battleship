import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { coordsX, coordsY } from "../coords";
import { placeShip, resetShipPosition } from "../redux/gameRedux";

const PlacingComponent = ({ player }) => {
  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerShips = activePlayer?.placedShipsCoords.flat();
  const waitingShips = useSelector((state) => state.users[player].waitingShips);
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [selectedShipId, setSelectedShipId] = useState("");
  const [selectedShipLength, setSelectedShipLength] = useState("");
  const [shipCoord, setShipCoord] = useState([]);
  const [shipDirection, setShipDirection] = useState("X");

  const dispatch = useDispatch();

  const handleShip = (e) => {
    setIsShipSelected(true);
    setSelectedShipId(e.target.id);
    setSelectedShipLength(e.target.dataset.length);
  };

  const handleShipDirection = () => {
    shipDirection === "X" ? setShipDirection("Y") : setShipDirection("X");
  };
  //CREATING SHIP COORDINATES TO SHOW ON BOARD//
  let shipStartPoint;
  let shipPoints = [];
  const handleShipOverBoard = (e) => {
    if (isShipSelected) {
      shipStartPoint = e.target.dataset.coord;
      // if ship direction is X axis///
      let pointTwo = Number(shipStartPoint[1]);
      let pointOne = Number(shipStartPoint[0]);
      if (shipDirection === "X") {
        for (let i = 0; i < selectedShipLength; i++) {
          let point = shipStartPoint[0] + pointTwo;
          shipPoints.push(point);
          pointTwo += 1;
        }
      } else if (shipDirection === "Y") {
        //if ship direction is Y axis //
        for (let i = 0; i < selectedShipLength; i++) {
          let point = pointOne + shipStartPoint[1];
          shipPoints.push(point);
          pointOne += 1;
        }
      }
      setShipCoord(shipPoints);
    }
  };

  const handlePlacedShips = () => {
    ///CHECK IF ANY SHIP COORD OUT OF THE BOARD, TO SEND COORD TO REDUX////
    isShipSelected &&
      shipCoord.every((element) => element <= 99) &&
      shipCoord.every((element) => element !== `010`) &&
      dispatch(placeShip({ player, shipCoord, selectedShipId })); //sending selected ship ıd to redux for hide placed ships on ui//
    setIsShipSelected(false);
  };
  ///IF USER WANT TO CHANGE SHIP POSITIONS BEFORE GAME STARTED ///
  const resetShips = () => {
    dispatch(resetShipPosition(player));
  };

  return (
    <div className="grid sm:grid-cols-2">
      <div className="flex flex-col items-center -mt-5 scale-75 sm:mt-0 sm:scale-100 sm:mr-10">
        <div
          className={`${
            shipDirection === `X` && `grid grid-rows-5 gap-1`
          }   flex flex-row items-center h-60 2xl:w-[36rem] 2xl:h-[21rem] gap-2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 justify-evenly w-96`}
        >
          {waitingShips?.map((ship) => (
            <div
              onClick={(e) => handleShip(e)}
              onDrag={(e) => handleShip(e)}
              key={ship.id}
              id={ship.id}
              data-length={ship.length}
              name={ship.length}
              style={{ height: `${ship.height}` }} ///TAILWIND DOESN'T SUPPORT MAPPING STYLE CLASS//
              className={`${shipDirection === `X` && `rotate-90`} ${
                ship.isPlaced && `hidden`
              }  ship cursor-pointer w-10 2xl:scale-125 border rounded-sm bg-slate-700 hover:scale-105 hover:bg-slate-600 hover:outline outline-sky-500`}
            ></div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-5 ">
          <button
            onClick={handleShipDirection}
            className="items-center justify-center p-2 px-3 py-2 overflow-hidden text-sm transition duration-300 ease-out border-2 border-white rounded-full shadow-md hover:bg-slate-600 font-sm text-slate-100 bg-slate-700"
          >
            rotate
          </button>
          <button
            onClick={resetShips}
            className="items-center justify-center p-2 px-3 py-2 overflow-hidden text-sm transition duration-300 ease-out border-2 border-white rounded-full shadow-md hover:bg-slate-600 font-sm text-slate-100 bg-slate-700"
          >
            reset
          </button>
        </div>
      </div>

      {/* Creating grid cells with XY coordinates  */}
      <div className="relative grid grid-cols-10 pl-3 text-sm scale-90 sm:pl-0 -mt-9 sm:mt-0 xs:scale-95 sm:scale-100">
        <div className="absolute left-0 right-0 grid grid-cols-10 pl-3 text-center sm:pl-0 sm:-top-6 ">
          {coordsY.map((item) => (
            <div key={item} className="w-10 2xl:w-14">
              {item}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 grid items-center text-right scale-90 sm:-left-4 grid-rows-10 xs:scale-95 sm:scale-100">
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
            className="grid scale-90 xs:scale-95 sm:scale-100 grid-rows-10"
          >
            {coordsX.map((coordX) => (
              <div
                className={`${
                  activePlayerShips?.includes(coordX[1] + coordY)
                    ? `bg-slate-700`
                    : `${player === `playerTwo` ? `bg-lime-300` : `bg-sky-300`}`
                } 
                     border-[0.5px]  w-10 h-10 2xl:w-14 2xl:h-14`}
                key={coordX[1] + coordY}
                data-coord={coordX[1] + coordY}
                onMouseOver={handleShipOverBoard}
              >
                {isShipSelected && shipCoord?.includes(coordX[1] + coordY) && (
                  <div
                    onClick={handlePlacedShips}
                    data-coord={coordX[1] + coordY}
                    className={`${
                      shipCoord.some((item) => activePlayerShips.includes(item))
                        ? `bg-red-500`
                        : ` bg-green-500`
                    }  w-10 h-10 2xl:w-14 2xl:h-14 border-[0.5px] text-center text-lg cursor-pointer`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacingComponent;
