import React, { useState, useEffect, useContext } from "react";
import OnYourMind from './Onyourmind';
import TopRestaurant from './TopResturant';
import ONFD from "./ONFD";
import { Coordinate } from "../context/contextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function RestaurantComponent() {
  const [TopRestaurantData, SetTopRestaurantData] = useState([]);
  const [OnData, setOnData] = useState([]);
  const { coordinate: {
    lat, lng
  }, setcoordinate } = useContext(Coordinate);
   const [Data , SetData] = useState({})



  async function fetchData() {
  
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const result = await response.json();
      SetData(result.data)
      setOnData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
      //console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
      SetTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 


  useEffect(() => {
    fetchData();
  }, [lat,lng]);
  console.log(Data)
  if(Data.communication){
    return (
         <div className="flex mt-44 overflow-hidden justify-center items-center flex-col">
                <img
                    className="w-72"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                    alt=""
                />
                <h1>Location unservicalbe</h1>
            </div>
    )
  }
  return (
    <div className='w-full'>
      <div className='w-[75%] mx-auto mt-3 overflow-hidden'>
        <OnYourMind data={OnData} />
        <TopRestaurant data={TopRestaurantData} />
        <ONFD data={TopRestaurantData} />
      </div>
    </div>
  );
}

export default RestaurantComponent;
