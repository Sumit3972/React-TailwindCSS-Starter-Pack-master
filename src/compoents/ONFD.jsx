import React, { useState } from 'react'
import Resturantcard from './Resturantcard'

function ONFD({ data }) {
  const [activeBtn, setactiveBtn] = useState(null);
  const filterOptions = ["Ratings 4.0+", "Rs. 300-Rs. 600", "Offers", "Less than Rs. 300",]




  function handleBtn(filtername) {
    setactiveBtn(activeBtn === filtername ? null : filtername)
  }



  return (
    <div>
      <h1 className='my-7 font-bold text-2xl'>Resturant with online food delivery in Delhi</h1>
      <div className='my-7 flex gap-2'>
        {
          filterOptions.map((filtername) => (
            <button onClick={()=>handleBtn(filtername)} className={'fliter-btn font-medium text-sm flex gap-2 ' +(activeBtn===filtername ? "bg-slate-200" :null)}>
              <p>{filtername}</p>
              <i className={' text-xs mt-[3px] fi fi-br-cross '+(activeBtn===filtername ? " ": "hidden")}> </i>
            </button>

          ))
        }
      </div>
      <div className='grid grid-cols-4 gap-10'>
        {
          data.map((item) => (
            <div className="hover:scale-95 duration-300">
              <Resturantcard item={item} link={item.cta?.link} />
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default ONFD
{/* <button className='fliter-btn font-medium text-sm'> Rating 4+</button>
<button className='fliter-btn font-medium text-sm'>offers</button>
<button className='fliter-btn font-medium text-sm'>RS 300-Rs600</button>
<button className='fliter-btn font-medium text-sm'>less Rs-300</button> */}