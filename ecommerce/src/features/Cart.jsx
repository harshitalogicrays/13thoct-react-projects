import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTy_CART, REMOVE_FROM_CART, SAVE_URL, selectTotalAmount, selectcartItems } from '../redux/cartSlice'
import { selectIsLoggedIn } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const cart=useSelector(selectcartItems)
  const total=useSelector(selectTotalAmount)
  const isLoggedIn=useSelector(selectIsLoggedIn)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL())
  },[cart])


  let url=window.location.href
  let handleCheckout=()=>{
    if(isLoggedIn){
      navigate('/checkout-details')
    }
    else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
   
  }
   return (
    <Container className="mt-5 shadow p-3">
    <h1>My Cart</h1>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Sr. No</th>
      <th>Name</th>
      <th>Image</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total Price</th>
      <th>Action</th>
    </tr>
  </thead>
    <tbody>
      {cart.length==0 &&  <tr><td colSpan={7}>No Item in Cart</td></tr>}
       {cart.map((item,i)=>
        <tr key={i}>
            <td>{i+1}</td>
            <td>{item.name}</td>
            <td><img src={item.image} width={50} height={50}/></td>
            <td>{item.price}</td>
            <td>
              <button type="button" onClick={()=>dispatch(DECREASE(item))}>-</button>
              <input type="text" style={{width:'40px',textAlign:'center'}} value={item.cartQuantity} readOnly/>
              <button type="button"  onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
              </td>
            <td>{item.price * item.cartQuantity}</td>
            <td>
              <button type="button"  class="btn btn-danger"  onClick={()=>dispatch(REMOVE_FROM_CART(item))}>
                <FaTrash/>
              </button>
              
            </td>
        </tr>
        )}
    </tbody>
</Table>
<Row>
  <Col xs={9}>
  <button type="button"  class="btn btn-danger btn-lg" onClick={()=>dispatch(EMPTy_CART())}>
                <FaTrash/>Empty Cart
              </button>
  </Col>
  <Col xs={3}>
          <h4>Total: <span className='float-end'>${total}</span></h4><hr/>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary"  onClick={handleCheckout}
            disabled={cart.length==0 && "disabled"}
            >
              Checkout
            </button>
          </div>
          
  </Col>
</Row>
</Container>
  )
}

export default Cart
