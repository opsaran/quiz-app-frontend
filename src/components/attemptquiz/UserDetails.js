import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import axios from "axios";
import { AppContext } from "../../context/Context";

function UserDetails() {
  const history = useHistory();
  const { topicoption } = useParams();

  const {
    setIsuserentered,
    dispatch,
    setCorrects,
    setIndex,
    setShowresults,
    dispatchUser,
  } = useContext(AppContext);

  const [yourname, setYourname] = useState("");

  const handleclick = (e) => {
    e.preventDefault();
    setIsuserentered(true);
    dispatch({ type: "DELETE" });
    dispatchUser({ type: "ADD_NAME", payload: { name: yourname } });
    setCorrects(0);
    setIndex(0);
    setShowresults(false);
    history.push({
      pathname: "/attemptquestions",
      state: [topicoption, yourname],
    });
  };

  return (
    <div className="attemptquiz-userdetail">
      <h2>Enter your Name:</h2>
      <form onSubmit={handleclick}>
        <div className="input-wrapper">
          <input
            className="input"
            type="text"
            required
            onChange={(e) => setYourname(e.target.value)}
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

export default UserDetails;
