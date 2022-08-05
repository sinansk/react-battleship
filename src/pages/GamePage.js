import PlacingComponent from "../components/PlacingComponent";

const GamePage = () => {
  const activeUser = "ACTIVE USER";
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h2 className="mb-10 text-2xl font-bold">YOUR TURN, {activeUser} </h2>
      <PlacingComponent />
    </div>
  );
};

export default GamePage;
