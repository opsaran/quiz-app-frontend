import React, { useContext, useEffect } from "react";

import { Redirect } from "react-router-dom";
// import { AppContext } from "../../context/Context";
import { CreateQuizContext } from "../../context/create_quiz_context";

function CreateQuizUser() {
  const { setUsername, isusername, setIsusername, submitusername } =
    useContext(CreateQuizContext);

  useEffect(() => {
    setIsusername(false);
    return () => {};
  });
  if (isusername) {
    return <Redirect to={"/createquiz/choosetopic"} />;
  }

  return (
    <div className="createquiz-user">
      <h2>What's your name?</h2>
      <form onSubmit={submitusername}>
        <div className="input-wrapper">
          <input
            className="input"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="input-label">
            <span className="input-label-span">Username</span>
          </label>
        </div>
        <button className="small-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateQuizUser;
