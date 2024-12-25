import React, { useContext } from 'react'
import { CardContext } from '../context/contextApi'

function Cart() {

    const {CardData}= useContext(CardContext)
    console.log(CardData)
  return (
    <div>Cart</div>
  )
}

export default Cart