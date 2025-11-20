// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './NotFoundPage.jsx'
import LoginPage from './LoginPage.jsx'
import { Navbar, Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<NotFoundPage />}></Route>
            <Route path='/' element={<div>Main</div>}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <div></div>
    </>
  )
}

export default App
