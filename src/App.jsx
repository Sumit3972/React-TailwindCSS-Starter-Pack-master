import React from 'react';
import './App.css';
import Navbar from './compoents/Navbar';
import RestaurantComponent from './compoents/Body';
import { Routes, Route } from 'react-router';
import RestaurantMenu from './compoents/RestaurantMenu';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route path="/" element={<RestaurantComponent />} />
        <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
      </Route>


    </Routes>


  )
}

export default App;
