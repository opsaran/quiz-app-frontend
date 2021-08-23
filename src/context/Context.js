import React, { useReducer, useState } from "react";

//reducer for storing data of randomquiz
const randomquizreducer = (randomquiz, action) => {
  if (action.type === "Addrandomquiz") {
    return {
      ...randomquiz,
      creator: action.payload.creator,
      topic: action.payload.topic,
      questions: [
        ...randomquiz.questions,
        ...action.payload.questions.map((ques) => {
          return ques;
        }),
      ],
    };
  } else if (action.type === "DELETE") {
    return {
      ...randomquiz,
      creator: "",
      topic: "",
      questions: [],
    };
  }
};
//reducer for new user data
const userReducer = (user, action) => {
  switch (action.type) {
    case "ADD_TOPIC":
      return { ...user, topic: action.payload.topic };
    case "ADD_NAME":
      return { ...user, name: action.payload.name };
    case "ADD_DATA":
      return {
        ...user,
        corrects: action.payload.corrects,
        outof: action.payload.outof,
        percentagescore: action.payload.percentagescore,
      };
    case "DELETE_ALL":
      return {
        ...user,
        name: "",
        corrects: 0,
        outof: 0,
        percentagescore: 0,
      };
    default:
      return user;
  }
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, {
    topic: "",
    name: "",
    corrects: 0,
    outof: 0,
    percentagescore: 0,
  });
  const [isuserentered, setIsuserentered] = useState(false);

  const [randomquiz, dispatch] = useReducer(randomquizreducer, {
    creator: "",
    topic: "",
    questions: [],
  });
  const [index, setIndex] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [showresults, setShowresults] = useState(false);
  const [endofquiz, setEndofquiz] = useState(false);

  //attemptquestions.js eventhandler
  const handleanswer = (e, answerindex) => {
    e.preventDefault();
    if (answerindex === randomquiz.questions[index].correctanswerid) {
      setCorrects(corrects + 1);
    }

    const newIndex = index + 1;
    if (newIndex < randomquiz.questions.length) {
      setIndex(newIndex);
    } else {
      setEndofquiz(true);
      setShowresults(true);
    }
  };

  const handlehomeredirect = () => {
    dispatch({ type: "DELETE" });
    setShowresults(false);
    setEndofquiz(false);
    setCorrects(0);
    setIndex(0);
    dispatchUser({ type: "DELETE_ALL" });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        dispatchUser,
        index,
        setIndex,
        corrects,
        setCorrects,
        handleanswer,

        showresults,
        setShowresults,
        setIsuserentered,
        isuserentered,

        randomquiz,
        dispatch,
        handlehomeredirect,

        endofquiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };

export { AppContext, AppProvider };
