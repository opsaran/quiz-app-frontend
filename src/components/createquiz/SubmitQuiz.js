import axios from "../axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { CreateQuizContext } from "../../context/create_quiz_context";

function SubmitQuiz() {
  const {
    userquiz,
    setIspostingloaded,
    setPostingerror,
    isquizfinished,
    setIsquizfinished,
  } = useContext(CreateQuizContext);
  const history = useHistory();
  const quizsubmithandler = () => {
    axios
      .post(`/api/creators/`, {
        userquiz: userquiz,
      })
      .then((data) => {
        setIspostingloaded(true);
        history.push({ pathname: "/createquiz/congrats" });
      })
      .catch((error) => {
        setIspostingloaded(true);
        setPostingerror({ error });
        console.log(error);
      });
    setIsquizfinished(false);
    history.push("/createquiz/congrats");
  };
  return (
    <>
      {isquizfinished ? (
        <div className="submitquiz">
          <button className="small-button" onClick={quizsubmithandler}>
            Submit quiz
          </button>
        </div>
      ) : (
        <Redirect to="/createquiz" />
      )}
    </>
  );
}

export default SubmitQuiz;
