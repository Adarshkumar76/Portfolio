import React from 'react'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'
import Main from '../Component/Main/Main'
import Work from '../Component/Work/Work'
import Lang from '../Component/lang/lang'

function Home() {
  return (
    <>
      <Header/>
      <Main/>
      <Work/>
      <Lang/>
      <Footer/>
    </>
  )
}

export default Home