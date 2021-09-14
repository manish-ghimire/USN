import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register/Register'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/register' component={Register} />
          {/* <Route path='/login' component={} /> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
