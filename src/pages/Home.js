import NameComponent from "../components/NameComponent";
import StepButton from "../components/StepButton";
import PlacingComponent from "../components/PlacingComponent";
import { useEffect, useState } from "react";
const Home = () => {
  const [startingStep, setStartingStep] = useState(0);
  //setting page steps for rendering users special components and setting activeUser //

  const [activeUser, setActiveUser] = useState("");
  //setting activeUser for placing ships on board//
  const handleStep = (e) => {
    e.preventDefault();
    if (startingStep === 0 || startingStep === 2) {
      setActiveUser("Player-1");
    }
    if (startingStep === 1 || startingStep === 3) {
      setActiveUser("Player-2");
    }
    if (e.target.name === "next" && startingStep >= 0 && startingStep < 3) {
      setStartingStep((prev) => prev + 1);
    } else if (e.target.name === "back" && startingStep > 0) {
      setStartingStep((prev) => prev - 1);
    }
    if (e.target.name === "next" && setStartingStep === 3) {
    }
  };

  useEffect(() => {
    console.log(startingStep);
  }, [startingStep]);

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      {startingStep === 0 && <NameComponent />}
      {startingStep === 1 && <PlacingComponent />}
      <div className="flex gap-2" onClick={handleStep}>
        {startingStep > 0 && <StepButton name="back" />}
        <StepButton
          name={startingStep === 2 ? `play` : `next`}
          onClick={handleStep}
        />
      </div>
    </div>
  );
};

export default Home;
