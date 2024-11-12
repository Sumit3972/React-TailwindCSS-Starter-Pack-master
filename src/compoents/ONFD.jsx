import React from 'react'
import Resturantcard from './Resturantcard'

function ONFD({ data }) {
  return (
    <div>Resturant with online food delivery in Delhi
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