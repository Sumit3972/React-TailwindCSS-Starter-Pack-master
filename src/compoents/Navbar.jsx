import React, { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Visibility } from '../context/contextApi';

function Navbar() {
 
const {visible,setVisible} = useContext(Visibility)
const [SearchResult, setSearchResult] = useState([])


  const navItems = [
    {
      name: 'Search',
      image: 'fi-rr-search',
      path: '/search',
    },
    {
      name: 'Sign in',
      image: 'fi-rr-user',
      path: '/signin',
    },
    {
      name: 'Cart',
      image: 'fi-rr-shopping-cart-add',
      path: '/cart',
    },
    {
      name: 'Help',
      image: 'fi fi-sr-life-ring',
    },
    {
      name: 'Offer',
      image: 'fi fi-rr-badge-percent',
    },
  ];

  function handleVisible() {
    console.log('Toggle Sidebar');
    setVisible((prev) => !prev);
  }

 async function searchbyapi(e){
   if(e==="") return;
   const result = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${e}`)
   const data = await result.json();
    setSearchResult(data.data)
 }








  return (
    <div className="relative w-full">
      {/* Overlay */}
      <div
        onClick={handleVisible}
        className={`w-full bg-black/50 z-30 h-full absolute transition-opacity ${
          visible ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`bg-white w-[40%] h-full z-40 absolute p-5 transition-transform duration-500 ${
          visible ? 'left-0' : '-left-[100%]'
        }`}
      >
        <p className="bg-black text-white p-5 w-[10%] cursor-pointer" onClick={handleVisible}>
          Close
        </p>
        <input type='text' className='border p-5 focus:outline-none focus:shadow-lg' onChange={(e)=>searchbyapi(e.target.value)}/>
        <div>
          <ul>
         {
          SearchResult.map((data)=>(
            <li>{data.structured_formatting.main_text}<p className='text-sm opacity-65'>{data.structured_formatting.secondary_text}</p></li>
          ))
         }
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="w-full sticky shadow-md h-20 z-20 flex justify-center items-center">
        <div className="w-[70%] flex justify-between">
          <div className="flex items-center gap-1">
            <Link to={'/'}>
              <img
                className="w-24"
                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                alt="Swiggy Logo"
              />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleVisible}>
              <p className="font-bold border-b-2 border-black">others</p>
              <i className="fi text-2xl text-orange-400 mt-2 fi-rs-angle-small-down"></i>
            </div>
          </div>
          <div className="flex items-center gap-14">
            {navItems.map((data, index) => (
              <div className="flex items-center gap-2" key={index}>
                <i className={`mt-1 fi text-gray-600 text-xl ${data.image}`}></i>
                <p className="text-lg font-medium text-gray-500">{data.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
