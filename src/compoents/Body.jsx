import React, { useState, useEffect } from "react";
import OnYourMind from './Onyourmind';
import TopRestaurant from './TopResturant';
import ONFD from "./ONFD";
import { useSelector } from "react-redux";
import { info } from "autoprefixer";

function RestaurantComponent() {
  const [TopRestaurantData, SetTopRestaurantData] = useState([]);
  const [OnData, setOnData] = useState([]);
  const [Data, SetData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state to show a spinner or message
  const Filterval = useSelector((state => state.FilterSlice.Filtervalue))
  console.log(TopRestaurantData)
  const FilterData = TopRestaurantData.filter(item => {
    if (!Filterval) return true;

    switch (Filterval) {
      case "Ratings 4.0+": return item?.info?.avgRating > 4
      case "Rs. 300-Rs. 600": return item?.info?.costForTwo?.slice(1, 4) >= "300" && item?.info?.costForTwo?.slice(1, 4) <= "600"
      case "Offers": return item.info.aggregatedDiscountInfoV3.discountTag === "FLAT DEAL"
      case "Less than Rs. 300": return item?.info?.costForTwo?.slice(1, 4) < "300"
      default: return true

    }  
  })


  // Destructure lat and lng with default values to avoid errors
  const { lat = 26.95250, lng = 75.71050 } = useSelector((state) => state.Coordinate) || {};

  // Function to fetch data from the Swiggy API
  async function fetchData() {
    if (!lat || !lng) {
      console.error("Invalid coordinates");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const result = await response.json();
      console.log(result)
      // Check if the result contains the expected data
      if (result && result.data) {
        SetData(result.data);
        setOnData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
        SetTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
      } else {
        console.error("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading state after data is fetched
    }
  }

  // Fetch data when coordinates change or on mount
  useEffect(() => {
    setLoading(true); // Set loading state to true before making the API call
    fetchData();
  }, [lat, lng]); // Re-run fetchData when lat or lng changes

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-44">
        <span>Loading...</span> {/* You can replace this with a loading spinner */}
      </div>
    );
  }

  // If location is unserviceable
  if (Data.communication) {
    return (
      <div className="flex mt-44 overflow-hidden justify-center items-center flex-col">
        <img
          className="w-72"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt="Location Unserviceable"
        />
        <h1>Location Unserviceable</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-[75%] mx-auto mt-3 overflow-hidden">
        <OnYourMind data={OnData} />
        <TopRestaurant data={TopRestaurantData} />
        <ONFD data={Filterval ? FilterData : TopRestaurantData} />
      </div>
    </div>
  );
}

export default RestaurantComponent;
