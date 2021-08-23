import "./AddQuestions.css";

import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../../context/Context";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { CreateQuizContext } from "../../context/create_quiz_context";

function AddQuestions() {
  const { chosentopic } = useParams();
  const history = useHistory();
  const {
    username,
    qindex,
    qtext,
    option1,
    option2,
    option3,
    option4,
    setQtext,
    setOption1,
    setOption2,
    setOption3,
    setOption4,
    questionsubmithandler,
    handleradiochange,
    correctanswercheck,
    setCorrectanswercheck,
    dispatch,

    userquiz,
    setIsquizfinished,
  } = useContext(CreateQuizContext);
  const qinduxx = qindex + 1;

  const correctanswerid = correctanswercheck
    ? qinduxx * 10 + Number(correctanswercheck)
    : null;

  // const rightpath = `/createquiz/chosentopic/${chosentopic}`;

  const finishquizhandler = () => {
    if (
      username &&
      qtext &&
      correctanswerid &&
      option1 &&
      option2 &&
      option3 &&
      option4
    ) {
      dispatch({
        type: "addquestions",
        payload: {
          question: qtext,
          q_id: qinduxx,
          correctanswerid: correctanswerid,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
        },
      });

      history.push("/createquiz/submit");

      setQtext("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectanswercheck("");
      setIsquizfinished(true);
    } else {
      alert("Please fill all the fields and choose a correct answer!");
    }
  };

  return (
    <>
      {" "}
      {!userquiz.creator && !userquiz.topic ? (
        <Redirect to="/createquiz" />
      ) : (
        <div className="addquestions">
          <div className="addquestions-top-wrapper">
            <h3>
              {chosentopic} quiz by {username}
            </h3>
            <button onClick={() => history.push("/")}>Cancel</button>
          </div>
          <div className="textarea-wrapper">
            <label>Question:{qindex + 1}</label>
            <textarea
              cols="20"
              rows="1"
              value={qtext}
              required
              onChange={(e) => setQtext(e.target.value)}
              className="textarea-input"
            ></textarea>
          </div>
          <div>
            <div className="addoption-wrapper">
              <div className="input-wrapper">
                <input
                  className="input"
                  type="text"
                  value={option1}
                  required
                  onChange={(e) => setOption1(e.target.value)}
                />
                <label className="input-label">
                  <span className="input-label-span">option:1</span>
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  className="radio-input"
                  id="radio1"
                  type="radio"
                  value="1"
                  checked={correctanswercheck === "1"}
                  onChange={handleradiochange}
                />
                <label htmlFor="radio1">
                  <span></span>
                </label>
              </div>
            </div>
            <div className="addoption-wrapper">
              <div className="input-wrapper">
                <input
                  className="input"
                  type="text"
                  value={option2}
                  required
                  onChange={(e) => setOption2(e.target.value)}
                />
                <label className="input-label">
                  <span className="input-label-span">option:2</span>
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  className="radio-input"
                  id="radio2"
                  type="radio"
                  value="2"
                  checked={correctanswercheck === "2"}
                  onChange={handleradiochange}
                />
                <label htmlFor="radio2">
                  <span></span>
                </label>
              </div>
            </div>
            <div className="addoption-wrapper">
              <div className="input-wrapper">
                <input
                  className="input"
                  type="text"
                  value={option3}
                  required
                  onChange={(e) => setOption3(e.target.value)}
                />
                <label className="input-label">
                  <span className="input-label-span">option:3</span>
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  className="radio-input"
                  id="radio3"
                  type="radio"
                  value="3"
                  checked={correctanswercheck === "3"}
                  onChange={handleradiochange}
                />
                <label htmlFor="radio3">
                  <span></span>
                </label>
              </div>
            </div>
            <div className="addoption-wrapper">
              <div className="input-wrapper">
                <input
                  className="input"
                  type="text"
                  value={option4}
                  required
                  onChange={(e) => setOption4(e.target.value)}
                />
                <label className="input-label">
                  <span className="input-label-span">option:4</span>
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  className="radio-input"
                  id="radio4"
                  type="radio"
                  value="4"
                  checked={correctanswercheck === "4"}
                  onChange={handleradiochange}
                />
                <label htmlFor="radio4">
                  <span></span>
                </label>
              </div>
            </div>
          </div>
          <div className="addquestions-buttons">
            <button className="small-button" onClick={finishquizhandler}>
              Submit Quiz
            </button>
            <button className="small-button" onClick={questionsubmithandler}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddQuestions;
