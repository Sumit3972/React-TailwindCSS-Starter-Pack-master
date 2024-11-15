import React, { useState } from 'react';
import './App.css';
import Navbar from './compoents/Navbar';
import RestaurantComponent from './compoents/Body';
import { Routes, Route } from 'react-router';
import RestaurantMenu from './compoents/RestaurantMenu';
import { Visibility } from './context/contextApi';

function App() {

  const [visible, setVisible] = useState(false);
  return (
    <Visibility.Provider value={{visible,setVisible}}>
      <div className={visible ? 'max-h-screen overflow-hidden' :''} >
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route path="/" element={<RestaurantComponent />} />
            <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
          </Route>


        </Routes>
      </div>
    </Visibility.Provider>

  )
}

export default App;
