import React, { useState, useEffect } from "react";
import OnYourMind from './Onyourmind';
import TopRestaurant from './TopResturant';
import ONFD from "./ONFD";

function RestaurantComponent() {
  const [TopRestaurantData, SetTopRestaurantData] = useState([]);
  const [OnData, setOnData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.95250&lng=75.71050&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const result = await response.json();
      setOnData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
      console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
      SetTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
