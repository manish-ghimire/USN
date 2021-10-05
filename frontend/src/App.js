import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import UserProfile from './pages/UserProfile/UserProfile'
import UniProfile from './pages/UniProfile/UniProfile'
import Club from './pages/Club/Club'
import StudyGroup from './pages/StudyGroup/StudyGroup'
import Market from './pages/Market/Market'
import Settings from './pages/Settings/Settings'
import Messenger from './pages/Messenger/Messenger'

import {
  Alert,
  Backdrop,
  CircularProgress,
  createTheme,
  Snackbar,
} from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import Home from './pages/Home/Home'

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
  const [circle, setCircle] = useState(false)
  const [snackbar, setSnackbar] = useState({
    show: false,
    severity: 'error',
    text: 'helloo',
  })

  return (
    <div className='App'>
      <ThemeProvider theme={custom_theme} className='container'>
        <Router>
          <Switch>
            <Route
              exact
              path='/login'
              component={() => (
                <Login
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/register'
              component={() => (
                <Register
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route exact path='/' component={() => <Home />} />
            <Route
              exact
              path='/user/:userID'
              component={() => (
                <UserProfile
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/uni/:uniID'
              component={() => (
                <UniProfile
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/club/:clubID'
              component={() => (
                <Club
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/studygroup/:studygroupID'
              component={() => (
                <StudyGroup
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/market'
              component={() => (
                <Market
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route
              exact
              path='/market/:itemID'
              component={() => (
                <Market
                  setCircle={(value) => setCircle(value)}
                  setSnackbar={(value) => setSnackbar(value)}
                />
              )}
            />
            <Route exact path='/messenger' component={() => (
              <Messenger
                setCircle={(value) => setCircle(value)}
                setSnackbar={(value) => setSnackbar(value)}
                />
              )}
             />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/error' component={Error} />
          </Switch>
        </Router>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={circle}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbar.show}
        autoHideDuration={5000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
