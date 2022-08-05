import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AvailableShipsComponent = () => {
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

  const [availableShips, setAvaliableShips] = useState(ships);
  const [selectedShipLength, setSelectedShipLength] = useState("");
  const [selectedShip, setSelectedShip] = useState("");

  const handleShip = (e) => {
    setSelectedShipLength(e.target.dataset.length);
  };

  useEffect(() => {
    console.log(selectedShipLength);
  }, [selectedShipLength]);

  return (
    <div>
      <div className="flex flex-row items-center h-48 gap-2 mr-10 justify-evenly sm:flex-col w-96 bg-primary">
        {availableShips.map((ship) => (
          <div
            onClick={(e) => handleShip(e)}
            key={ship.name}
            data-length={ship.length}
            name={ship.name}
            draggable
            className="cursor-pointer w-40 h-10 bg-rose-200 hover:outline outline-green-500"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AvailableShipsComponent;
