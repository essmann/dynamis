import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router";
import { router } from './routes';

function App() {

  const [count, setCount] = useState(0)

  return (

    <RouterProvider router={router} />
  )
}

export default App
