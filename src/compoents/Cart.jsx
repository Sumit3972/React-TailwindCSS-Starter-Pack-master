import React, { useContext } from 'react'
import { CardContext } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux';
import CartSlice, { clearcart, deleteItem } from '../utlis/CartSlice'

function Cart() {

 const dispatch = useDispatch();



   function RemoveAllCart(){
       dispatch(clearcart())
        
   }


  function Removecart(i){
    if(CardData.length > 1){
      let newarr = [...CardData];
      newarr.splice(i,1);
      dispatch(deleteItem(newarr))
      localStorage.setItem("cartdata",JSON.stringify(newarr));
     
    }else{
      RemoveAllCart();
    }
    
  }

  const CardData = useSelector((state => state.CartSlice.CartItems))
  console.log(CardData)

    let totalprice = 0;
    for(let i=0;i<CardData.length;i++){
      totalprice+= CardData[i].price/100 || CardData[i].defaultPrice /100;     
    }


  return (
    <div className='w-full'>
      <div className='w-[50%]  mx-auto'>
            {
              CardData.map((data,i)=>(
                <div className='flex justify-between my-5 p-2'>
                  <div className='w-[70%]'>
                  <h2 className='text-3xl'>{data.name}</h2>
                  <p>₹{data.price/100  ||  data.defaultPrice/100}</p>
                    </div>
                 
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
            <h1>Total ₹{totalprice}</h1>
            <button onClick={RemoveAllCart} className='bg-green-400 my-7  p-3 rounded-lg'>Clear Cart</button>
      </div>
    </div>
  )
}

export default Cart