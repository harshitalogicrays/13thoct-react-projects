import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalAmount, selectcartItems } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectcartItems)
    const cartTotal=useSelector(selectTotalAmount)
  return (
   <>
   <h1>Checkout Summary</h1><hr/>
   <div className="card p-2 mb-2">
        <h5>Total Items :({cartItems.length})<br></br>
        Total Amount :(${cartTotal})</h5>
   </div>
    {cartItems.map((c,i)=>
    <div className="card p-2 mb-2">
        <p>name: {c.name}<br/>
         unit price: {c.price}<br/>
         qty: {c.cartQuantity}

        </p>
    </div>
    )}
   </>
  )
}

export default CheckoutSummary
