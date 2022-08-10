import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { coordsX, coordsY } from "../coords";
import { placeShip, resetShipPosition } from "../redux/gameRedux";
import { useNavigate } from "react-router-dom";

const PlacingComponent = ({ player }) => {
  const isGameStarted = useSelector((state) => state.users.isGameStarted);
  const activePlayer = useSelector((state) => state.users[player]);
  const isPlayerReady = activePlayer.isReady;
  const activePlayerShips = activePlayer?.placedShipsCoords;
  const flatten = activePlayerShips?.flat();
  const waitingShips = useSelector((state) => state.users[player].waitingShips);
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [selectedShipId, setSelectedShipId] = useState("");
  const [selectedShipLength, setSelectedShipLength] = useState("");
  const [shipCoord, setShipCoord] = useState([]);
  const [shipDirection, setShipDirection] = useState("X");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleShip = (e) => {
    setIsShipSelected(true);
    setSelectedShipId(e.target.id);
    setSelectedShipLength(e.target.dataset.length);
  };

  let shipStartPoint;
  let shipPoints = [];
  const handleDragOverPoint = (e) => {
    if (isShipSelected) {
      shipStartPoint = e.target.dataset.coord;
      // if ship direction is X axis///
      let pointTwo = Number(shipStartPoint[1]);
      let pointOne = Number(shipStartPoint[0]);
      if (shipDirection === "X") {
        for (let i = 0; i < selectedShipLength; i++) {
          console.log("pointTwo", pointTwo);
          let point = shipStartPoint[0] + pointTwo;
          shipPoints.push(point);
          pointTwo += 1;
        }
      } else if (shipDirection === "Y") {
        //if ship direction is Y axis //
        for (let i = 0; i < selectedShipLength; i++) {
          console.log("pointTwo", pointTwo);
          let point = pointOne + shipStartPoint[1];
          shipPoints.push(point);
          pointOne += 1;
        }
      }
      setShipCoord(shipPoints);
    }
  };

  useEffect(() => {
    console.log("shipCoord", shipCoord);
  }, [shipCoord]);

  const handlePlaceShips = () => {
    if (
      ///CHECK IF ANY SHIP COORD OUT OF THE BOARD, TO SEND COORD TO REDUX////
      shipCoord.every((element) => element <= 99) &&
      shipCoord.every((element) => element !== `010`) &&
      isShipSelected
    ) {
      dispatch(placeShip({ player, shipCoord, selectedShipId }));
      setIsShipSelected(false);
    }
  };

  const handleShipDirection = (e) => {
    if (shipDirection === "X") {
      setShipDirection("Y");
    } else {
      setShipDirection("X");
    }
  };

  useEffect(() => {
    console.log(shipDirection);
  }, [shipDirection]);
  const resetShips = () => {
    dispatch(resetShipPosition(player));
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center mr-10">
        <div
          className={`${
            shipDirection === `X` && `grid grid-rows-5 gap-1`
          }  flex flex-row items-center h-60 gap-2  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 justify-evenly w-96`}
        >
          {waitingShips?.map((ship) => (
            <div
              onClick={(e) => handleShip(e)}
              onDrag={(e) => handleShip(e)}
              key={ship.id}
              id={ship.id}
              data-length={ship.length}
              name={ship.length}
              style={{ height: `${ship.height}` }}
              className={`${shipDirection === `X` && `rotate-90`} ${
                ship.isPlaced && `hidden`
              }  ship cursor-pointer w-10  border rounded-sm bg-slate-700 hover:scale-105 hover:bg-slate-600 hover:outline outline-sky-500`}
            ></div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
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
      <div className="relative grid grid-cols-10 text-sm ">
        <div className="absolute left-0 right-0 grid grid-cols-10 text-center -top-6 ">
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
                className={`${
                  flatten?.includes(coordX[1] + coordY)
                    ? `bg-slate-700`
                    : `${player === `playerTwo` ? `bg-lime-300` : `bg-sky-300`}`
                } 
                     border-[0.5px]  w-10 h-10`}
                key={coordX[1] + coordY}
                data-coord={coordX[1] + coordY}
                // onClick={(e) => handleFilledAreas(e)}
                draggable
                onMouseOver={handleDragOverPoint}
              >
                {isShipSelected && shipCoord?.includes(coordX[1] + coordY) && (
                  <div
                    onClick={handlePlaceShips}
                    data-coord={coordX[1] + coordY}
                    className={`${
                      shipCoord.some((item) => flatten.includes(item))
                        ? `bg-red-500`
                        : ` bg-green-500`
                    }  w-10 h-10 border-[0.5px] text-center text-lg cursor-pointer`}
                  ></div>
                )}
                {/* {flatten?.includes(coordX[1] + coordY) && (
                  <div
                    draggable
                    data-coord={coordX[1] + coordY}
                    className={`${
                      isShipSelected && `bg-red-400 `
                    } border-[0.5px] text-center text-lg bg-slate-800 w-10 h-10`}
                  >
                    {`${isShipSelected ? `X` : ``}`}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacingComponent;
