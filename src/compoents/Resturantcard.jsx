import React from 'react'
import { Link } from 'react-router-dom'

function Resturantcard({ item }) {

  return (
    <Link to={`/restaurantmenu/${item?.cta?.link.match(/\d+$/)[0]}`} >
      <div className="min-w-[275px] h-[182px] relative">

        <img className="w-full h-full rounded-s-2xl object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + item.info.cloudinaryImageId} />
        <div className="bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-2xl w-full h-full  absolute top-0"></div>
        <p className="absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold">
          {
            item?.info?.aggregatedDiscountInfoV3 ? item?.info?.aggregatedDiscountInfoV3?.header +
              " " +
              item?.info?.aggregatedDiscountInfoV3?.subHeader : ""
          }</p>
      </div>
      <div className="mt-3">
        <h2 className="text-lg font-semibold">{item?.info?.name}</h2>
        <p className="flex items-center gap-1 text-base font-semibold"><i className="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>{item?.info?.avgRating} .{" "}<span>{item?.info?.sla?.slaString}</span></p>
        <p className="line-clamp-1 text-black/60 font-medium">{item?.info?.cuisines.join(", ")}</p>
        <p className="line-clamp-1 text-black/60 font-medium">{item?.info?.locality}</p>
      </div>

    </Link>
  )
}

export default Resturantcard