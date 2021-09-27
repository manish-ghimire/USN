import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import UserProfile from './pages/User/UserProfile'
import {
  Alert,
  Backdrop,
  CircularProgress,
  createTheme,
  Snackbar,
} from '@mui/material'
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
  const [circle, setCircle] = useState(false)
  const [snackbar, setSnackbar] = useState({
    show: false,
    severity: 'error',
    text: 'helloo',
  })

  return (
    <div className='App'>
      <ThemeProvider theme={custom_theme}>
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
            <Route exact path='/' component={UserProfile} />
            <Route exact path='/user/:userID' component={UserProfile} />
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
        autoHideDuration={10000}
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
