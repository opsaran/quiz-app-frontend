import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";
import { CreateQuizContext } from "../context/create_quiz_context";
function Navbar() {
  const { handlehomeredirect } = useContext(AppContext);
  const { handlecreatequizredirect } = useContext(CreateQuizContext);
  return (
    <nav>
      <h2>
        <Link to="/" onClick={handlehomeredirect}>
          QUIZ APP
        </Link>
      </h2>

      <h3>
        <Link to="/createquiz" onClick={handlecreatequizredirect}>
          Create a Quiz
        </Link>
      </h3>
    </nav>
  );
}

export default Navbar;
