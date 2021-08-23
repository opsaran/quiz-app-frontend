import React, { useReducer, useState } from "react";

const CreateQuizContext = React.createContext();

//reducer function
const myreducer1 = (userquiz, action) => {
  switch (action.type) {
    case "adduser":
      return { ...userquiz, creator: action.payload.creator };
    case "addtopic":
      return { ...userquiz, topic: action.payload.topic };
    case "addquestions":
      return {
        ...userquiz,
        questions: [
          ...userquiz.questions,
          {
            question: action.payload.question,
            q_id: action.payload.q_id,
            correctanswerid: action.payload.correctanswerid,
            options: [
              { option: action.payload.option1 },
              { option: action.payload.option2 },
              { option: action.payload.option3 },
              { option: action.payload.option4 },
            ],
          },
        ],
      };
    default:
      return userquiz;
  }
};

const CreateQuizProvider = ({ children }) => {
  //useReduce hook
  const [userquiz, dispatch] = useReducer(myreducer1, {
    creator: "",
    topic: "",
    questions: [
      // {
      //   question: "",
      //   q_id: Number,
      //   correctanswerid: Number,
      //   options: [
      //     { option1: "" },
      //     { option2: "" },
      //     { option3: "" },
      //     { option4: "" },
      //   ],
      // },
    ],
  });

  //Username for creating quiz
  const [username, setUsername] = useState("");
  const [isusername, setIsusername] = useState(false);
  const submitusername = (e) => {
    e.preventDefault();
    setIsusername(true);
    dispatch({ type: "adduser", payload: { creator: username } });
  };

  //for addquestion
  const [qindex, setQindex] = useState(0);
  const [qtext, setQtext] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctanswercheck, setCorrectanswercheck] = useState("");
  const qinduxx = qindex + 1;

  const handleradiochange = (e) => {
    setCorrectanswercheck(e.target.value);
  };
  //for correctanswerid
  const correctanswerid = correctanswercheck
    ? qinduxx * 10 + Number(correctanswercheck)
    : null;
  const questionsubmithandler = () => {
    if (
      username &&
      qtext &&
      correctanswerid &&
      option1 &&
      option2 &&
      option3 &&
      option4
    ) {
      setQindex((oldindex) => oldindex + 1);

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

      setQtext("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectanswercheck("");
    } else {
      alert("Please fill all the fields and choose a correct answer!");
    }
  };

  const [ispostingloaded, setIspostingloaded] = useState(false);
  const [postingerror, setPostingerror] = useState("");
  const [isquizfinished, setIsquizfinished] = useState(false);
  const handlecreatequizredirect = () => {
    setQtext("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectanswercheck("");
    setQindex(0);
    setUsername("");
  };

  return (
    <CreateQuizContext.Provider
      value={{
        username,
        setUsername,
        isusername,
        setIsusername,
        submitusername,

        qindex,
        qtext,
        option1,
        option2,
        option3,
        option4,
        setQindex,
        setQtext,
        setOption1,
        setOption2,
        setOption3,
        setOption4,
        questionsubmithandler,
        dispatch,
        handleradiochange,
        correctanswercheck,
        setCorrectanswercheck,
        setIspostingloaded,
        userquiz,
        ispostingloaded,
        postingerror,
        setPostingerror,
        isquizfinished,
        setIsquizfinished,
        handlecreatequizredirect,
      }}
    >
      {children}
    </CreateQuizContext.Provider>
  );
};

export { CreateQuizContext, CreateQuizProvider };
