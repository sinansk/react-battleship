const PlacingComponent = () => {
  const coordsX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const coordsY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    //Creating grid cells with XY coordinates //
    <>
      <h2 className="mb-10 text-2xl font-bold">SİNAN, PLACE YOUR SHIPS</h2>

      <div className="flex flex-col sm:flex-row ">
        <div className="flex flex-row items-center h-48 gap-2 mr-10 justify-evenly sm:flex-col w-96 bg-primary">
          <div className="w-1/6 h-20 sm:w-3/5 sm:h-10 bg-slate-200"></div>
          <div className="w-1/6 h-20 sm:w-3/5 sm:h-10 bg-slate-200"></div>
          <div className="w-1/6 h-20 sm:w-3/5 sm:h-10 bg-slate-200"></div>
          <div className="w-1/6 h-20 sm:w-3/5 sm:h-10 bg-slate-200"></div>
          <div className="w-1/6 h-20 sm:w-3/5 sm:h-10 bg-slate-200"></div>
        </div>

        <div className="relative grid grid-cols-10 text-sm w-96 h-96">
          <div className="absolute right-0 grid grid-cols-10 text-center -top-6 w-96">
            {coordsY.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <div className="absolute top-0 grid items-center text-right -left-4 h-96 grid-rows-10">
            {coordsX.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          {coordsY.map((coordY) => (
            <div coord={coordY} key={coordY} className="grid grid-rows-10">
              {coordsX.map((coordX) => (
                <div
                  key={coordX + coordY}
                  // isFilled={false} //turn true when user place ships on cells//
                  coord={coordX + coordY}
                  draggable
                  className="border-[0.5px] bg-slate-100"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlacingComponent;
