import React, { useContext } from 'react'
import { CardContext } from '../context/contextApi'

function Cart() {


  function Removecart(i){
     let newarr = [...CardData];
     newarr.splice(i,1);
     setCartData(newarr);
     localStorage.setItem("cart",JSON.stringify(newarr));
  }

    const {CardData,setCartData}= useContext(CardContext)
    console.log(CardData)
  return (
    <div className='w-full'>
      <div className='w-[50%]  mx-auto'>
            {
              CardData.map((data,i)=>(
                <div className='flex justify-between'>
                  <h2>{data.name}</h2>
                  <div className="w-[20%] relative h-full">
          <img
            className="object-cover rounded-[12px] w-[156px] h-[144px]"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`}
            alt='hello'
          />
          <button onClick={()=>Removecart(i)}  className="absolute bottom-[-20px] left-5 bg-white font-extrabold text-[18px] leading-[24px] uppercase text-[rgb(27,166,114)] text-lg rounded-xl border px-8 py-2 drop-shadow">
            remove
          </button>
        </div>
                  </div>
              ))
            }
      </div>
    </div>
  )
}

export default Cart