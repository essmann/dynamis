import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='app-container flex flex-col-reverse md:flex-row lg:flex-row h-screen w-screen overflow-hidden'>
      <Sidebar style='bg-background-surface lg:flex-1' />
      <div className='main lg:flex-7'>
        main
      </div>
    </div>
  )
}

export default App
