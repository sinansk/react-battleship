const NameComponent = () => {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">PLEASE ENTER YOUR NAMES!</h2>

      <div className="flex flex-col items-center justify-center text-2xl border-2 rounded-md w-96 bg-slate-100 h-96">
        <div className="flex flex-col m-10">
          <label htmlFor="player1">Player 1</label>
          <input type="text" id="player1" placeholder="John Doe"></input>
        </div>
        <div className="flex flex-col m-10">
          <label htmlFor="player2">Player 2</label>
          <input type="text" id="player2" placeholder="Don Joe"></input>
        </div>
      </div>
    </>
  );
};

export default NameComponent;
