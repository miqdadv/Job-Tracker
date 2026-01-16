import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { data } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar/>
      <Header/>
      <Categories/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home


//1.feed data
//2. clickable to apply job
//3. applied jobs viibile in profile section
