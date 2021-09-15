import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Wall from './pages/Homepage/Wall'
import Error from './pages/Error/Error'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          <Route exact path='/' component={Login} />
          <Route path='/' component={Wall} />
          <Route path='/error' component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
