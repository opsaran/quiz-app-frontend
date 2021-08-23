import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { AppContext } from "../../context/Context";
import { CreateQuizContext } from "../../context/create_quiz_context";
function ChooseTopic() {
  const { dispatch, userquiz } = useContext(CreateQuizContext);

  const history = useHistory();

  //handleclicks
  const handletopic = (topic) => {
    if (userquiz.creator) {
      dispatch({
        type: "addtopic",
        payload: { topic: topic },
      });
      history.push(`/createquiz/chosentopic/${topic}`);
    } else {
      history.push("/createquiz");
    }
  };

  return (
    <div className="select-topic-home">
      <h2>Choose a quiz catagory:</h2>
      <div>
        <button
          className="btn1"
          type="button"
          onClick={() => handletopic("programming")}
        >
          <h3>Programming</h3>
        </button>
        <button
          className="btn2"
          type="button"
          value="sports"
          onClick={() => handletopic("sports")}
        >
          <h3>Sports</h3>
        </button>
        <button
          className="btn3"
          type="button"
          value="science"
          onClick={() => handletopic("science")}
        >
          <h3>Science</h3>
        </button>
        <button
          className="btn4"
          type="button"
          value="history"
          onClick={() => handletopic("history")}
        >
          <h3>History</h3>
        </button>
      </div>
    </div>
  );
}

export default ChooseTopic;
