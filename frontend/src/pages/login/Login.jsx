// import "./login.css"; --> import css file
import { useContext, useRef } from "react";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username.current.value);
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">University Student Network</h3>
          <span className="loginDesc">
            Welcome to USN
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Username or Email" required type="text" className="loginInput" ref={username} />
            <input placeholder="Password" required type="password" className="loginInput" ref={password} />
            <button className="loginButton">{ "Log In"}</button>
             <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" style={{textAlign:"center"}}>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
