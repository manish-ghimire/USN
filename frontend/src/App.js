import './App.css'
import Button from './components/Button'

function App() {
  const funcMeaw = () => {
    console.log('console logging')
  }

  return (
    <div className='App'>
      <Button onClick={funcMeaw}>Meaw Meaw Runqing</Button>
    </div>
  )
}

export default App
