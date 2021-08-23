import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserDetails from "./components/attemptquiz/UserDetails";
import AttemptQuestions from "./components/attemptquiz/AttemptQuestions";
import ShowResults from "./components/attemptquiz/ShowResults";

import CreateQuizUser from "./components/createquiz/CreateQuiz_User";
import ChooseTopic from "./components/createquiz/ChooseTopic";
import AddQuestions from "./components/createquiz/AddQuestions";
import Congrats from "./components/createquiz/Congrats_for_creating";

import { AppProvider } from "./context/Context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreateQuizProvider } from "./context/create_quiz_context";
import Errorpage from "./components/subcomponents/Errorpage";
import SubmitQuiz from "./components/createquiz/SubmitQuiz";

function App() {
  return (
    <AppProvider>
      <CreateQuizProvider>
        <Router>
          <div className="App">
            <Navbar></Navbar>

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/userdetails/:topicoption">
                <UserDetails />
              </Route>
              <Route path="/attemptquestions">
                <AttemptQuestions />
              </Route>
              <Route path="/showresults">
                <ShowResults />
              </Route>
              <Route exact path="/createquiz">
                <CreateQuizUser />
              </Route>
              <Route exact path="/createquiz/choosetopic">
                <ChooseTopic />
              </Route>
              <Route exact path="/createquiz/chosentopic/:chosentopic">
                <AddQuestions />
              </Route>
              <Route path="/createquiz/submit">
                <SubmitQuiz />
              </Route>
              <Route path="/createquiz/congrats">
                <Congrats />
              </Route>

              <Route path="*">
                <Errorpage />
              </Route>
            </Switch>
          </div>
        </Router>
      </CreateQuizProvider>
    </AppProvider>
  );
}

export default App;
