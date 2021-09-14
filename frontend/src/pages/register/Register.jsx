// import "./register.css"; --> import css file
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault()
if (passwordConfirm.current.value !== password.current.value){
  passwordConfirm.current.setCustomValidity("Passwords are not the same!");
}else{
  const user = {
    username: username.current.value,
    email: email.current.value,
    password: password.current.value,
  }


  try {
  await axios.post("/auth/register", user);
  history.push("/login");
}
catch (err){
  console.log(err);
}
}
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">University Student Network</h3>
          <span className="loginDesc">
            Join us!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} type="email" className="loginInput" />
            <input placeholder="Password" required ref={password} type="password" min-length="6" className="loginInput" />
            <input placeholder="Confirm Password" required ref={passwordConfirm} type="password" min-length="6" className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login" style={{textAlign:"center"}}>
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
