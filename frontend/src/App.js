import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import User from './pages/User/User'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'


const custom_theme = createTheme({
  palette: {
    primary: {
      main: '#0C6170', //'#37BEB0',
    },
    secondary: {
      main: '#37BEB0', //'#0C6170',
    },
  },
})

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={custom_theme}>
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
