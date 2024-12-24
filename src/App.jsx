import React, { useState } from 'react';
import './App.css';
import Navbar from './compoents/Navbar'; // Fixed typo in folder name
import RestaurantComponent from './compoents/Body'; // Fixed typo in folder name
import { Routes, Route } from 'react-router-dom'; // Correct import for routing
import RestaurantMenu from './compoents/RestaurantMenu'; // Fixed typo in folder name
import { CardContext, Coordinate, Visibility } from './context/contextApi';

function App() {
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ lat: 26.95250, lng: 75.71050 });
  const [CardData, setCartData] = useState([{ id: 1 }, { id: 2 }]); // Initialized with mock data

  return (
    <CardContext.Provider value={{ CardData, setCartData }}>
      <Coordinate.Provider value={{ coordinate, setCoordinate }}>
        <Visibility.Provider value={{ visible, setVisible }}>
          <div className={visible ? 'max-h-screen overflow-hidden' : ''}>
            <Routes>
              <Route path="/" element={<Navbar />} >
                <Route index element={<RestaurantComponent />} />
                <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
              </Route>
            </Routes>
          </div>
        </Visibility.Provider>
      </Coordinate.Provider>
    </CardContext.Provider>
  );
}

export default App;
