import './App.css'
import Button from './components/Button'
import FillBoxHead from './components/FillBoxHead/FillBoxHead'
import { useState } from 'react'


function App() {
  
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')

  const login = ()=> {
    //console.log(username);
    //console.log(password);
    //pass to nathan
  }

  return (
    <div className='App'>
      <Button onClick={login}>Login</Button>
      <FillBoxHead textHead='Name' userEntry={setUserName}></FillBoxHead><br/>
      <FillBoxHead type ='password' textHead="Name" userEntry={setPassWord}></FillBoxHead>
    </div>
  )

}

export default App
