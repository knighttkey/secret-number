import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SecretContainer from './components/SecretContainer'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SecretContainer></SecretContainer>
    </div>
  )
}

export default App
