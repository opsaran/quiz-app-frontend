import "./AttemptQuestions.css";
import Loadinganimation from "../subcomponents/Loadinganimation";
import { useEffect, useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../../context/Context";
import axios from "axios";
import Errorpage from "../subcomponents/Errorpage";

function AttemptQuestions() {
  const {
    index,
    corrects,
    handleanswer,
    isuserentered,
    dispatch,
    randomquiz,
    endofquiz,
    user,
    dispatchUser,
  } = useContext(AppContext);
  const [isloading, setIsloading] = useState(true);
  const history = useHistory();
  const topicoption = history.location.state[0];
  //capitalizing first letter, haha. It could have been done using CSS but whatever
  function capitalizeFirstLetter(String) {
    return String.charAt(0).toUpperCase() + String.slice(1);
  }
  const modifiedtopic = capitalizeFirstLetter(topicoption);
  // const yourname = history.location.state[1];

  const [randomquizerror, setRandomquizerror] = useState("");
  //fetching random quiz
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/creators/randomquiz/${topicoption}`
      )
      .then((response) => {
        dispatch({
          type: "Addrandomquiz",
          payload: response.data.data[0],
        });

        return;
      })
      .catch((err) => {
        setRandomquizerror("Error occured while fetching the data");
        console.log("ohh there is an error:", err);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [dispatch, topicoption]);

  const induxx = index + 1;

  const handlefinishquiz = () => {
    dispatchUser({
      type: "ADD_DATA",
      payload: {
        corrects: corrects,
        percentagescore: (corrects / randomquiz.questions.length) * 100,
        outof: randomquiz.questions.length,
      },
    });

    history.push({
      pathname: "/showresults",
      state: [user.name, user.topic],
    });
  };

  // const paginateRef = useRef(null);
  // console.log(paginateRef.current);
  // // useEffect(() => {
  // //   console.log(paginateRef.attributes);
  // // }, []);

  return (
    <>
      {isuserentered ? (
        isloading ? (
          <Loadinganimation />
        ) : randomquizerror ? (
          <Errorpage />
        ) : endofquiz ? (
          <div className="attemptquiz-end">
            <h2>End of quiz</h2>
            <button onClick={handlefinishquiz}>Finish</button>
          </div>
        ) : (
          <div className="attemptquiz">
            <div>
              <div className="attemptquiz-top">
                <h2>{modifiedtopic} Quiz</h2>
                <div>
                  <p>
                    © <strong>{randomquiz.creator}</strong>
                  </p>

                  <p>
                    Correct answers:{" "}
                    <span>
                      {corrects}/{randomquiz.questions.length}
                    </span>
                  </p>
                </div>
              </div>
              <h2>
                Q:{induxx} {randomquiz.questions[index].question}
              </h2>
              {/* button container =>*/}
              <div className="attemptquiz-options">
                {randomquiz.questions[index].options.map(
                  (option, optionindex) => {
                    return (
                      <button
                        key={optionindex}
                        onClick={(e) =>
                          handleanswer(e, induxx * 10 + optionindex + 1)
                        }
                      >
                        {option.option}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            <div className="attemptquiz-pagination">
              {randomquiz.questions.map((que, queindex) => {
                return (
                  <button
                    className={queindex === index ? "active" : null}
                    key={queindex}
                  >
                    {queindex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <Redirect from="/attemptquestions" to="/" />
      )}
    </>
  );
}

export default AttemptQuestions;
