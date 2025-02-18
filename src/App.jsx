import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="content" >
          <h1>Master New Skills,<br /> One Quiz at a Time!</h1>
        </div>
      </>
    </BrowserRouter>

  )
}

export default App
