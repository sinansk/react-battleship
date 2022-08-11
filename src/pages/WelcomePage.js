import { useEffect } from "react";
import NameComponent from "../components/NameComponent";
import { useDispatch } from "react-redux";
import { reset } from "../redux/gameRedux";

const WelcomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <NameComponent />
    </div>
  );
};

export default WelcomePage;
