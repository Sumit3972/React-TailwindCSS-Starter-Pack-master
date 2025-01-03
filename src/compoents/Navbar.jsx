import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TogglSearch } from '../utlis/toggleslice';
import { setCoordinates } from '../utlis/cordinate';

function Navbar() {
  const visible = useSelector((state) => state.toggle.searchbartoggle);
  const { lat = 26.95250, lng = 75.71050 } = useSelector((state) => state.Coordinate) || {};
  const [SearchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("");
  const CardData = useSelector((state) => state.CartSlice.CartItems);
  const dispatch = useDispatch();

  const navItems = [
    { name: 'Search', image: 'fi-rr-search', path: '/search' },
    { name: 'Sign in', image: 'fi-rr-user', path: '/signin' },
    { name: 'Cart', image: 'fi-rr-shopping-cart-add', path: '/cart' },
    { name: 'Help', image: 'fi fi-sr-life-ring', path: '/help' },
    { name: 'Offer', image: 'fi fi-rr-badge-percent', path: '/offer' },
  ];

  const handleVisible = () => {
    dispatch(TogglSearch(!visible));
  };

  const searchbyapi = async (query) => {
    if (!query) return;
    try {
      const result = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${query}`
      );
      const data = await result.json();
      setSearchResult(data.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fetchLangData = async (id) => {
    if (!id) return;
    try {
      const result = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
      );
      const data = await result.json();
      dispatch(setCoordinates({
        lat: data.data[0].geometry.location.lat,
        lng: data.data[0].geometry.location.lng,
      }));
      setAddress(data.data[0].formatted_address);
      dispatch(TogglSearch(false)); // Close sidebar
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div className="relative w-full">
      {/* Overlay */}
      <div
        onClick={handleVisible}
        className={`w-full bg-black/50 z-30 h-full absolute transition-opacity duration-500 ${visible ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`flex justify-end bg-white w-[40%] min-h-full z-30 absolute p-5 transition-transform duration-500 ${visible ? 'left-0' : '-left-[100%]'
          }`}
      >
        <div className="flex flex-col w-[60%] mt-2 gap-4 mr-6">
          <i className="fi fi-br-cross" onClick={handleVisible}></i>
          <input
            type="text"
            className="border p-5 focus:outline-none focus:shadow-xl"
            onChange={(e) => searchbyapi(e.target.value)}
          />
          <div className="border p-5">
            <ul>
              {SearchResult.map((data, index) => (
                <li key={data.place_id} onClick={() => fetchLangData(data.place_id)}>
                  <div className="my-5">
                    <div className="flex gap-4">
                      <i className="fi fi-rr-marker mt-2"></i>
                      <div>
                        <p className="font-bold">{data.structured_formatting.main_text}</p>
                        <p className="text-sm text-gray-500">
                          {data.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </div>
                    {index !== SearchResult.length - 1 && (
                      <hr className="opacity-40 my-2" />
                    )}
                  </div>
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
                <span className="font-bold border-b-2 border-black">Others</span>
                <span className="ml-3 text-[#686b78] overflow-hidden text-ellipsis whitespace-nowrap">
                  {address || 'Select a location'}
                </span>
              </p>
              <i className="fi text-2xl text-orange-400 mt-2 fi-rs-angle-small-down"></i>
            </div>
          </div>

          <div className="flex items-center gap-14">
            {navItems.map((data, index) => (
              <Link to={data.path} key={index}>
                <div className="flex items-center gap-2">
                  <i className={`mt-1 fi text-gray-600 text-xl ${data.image}`}></i>
                  <p className="text-lg font-medium text-gray-500">{data.name}</p>
                  {data.name === 'Cart' && (
                    <p className="bg-red-500 text-white text-sm rounded-full px-2 py-1">
                      {CardData && CardData.length > 0 ? CardData.length : 0}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
