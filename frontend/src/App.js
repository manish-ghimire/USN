import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import User from './pages/User/User'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Login} />
          <Route path='/user/:id' component={User} />
          <Route path='/error' component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
