import React from 'react'
import Navbar from './components/navbar'
import { useLocation } from 'react-router-dom'

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")

  return (
    <div>
      {!isOwnerPath && <Navbar/>}
      <div className='min-h-[70vh'>
      
      </div>
    </div>
  )
}

export default App