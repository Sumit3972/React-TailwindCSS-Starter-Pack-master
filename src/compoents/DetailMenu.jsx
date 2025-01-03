import React, { useState } from 'react';
import VegClassifierIcon from '../VEG NON VEG/Veg';
import NonVegClassifierIcon from '../VEG NON VEG/Nonveg';
import Detailcard from './Detailcard';
import { info } from 'autoprefixer';
//import NonVegClassifierIcon from './Nonveg';



function DetailMenu({ itemCards, resInfo }) {



  return (
    <div className='my-5'>
      {
        itemCards.map(({ card: { info } }) => (
          <Detailcard info={info} resInfo={resInfo} />
        ))

      }
    </div>
  );
}

export default DetailMenu;
