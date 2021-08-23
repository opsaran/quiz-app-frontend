import "./ShowResults.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../../context/Context";
import axios from "axios";
function ShowResults(props) {
  // const { state } = useLocation();
  // const { yourname, topicoption } = state;
  const history = useHistory();
  const yourname = history.location.state[0];
  const topicoption = history.location.state[1];

  const { showresults, corrects, randomquiz, handlehomeredirect, user } =
    useContext(AppContext);

  const percentagescore = (corrects / randomquiz.questions.length) * 100;

  useEffect(() => {
    axios
      .post("/api/creators/newuser", { userdata: user })
      .then(() => {
        alert("data uploaded successfully");
      })
      .catch((err) => {
        alert("failed to upload");
        return console.log(err);
      });
  }, [user]);
  const [usersample, setUsersample] = useState([]);
  useEffect(() => {
    axios
      .get("/api/creators/usersample")
      .then((data) => {
        setUsersample((usersample) => [...usersample, ...data.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {showresults ? (
        <div className="showresults">
          <div>
            <h3>Congrats! {yourname}</h3>
            <p>
              You Answered {percentagescore}% of questions correctly in a{" "}
              {topicoption} Quiz
            </p>

            <div>
              <progress
                value={percentagescore}
                max="100"
                className="my-progress"
              >
                {percentagescore}
              </progress>
              <p>
                {corrects} out of {randomquiz.questions.length}
              </p>
            </div>
          </div>
          <h3>For Comparison:</h3>
          {usersample.map((sample) => {
            return (
              <div key={sample._id} className="sample-results">
                <label>{sample.name}</label>
                <progress
                  value={sample.percentagescore}
                  max="100"
                  className="user-progress"
                >
                  {sample.percentagescore}
                </progress>
                <label>{sample.percentagescore}%</label>
                <p>
                  <span>{sample.corrects}</span> out of{" "}
                  <span>{sample.outof}</span> in a {sample.topic} quiz
                </p>
              </div>
            );
          })}

          <div className="showresults-buttons">
            <button onClick={handlehomeredirect}>
              <Link to="/">Home</Link>
            </button>
            <button onClick={handlehomeredirect}>
              <Link to="/createquiz">Create Quiz</Link>
            </button>
          </div>
        </div>
      ) : (
        <Redirect from="/showresults" to={{ pathname: "/" }} />
      )}
    </>
  );
}

export default ShowResults;
