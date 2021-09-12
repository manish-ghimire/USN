import './App.css'
import {Button} from './components/Button'
import "./components/button.css";

function btnlogin(){
  console.log("Login");
}

function btnregister(){
  console.log("register");
}

function App() {
  return <div className='App'>
    <Button className="tiffbutton" onClick={btnlogin} >Login to USN</Button>
    <Button className="bluebutton" onClick={btnregister} >Register</Button>
  </div>

}

export default App
