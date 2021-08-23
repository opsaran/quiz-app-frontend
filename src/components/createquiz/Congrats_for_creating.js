import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CreateQuizContext } from "../../context/create_quiz_context";
import Loadinganimation from "../subcomponents/Loadinganimation";
import Errorpage from "../subcomponents/Errorpage";
function Congrats() {
  const { ispostingloaded, postingerror, username } =
    useContext(CreateQuizContext);

  const history = useHistory();

  const goinghomehandler = () => {
    history.push("/");
  };
  const createanotherhandler = () => {
    history.push("/createquiz");
  };

  return (
    <>
      {!ispostingloaded ? (
        <Loadinganimation />
      ) : (
        <div>
          {postingerror ? (
            <Errorpage />
          ) : (
            <div className="created-congrats">
              <h2>Congratulation {username} for creating a quiz!</h2>
              <button className="small-button" onClick={goinghomehandler}>
                Home
              </button>
              <button className="small-button" onClick={createanotherhandler}>
                Create another quiz
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Congrats;
