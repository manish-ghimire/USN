import './App.css';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  return (
      <Router>
        <Switch>
        // testing reg
        <Route exact path="/" >{<Register />}</Route>
          <Route path="/login">{<Login />}</Route>
          <Route path="/register">{<Register />}</Route>
        </Switch>
      </Router>
    );
  }

export default App
