import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  placePlayerOneShips,
  placePlayerTwoShips,
  setIsShipSelected,
  setSelectedShipLength,
} from "../redux/gameRedux";
const PlacingComponent = ({ player }) => {
  const ships = [
    {
      name: "carrier",
      length: 5,
      placed: null,
    },
    {
      name: "battleship",
      length: 4,
      placed: null,
    },
    {
      name: "cruiser",
      length: 3,
      placed: null,
    },
    {
      name: "submarine",
      length: 3,
      placed: null,
    },
    {
      name: "destroyer",
      length: 2,
      placed: null,
    },
  ];
  const dispatch = useDispatch();
  const [availableShips, setAvaliableShips] = useState(ships);
  //   const [selectedShipLength, setSelectedShipLength] = useState("");
  //   const [selectedShip, setSelectedShip] = useState("");
  const selectedShipLength = useSelector(
    (state) => state.users.selectedShipLength
  );
  // const handleShip = (e) => {
  //   dispatch(setSelectedShipLength(e.target.dataset.length));
  // };
  const handleDrag = (e) => {
    dispatch(setIsShipSelected(true));
    dispatch(setSelectedShipLength(e.target.dataset.length));
    console.log(
      "length:",
      e.target.dataset.length,
      "X:",
      e.pageX - e.target.offsetLeft,
      "Y:",
      e.pageY - e.target.offsetTop,
      "Square:",
      Math.ceil(
        (e.pageY - e.target.offsetTop) /
          (e.target.offsetHeight / e.target.dataset.length)
      )
    );
  };

  const handleShipDirection = (e) => {};

  useEffect(() => {
    console.log(selectedShipLength);
  }, [selectedShipLength]);

  const coordsX = ["A0", "B1", "C2", "D3", "E4", "F5", "G6", "H7", "I8", "J9"];
  const coordsY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const activePlayer = useSelector((state) => state.users[player]);
  const activePlayerShips = activePlayer?.placedShipsCoords;

  const [dragPoint, setDragPoint] = useState("");
  const [notDraggableArea, setNotDraggableArea] = useState(false);
  const [isDragStart, setIsDragStart] = useState(false);
  const isShipSelected = useSelector((state) => state.users.isShipSelected);
  console.log(isShipSelected);
  const handleFilledAreas = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    if (player === "playerOne") {
      dispatch(placePlayerOneShips(area));
    } else if (player === "playerTwo") {
      dispatch(placePlayerTwoShips(area));
    }
  };
  // const handleDragEnterPoint = (e) => {
  //   let point = e.target.dataset.coord;
  //   console.log("dragStartPoint", point);
  // };
  // const handleDragLeavePoint = (e) => {
  //   let point = e.target.dataset.coord;
  //   console.log("dragLeavePoint", point);
  // };

  // const handleDragExitPoint = (e) => {
  //   let point = e.target.dataset.coord;
  //   console.log("dragExitPoint", point);
  // };

  // const handleDragStartPoint = (e) => {
  //   let area = e.target.dataset.coord;
  //   console.log("dragStartPoint", area);
  // };

  // const handleShip = (e) => {
  //   let area = e.target.dataset.coord;
  //   console.log("onDropCapture", area);
  // };
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [shipStart, setShipStart] = useState([]);
  const shipDirection = "X";
  const handleMouseUp = () => {
    setIsMouseUp(true);
  };
  let shipStartPoint;
  let shipPoints = [];
  const handleDragOverPoint = (e) => {
    shipStartPoint = e.target.dataset.coord;

    // if ship direction is X axis///
    let pointTwo = Number(shipStartPoint[1]);
    let pointOne = Number(shipStartPoint[0]);
    if (shipDirection === "X") {
      for (let i = 0; i < selectedShipLength; i++) {
        console.log("pointTwo", pointTwo);
        if (shipStartPoint[0] <= 9 && pointTwo <= 9) {
          let point = shipStartPoint[0] + pointTwo;
          shipPoints.push(point);
        }
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

    // if (!activePlayerShips.includes(shipPoints)) {
    //   dispatch(placePlayerOneShips(shipPoints));
    // }

    setShipStart(shipPoints);
  };

  useEffect(() => {
    console.log("isMouseUp", isMouseUp);
  }, [isMouseUp]);
  const handleMouseUpPoint = (e) => {
    let point = e.target.dataset.coord;
    console.log("mouseUpPoint", point);
  };

  // const notDraggable = (e) => {
  //   let area = e.target.dataset.coord;
  //   if (activePlayerShips?.includes(area)) {
  //     console.log("Not Draggable", area);
  //     setNotDraggableArea(true);
  //   }
  // };
  useEffect(() => {
    console.log("onDragPoint", shipStart);
  }, [shipStart]);
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-row items-center h-48 gap-2 mr-10 justify-evenly sm:flex-row w-96 bg-primary">
        {availableShips.map((ship) => (
          <div
            onDragStart={(e) => handleDrag(e)}
            onMouseDown={(e) => setIsMouseUp(false)}
            onMouseUp={handleMouseUp}
            onDragEnd={() => dispatch(setIsShipSelected(false))}
            // onClick={(e) => handleShip(e)}
            key={ship.name}
            data-length={ship.length}
            name={ship.name}
            draggable
            className="cursor-pointer w-10 h-40 grid grid-rows-3  bg-rose-200 hover:outline outline-green-500"
          ></div>
        ))}
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
        <div className="absolute top-0 grid items-center text-right -left-4  grid-rows-10">
          {coordsX.map((item) => (
            <div key={item[0]} className="h-10 grid items-center">
              {item[0]}
            </div>
          ))}
        </div>
        {coordsY.map((coordY) => (
          <div coord={coordY} key={coordY} className="grid grid-rows-10">
            {coordsX.map((coordX) => (
              <div
                className={`${
                  isShipSelected && `bg-green-400`
                } cursor-pointer hover:bg-primary border-[0.5px] bg-slate-100 w-10 h-10`}
                key={coordX[1] + coordY}
                data-coord={coordX[1] + coordY}
                onClick={(e) => handleFilledAreas(e)}
                draggable
                // onDragEnter={handleDragEnterPoint}
                // onDragLeave={handleDragLeavePoint}
                // onDragExit={handleDragExitPoint}
                // onDragStart={handleDragStartPoint}
                onDragOver={handleDragOverPoint}
                // onMouseUp={handleMouseUp}
              >
                {activePlayerShips?.includes(coordX[1] + coordY) && (
                  <div
                    draggable
                    // onDragEnter={handleDragEnterPoint}
                    // onDragLeave={handleDragLeavePoint}
                    // onDragOver={notDraggable}
                    data-coord={coordX[1] + coordY}
                    className={`${
                      isShipSelected && `bg-red-400 `
                    }  border-[0.5px] text-center text-lg bg-slate-800 w-10 h-10`}
                  >
                    {`${isShipSelected ? `X` : ``}`}
                  </div>
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
