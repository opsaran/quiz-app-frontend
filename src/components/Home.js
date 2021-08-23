import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/Context";
// function
function Home() {
  const { dispatchUser } = useContext(AppContext);

  let history = useHistory();
  let [Quiz1count, setQuiz1count] = useState(0);
  let [Quiz2count, setQuiz2count] = useState(0);
  let [Quiz3count, setQuiz3count] = useState(0);
  let [Quiz4count, setQuiz4count] = useState(0);

  const fetchtopics = useCallback(() => {
    return axios
      .get(`/api/creators/topics/`)
      .then((data) => {
        return data.data.data.map((entry) => {
          switch (entry.topic) {
            case "programming":
              return setQuiz1count(entry.topiccount);
            case "sports":
              return setQuiz2count(entry.topiccount);
            case "science":
              return setQuiz3count(entry.topiccount);
            case "history":
              return setQuiz4count(entry.topiccount);
            default:
              throw new Error();
          }
        });
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);
  useEffect(() => {
    fetchtopics();
  }, [fetchtopics]);

  let topicoption;
  const handleClick1 = (e) => {
    topicoption = "programming";
    dispatchUser({ type: "ADD_TOPIC", payload: { topic: topicoption } });
    history.push({
      pathname: `/userdetails/${topicoption}`,
    });
  };
  const handleClick2 = (e) => {
    topicoption = "sports";
    dispatchUser({ type: "ADD_TOPIC", payload: { topic: topicoption } });
    history.push({
      pathname: `/userdetails/${topicoption}`,
    });
  };
  const handleClick3 = () => {
    topicoption = "science";
    dispatchUser({ type: "ADD_TOPIC", payload: { topic: topicoption } });
    history.push({
      pathname: `/userdetails/${topicoption}`,
    });
  };
  const handleClick4 = () => {
    topicoption = "history";
    dispatchUser({ type: "ADD_TOPIC", payload: { topic: topicoption } });
    history.push({
      pathname: `/userdetails/${topicoption}`,
    });
  };
  return (
    <div className="select-topic-home">
      <h2>Select a Quiz topic:</h2>
      <div>
        <button className="btn1" onClick={handleClick1}>
          <h3>Programming</h3>
          <small> {Quiz1count} Quizzes</small>
        </button>
        <button className="btn2" onClick={handleClick2}>
          <h3>Sports</h3>
          <small>{Quiz2count} Quizzes</small>
        </button>
        <button className="btn3" onClick={handleClick3}>
          <h3>Science</h3>
          <small> {Quiz3count} Quizzes</small>
        </button>
        <button className="btn4" onClick={handleClick4}>
          <h3>History</h3>
          <small> {Quiz4count} Quizzes</small>
        </button>
      </div>
    </div>
  );
}

export default Home;
