import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  placePlayerOneShips,
  placePlayerTwoShips,
  placeShip,
  resetShipPosition,
} from "../redux/gameRedux";

const PlacingComponent = ({ player }) => {
  const ships = [
    {
      name: "carrier",
      length: "5",
      placed: false,
      height: "200px",
      width: "20px",
    },
    {
      name: "battleship",
      length: "4",
      placed: false,
      height: "160px",
      width: "20px",
    },
    {
      name: "cruiser",
      length: "3",
      placed: true,
      height: "120px",
      width: "20px",
    },
    {
      name: "submarine",
      length: "3",
      placed: false,
      height: `120px`,
      width: "20px",
    },
    {
      name: "destroyer",
      length: "2",
      placed: false,
      height: "80px",
      width: "20px",
    },
  ];
  const dispatch = useDispatch();
  const [availableShips, setAvaliableShips] = useState(ships);
  const [selectedShipLength, setSelectedShipLength] = useState("");

  const handleShip = (e) => {
    e.currentTarget.classList.add(`selected`);
    setIsShipSelected(true);
    setSelectedShipLength(e.target.dataset.length);
  };

  useEffect(() => {
    console.log(availableShips);
  }, [availableShips]);
  // const handleDrag = (e) => {
  //   setIsDropped(false);
  //   dispatch(setIsShipSelected(true));
  //   dispatch(setSelectedShipLength(e.target.dataset.length));
  //   console.log(
  //     "length:",
  //     e.target.dataset.length,
  //     "X:",
  //     e.pageX - e.target.offsetLeft,
  //     "Y:",
  //     e.pageY - e.target.offsetTop,
  //     "Square:",
  //     Math.ceil(
  //       (e.pageY - e.target.offsetTop) /
  //         (e.target.offsetHeight / e.target.dataset.length)
  //     )
  //   );
  // };

  useEffect(() => {
    console.log(selectedShipLength);
  }, [selectedShipLength]);

  const coordsX = ["A0", "B1", "C2", "D3", "E4", "F5", "G6", "H7", "I8", "J9"];
  const coordsY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerShips = activePlayer?.placedShipsCoords;
  const flatten = activePlayerShips?.flat();
  const [isShipSelected, setIsShipSelected] = useState(false);

  const handleFilledAreas = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    if (player === "playerOne") {
      dispatch(placePlayerOneShips(area));
    } else if (player === "playerTwo") {
      dispatch(placePlayerTwoShips(area));
    }
  };

  const [shipCoord, setShipCoord] = useState([]);
  // const shipDirection = "Y";

  let shipStartPoint;

  let shipPoints = [];
  const handleDragOverPoint = (e) => {
    if (isShipSelected) {
      shipStartPoint = e.target.dataset.coord;
      console.log(shipStartPoint);

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
      shipCoord.every((element) => element !== `010`)
    ) {
      dispatch(placeShip({ player, shipCoord }));
    }
    setIsShipSelected(false);
  };

  const [shipDirection, setShipDirection] = useState("X");

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
          } flex flex-row items-center h-60 gap-2  bg-blue-300 border-[1px] rounded-sm justify-evenly w-96`}
        >
          {availableShips?.map((ship, i) => (
            <div
              onClick={(e) => handleShip(e)}
              onDrag={(e) => handleShip(e)}
              key={i}
              data-length={ship.length}
              name={ship.length}
              style={{ height: `${ship.height}` }}
              className={`${
                shipDirection === `X` && `rotate-90`
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
          {/* <button
            onClick={resetShips}
            className="items-center justify-center p-2 px-3 py-2 overflow-hidden text-sm transition duration-300 ease-out border-2 border-white rounded-full shadow-md hover:bg-slate-600 font-sm text-slate-100 bg-slate-700"
          >
            reset
          </button> */}
        </div>
      </div>

      {/* Creating grid cells with XY coordinates  */}
      <div className="relative grid grid-cols-10 text-sm ">
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
                className={`${
                  flatten?.includes(coordX[1] + coordY)
                    ? `bg-slate-700`
                    : `bg-blue-300`
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
