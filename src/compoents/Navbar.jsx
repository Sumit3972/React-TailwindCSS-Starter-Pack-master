import React from 'react'
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

function Navbar() {

  const navItems = [
    {
      name: "Search",
      image: "fi-rr-search",
      path: "/search",
    },
    {
      name: "Sign in",
      image: "fi-rr-user",
      path: "/signin",
    },
    {
      name: "Cart",
      image: "fi-rr-shopping-cart-add",
      path: "/cart",
    },
    {
      name: "help",
      image: "fi fi-sr-life-ring"
    }, {
      name: "offer",
      image: "fi fi-rr-badge-percent"
    }
  ];

  return (
    <>
      <div className='w-full  shadow-md h-20 flex justify-center items-center'>
        <div className=' w-[70%] flex justify-between' >
          <div className='flex items-center gap-1'>
            <Link to={'/'}>
              <img className='w-24 ' src='https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png'></img>
            </Link>
            <p className='font-bold border-b-2 border-black'>others</p>
            <i class="fi text-2xl text-orange-400 mt-2 fi-rs-angle-small-down"></i>

          </div>
          <div className='flex items-center gap-14 '>
            {
              navItems.map((data) => (
                <div className='flex items-center gap-2 '>
                  <i className={"mt-1 fi text-gray-600 text-xl  " + data.image}></i>
                  <p className='text-lg font-medium text-gray-500'>{data.name}</p>
                </div>
              ))
            }



          </div>
        </div>

      </div>
      <Outlet />
    </>
  )
}

export default Navbar