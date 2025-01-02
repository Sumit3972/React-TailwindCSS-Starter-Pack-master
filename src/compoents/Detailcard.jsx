import React, { useState, useContext } from 'react';
import VegClassifierIcon from '../VEG NON VEG/Veg';
import NonVegClassifierIcon from '../VEG NON VEG/Nonveg';
import { CardContext } from '../context/contextApi';
import ConfirmationModal from './Confirmationmodal'; // Import the confirmation modal
import { useDispatch, useSelector } from 'react-redux';
import  {addtocart} from '../utlis/CartSlice'

function Detailcard({ info, resInfo }) {
  const { 
    name, 
    price, 
    defaultPrice, 
    itemAttribute: { vegClassifier }, 
    ratings: { aggregatedRating: { rating, ratingCountV2 } }, 
    description, 
    imageId 
  } = info;

  const [isMore, setMore] = useState(false);
  const CardData = useSelector((state => state.CartSlice.CartItems))
  const Res_localStorage = useSelector((state => state.CartSlice.resInfo))
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
 
  function handleAddToCart() {
    const isAdded = CardData.find((data) => data.id === info.id);

    if (!isAdded) {
      if (!Res_localStorage || Res_localStorage.name === resInfo.name) {
        dispatch(addtocart({ info, resInfo }));
      } else {
        setShowConfirmation(true); // Show confirmation modal if adding items from a different restaurant
      }
    } else {
      alert('Item already added.');
    }
  }


  function handleConfirmClearCart() {
    setCartData([info]); // Replace the cart with the new item
    localStorage.setItem('cartdata', JSON.stringify([info]));
    localStorage.setItem('resinfo', JSON.stringify(resInfo));
    setShowConfirmation(false);
  }

  function handleCancelClearCart() {
    setShowConfirmation(false); // Close the confirmation modal
  }

  const trim_content = description
    ? description.length > 140
      ? description.substring(0, 140) + '...'
      : description
    : '';

  return (
    <>
      <div className="flex w-full justify-between min-h-[182px]">
        <div className="w-[70%]">
          {vegClassifier === 'VEG' ? <VegClassifierIcon /> : <NonVegClassifierIcon />}

          <h2 className="font-gilroy font-bold text-[18px] leading-[20px] tracking-tight text-customColor">{name}</h2>
          <p className="font-bold text-[16px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)]">
            ₹{defaultPrice / 100 || price / 100}
          </p>

          <p className="rating">
            <span className="text-base text-[rgb(27,166,114)]">★</span>
            <span className="text-xs font-bold text-[rgb(27,166,114)]">{rating}</span>
            <span className="font-bold text-[13px] leading-[16px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)]">
              ({ratingCountV2})
            </span>
          </p>

          {description ? (
            description.length > 140 ? (
              <div>
                <span className="font-semibold text-[16px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)]">
                  {isMore ? description : trim_content}
                </span>
                <button className="font-bold ml-1" onClick={() => setMore(!isMore)}>
                  {isMore ? 'Less' : 'More'}
                </button>
              </div>
            ) : (
              <span>{description}</span>
            )
          ) : (
            <span className="font-semibold text-[16px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)]">
              No description available.
            </span>
          )}
        </div>

        <div className="w-[20%] relative h-full">
          <img
            className="object-cover rounded-[12px] w-[156px] h-[144px]"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt={name}
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-[-20px] left-5 bg-white font-extrabold text-[18px] leading-[24px] uppercase text-[rgb(27,166,114)] text-lg rounded-xl border px-8 py-2 drop-shadow"
          >
            Add
          </button>
        </div>
      </div>
      <hr className="my-5" />

      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirmClearCart}
          onCancel={handleCancelClearCart}
        />
      )}
    </>
  );
}

export default Detailcard;
