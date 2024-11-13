import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MenuCard from './MenuCard';

function RestaurantMenu() {
  const { id } = useParams();
  const [resInfo, setResInfo] = useState({});
  const [menu, setMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [value, setValue] = useState(0);
  const [currIndex, SetCurrIndex] = useState(null);
  const [TopData, setTopdata] = useState(null)

//console.log(resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
  function handlePrev() {

  }

  function handleNext() {

  }

  async function fetchMenu() {
    try {
      const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.95250&lng=75.71050&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);
      const result = await response.json();

      //  console.log(result?.data?.cards[2]?.card?.card?.info || {});
      let actualMenuData = result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories);

      console.log((result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data=>data.card.card.title == "Top Picks")[0])

      setTopdata((result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data=>data.card.card.title == "Top Picks")[0])
      setResInfo(result?.data?.cards[2]?.card?.card?.info || {});  // Ensure resInfo is an object
      setDiscountData(result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || []);
      setMenuData(actualMenuData)
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function toogle(i) {
    //console.log(i);
    SetCurrIndex(i === currIndex ? null : i);
  }
  return (
    <div className='w-full'>
      <div className='w-[800px] mx-auto p-8'>
        <p className='text-[12px] text-slate-500'>
          <Link to="/">
            <span className='text-slate-300 hover:cursor-pointer'>Home</span> /
          </Link>
          {resInfo.city ? (
            <Link to="/">
              <span className='text-slate-300 hover:cursor-pointer'> {resInfo.city}</span> /
            </Link>
          ) : (
            <span>Loading...</span>
          )}
          <span className='text-slate-600'>{resInfo.name}</span>
        </p>
        <p className=' font-extrabold text-[24px] leading-[28px] tracking-[-0.4px] text-[rgba(2,6,12,0.92)] mt-9'>{resInfo.name} </p>
        <div className='w-full h-[206px] bg-gradient-to-t p-5 from-slate-200/70   mt-3 rounded-[30px]'>
          <div className='w-full border p-4 border-slate-200/70 rounded-[30px] h-full bg-white'>
            <div className='flex items-center gap-1'>
              <i className='fi fi-ss-circle-star  text-green-600 text-lg mt-1'></i>
              <span className=" font-semibold ">{resInfo.avgRating}</span>
              <span className="font-semibold">({resInfo.totalRatingsString})</span>
              <span className="text-slate-400 ">•</span>
              <span className="font-semibold">{resInfo.costForTwoMessage}</span>
            </div>
            <p className='text-base underline text-orange-500 font-bold cursor-pointer'>{resInfo.cuisines ? resInfo.cuisines.join(', ') : "Loading..."}</p>
            <div className="flex gap-1 mt-2">
              <div className="w-[9px] flex flex-col justify-center items-center">
                <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                <div className="w-[1px] h-[25px] bg-gray-400 "></div>
                <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
              </div>
              <div className='flex flex-col gap-3'>
                <p className='font-bold text-sm mt-2 justify-center' >Outlet <span className='text-slate-500 text-sm ml-3'>{resInfo.areaName}</span></p>
                <p className='mb-3 font-medium text-sm justify-center'>{resInfo?.sla?.slaString}</p>
              </div>

            </div>

          </div>
        </div>

        <div className='w-full'>
          <div className='flex justify-between mt-8'>
            <h1 className="font-bold text-2xl">Deals for you</h1>
            <div className="flex gap-3">
              <div
                onClick={handlePrev}
                className={
                  ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                  (value <= 0 ? "bg-gray-100" : "bg-gray-200")
                }
              >
                <i
                  className={
                    `fi text-2xl mt-1 fi-rr-arrow-small-left ` +
                    (value <= 0 ? "text-gray-300" : "text-gray-800")
                  }
                ></i>
              </div>
              <div
                onClick={handleNext}
                className={
                  ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                  (value >= 124 ? "bg-gray-100" : "bg-gray-200")
                }
              >
                <i
                  className={
                    `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                    (value >= 124 ? "text-gray-300" : "text-gray-800")
                  }
                ></i>
              </div>
            </div>
          </div>
          <div className='flex gap-4 mt-3'>
            {
              discountData.map((data) => (


                <Discount data={data} />


              ))

            }
          </div>


        </div>
        <h2 className='text-center mt-5 leading-5'>MENU</h2>
        <div className='w-full mt-5 relative cursor-pointer'>
          <div className='font-extrabold text-[18px] leading-[20px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)] overflow-hidden w-full line-clamp-1 break-words flex items-center justify-center  h-[48px] rounded-[12px] bg-[rgba(2,6,12,0.05)]'>
            Search for this dishes
             </div>
          <i className={'fi fi-rr-search absolute top-3 right-4 text-[rgba(2,6,12,0.6)] '}></i>
        </div>



        {TopData && (
  <div className="w-full overflow-hidden">
      <div className="flex justify-between mt-8">
          <h1 className="font-bold text-xl">
              {TopData.card.card.title}
          </h1>
          <div className="flex gap-3">
              <div
                  onClick={handlePrev}
                  className={
                      ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                      (value <= 0
                          ? "bg-gray-100"
                          : "bg-gray-200")
                  }
              >
                  <i
                      className={
                          `fi text-2xl mt-1 fi-rr-arrow-small-left ` +
                          (value <= 0
                              ? "text-gray-300"
                              : "text-gray-800")
                      }
                  ></i>
              </div>
              <div
                  onClick={handleNext}
                  className={
                      ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                      (value >= 124
                          ? "bg-gray-100"
                          : "bg-gray-200")
                  }
              >
                  <i
                      className={
                          `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                          (value >= 124
                              ? "text-gray-300"
                              : "text-gray-800")
                      }
                  ></i>
              </div>
          </div>
      </div>
      <div className="flex gap-4 mt-5">
          {TopData.card.card.carousel.map(
              ({
                  creativeId,
                  dish: {
                      info: { defaultPrice, price, id },
                  },
              }) => (
                  // console.log(creativeId)
                  <div key={id} className="min-w-[400px] relative h-[405px]">
                      <img
                          className="w-full h-full"
                          src={
                              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                              creativeId
                          }
                          alt=""
                      />
                      <div className="absolute bottom-4 text-white flex justify-between w-full px-5">
                          <p className="">
                              ₹
                              {defaultPrice / 100 ||
                                  price / 100}
                          </p>
                          <button className=" px-10 py-2 font-bold text-green-400 bg-white rounded-xl">
                              Add
                          </button>
                      </div>
                  </div>
              )
          )}
      </div>
  </div>
)}

        <div>
        {
  menu.map(({ card: { card } }, i) => (
    <MenuCard  card={card} />
  ))
}

        </div>

      </div>

    </div>

  )
}


function Discount({ data: { info: { header, offerLogo, couponCode, description } } }) {


  return (
    <div className='flex gap-2 min-w-[328px] border p-3 h-[72px] rounded-2xl'>
      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="error"></img>
      <div>
        <h2 className='font-extrabold text-[18px] leading-[20px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)] overflow-hidden w-full line-clamp-1 break-words'>{header}</h2>
        <p className='font-bold text-[14px] leading-[18px] tracking-[-0.3px] text-[rgba(2,6,12,0.45)] overflow-hidden w-full line-clamp-1 break-words'>{couponCode || description}</p>
      </div>
    </div>
  )
}

export default RestaurantMenu;
