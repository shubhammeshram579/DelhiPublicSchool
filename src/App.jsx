import { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import './App.css'
import RegistrationForm from './Components/Pages/RegistrationForm'
import FillDetails from './Components/Pages/FillDetails'
import PaymentPage from './Components/Pages/PaymentPage'
import SuccessPage from './Components/Pages/SuccessPage'
import MemberDashboard from './Components/Pages/MemberDashboard'

function App() {

  return (
    <>
 
      <BrowserRouter>
      <nav className='flex items-center justify-between '>
        <div>
          <img src="https://seeklogo.com/images/D/delhi-public-school-logo-E8BDE7B79B-seeklogo.com.png" alt="" className='h-20' />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Link to="/MemberDashboard" className='text-lg'>Dashboard</Link>
          <Link to="/FillDetails" className='text-lg'>Fill</Link>
          <Link to="/PaymentPage" className='text-lg'>Payment</Link>
           <Link to="/" className='text-lg'>login</Link>
        </div>
      </nav>

      <Routes>

        <Route path='/' element={ <RegistrationForm />} />
        <Route path='/MemberDashboard' element={ <MemberDashboard />} />
        <Route path='/FillDetails' element={ <FillDetails />} />
        <Route path='/PaymentPage' element={ <PaymentPage />} />
        <Route path='/SuccessPage' element={ <SuccessPage />} />

      </Routes>

      </BrowserRouter>
  
    </>
  )
}

export default App
