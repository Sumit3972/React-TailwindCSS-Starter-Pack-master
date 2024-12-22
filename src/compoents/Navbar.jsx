import React, { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Coordinate, Visibility } from '../context/contextApi';

function Navbar() {

  const { visible, setVisible } = useContext(Visibility)
  const [SearchResult, setSearchResult] = useState([])
  const { coordinate, setcoordinate } = useContext(Coordinate);
  const [address, setaddress] = useState("")


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
  const handleVisible = () => {
    setVisible(!visible);
  };
  async function searchbyapi(e) {
    if (e === "") return;
    const result = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${e}`)
    const data = await result.json();
    setSearchResult(data.data)
  }


  async function fetchLangData(id) {
    if (id === "") return;
    console.log(id);
    const result = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);
    const data = await result.json();
    setcoordinate({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    });
    setaddress(data.data[0].formatted_address);
  
    // Close the sidebar after selecting a result
    setVisible(false);
  }
  






  return (
    <div className="relative w-full">
      {/* Overlay */}
      <div
        onClick={handleVisible}
        className={` w-full bg-black/50 z-30 h-full absolute transition-opacity duration-500 ${
          visible ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      ></div>
  
      {/* Sidebar */}
      <div
        className={` flex justify-end bg-white w-[40%] min-h-full z-30 absolute p-5 transition-transform duration-500 ${
          visible ? 'left-0' : '-left-[100%]'
        }`}
      >
      
       <div className='flex flex-col w-[50%] mt-2 gap-4 mr-4 '>  
          <i className='fi fi-br-cross'  onClick={handleVisible} ></i>
        <input
          type="text"
          className="border p-5 focus:outline-none focus:shadow-xl"
          onChange={(e) => searchbyapi(e.target.value)}
        />
        <div className='border p-5'>
          <ul >
            {SearchResult.map((data) => (
              <li onClick={() => fetchLangData(data.place_id)} key={data.place_id}>
                {data.structured_formatting.main_text}
                <p  className="text-sm opacity-65" >
                  {data.structured_formatting.secondary_text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
  
      {/* Navbar */}
      <div className="w-full sticky shadow-md h-20 z-20 flex justify-center items-center bg-white">
        <div className="w-[70%] flex justify-between">
          <div className="flex items-center gap-1">
            <Link to={'/'}>
              <img
                className="w-24"
                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                alt="Swiggy Logo"
              />
            </Link>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleVisible}
            >
              <p>
                <span className="font-bold border-b-2 border-black">others</span>
                <span className="ml-3 text-[#686b78] overflow-hidden text-ellipsis whitespace-nowrap">
                  {address}
                </span>
              </p>
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
