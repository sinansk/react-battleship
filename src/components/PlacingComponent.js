import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvailableShipsComponent from "./AvailableShipsComponent";
import {
  setSelectedShip,
  setFilledAreas,
  filledAreas,
} from "../redux/gameRedux";
const PlacingComponent = ({ opponentFires, playerName }) => {
  const coordsX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const dispatch = useDispatch();
  console.log("opponentFires", opponentFires);
  const filledAreas = useSelector((state) => state.users.filledAreas);

  // const [filledAreas, setFilledAreas] = useState([]);

  // const handleFilledAreas = (e) => {
  //   let area = e.target.dataset.coord;
  //   console.log(area);
  //   setFilledAreas((oldArray) => [...oldArray, area]);
  // };

  const handleFilledAreas = (e) => {
    let area = e.target.dataset.coord;
    console.log(area);
    dispatch(setFilledAreas(area));
  };

  useEffect(() => {
    console.log(filledAreas);
  }, [filledAreas]);

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
                onClick={(e) => handleFilledAreas(e)}
              >
                {opponentFires?.includes(coordX + coordY) && (
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
