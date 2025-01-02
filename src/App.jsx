import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './compoents/Navbar'; // Fixed typo in folder name
import RestaurantComponent from './compoents/Body'; // Fixed typo in folder name
import { Routes, Route } from 'react-router-dom'; // Correct import for routing
import RestaurantMenu from './compoents/RestaurantMenu'; // Fixed typo in folder name
import { CardContext, Coordinate, Visibility } from './context/contextApi';
import Cart from './compoents/Cart';
import { useSelector } from 'react-redux';
import toggleSlice from './utlis/toggleslice'

function App() {
 /*  const [/* visible, setVisible] = useState(false); */
  const [coordinate, setCoordinate] = useState({ lat: 26.95250, lng: 75.71050 });
  const [CardData, setCartData] = useState([]); // Initialized with mock data
  const visible = useSelector((state=> state.toggle.searchbartoggle))
/* 
   function Get_Data_Local_Storage(){
    let data = JSON.parse(localStorage.getItem("cartdata")) || []
    setCartData(data);
   }
   useEffect(()=>{
    Get_Data_Local_Storage();
   },[])
 */
  return (
  
          <div className={visible ? 'max-h-screen overflow-hidden' : ''}>
            <Routes>
              <Route path="/" element={<Navbar />} >
                <Route index element={<RestaurantComponent />} />
                <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/*" element={<h1>coming soon</h1>} />
              </Route>
            </Routes>
          </div>
   
  );
}

export default App;
