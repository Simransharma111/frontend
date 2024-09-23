import React from 'react'
import Navbar from '../components/Navbar'
// import Main from '../components/Main'
import Main from '../components/Main';
import RoomCard from '../components/RoomCard';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <Navbar/>
    <Main/>
  <RoomCard/>
  <Footer/>
    </>
  )
}

export default Home
