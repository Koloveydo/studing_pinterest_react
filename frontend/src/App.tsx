import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/home';
import ProductDatails from './pages/product';
import './App.css';

type storedInfo = {
  id:number;
  siteName: string;
  login: string;
  password: string;
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDatails />} />
      </Routes>
    </Router>
  );
}

export default App;
