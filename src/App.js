import React from 'react'

import './App.css';

import Home from './component/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './component/Main';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App