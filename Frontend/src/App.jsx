import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './components/components_lite/Navbar'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/components_lite/Home'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import Description from './components/components_lite/Description'
import Dashboard from './components/tracker/Dashboard'
import RecruiterDashboard from './components/recruiter/RecruiterDashboard'


const appRouter = createBrowserRouter([
  {path: '/', element: <Home />},
  {path:'/login', element: <Login />},
  {path:'/register', element: <Register />},
  {path:'/jobs',element:<Jobs/>},
  {path:'/home',element:<Home/>},
  {path:'/browse',element:<Browse/>},
  {path:'/profile',element:<Profile/>},
  {path:'/description/:id',element:<Description/>},
  {path:'/tracker',element:<Dashboard/>},
  {path:'/recruiter/dashboard',element:<RecruiterDashboard/>}
])
const App = () => {
  return (
     <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App
