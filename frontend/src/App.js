import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import User from './pages/User/User'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#A4E5E0',
    },
  },
})

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/register' component={Register} />
            <Route exact path='/' component={Login} />
            <Route path='/user/:id' component={User} />
            <Route path='/error' component={Error} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
