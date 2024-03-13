import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { DataContext } from './Context'
import {FaTrash} from 'react-icons/fa'
const Cart = () => {
  const data=useContext(DataContext)
  let {cart,total,calculate_total,increase,decrease,remove_from_Cart,empty_cart}=data
  useEffect(()=>{
    calculate_total()
  },[cart])
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
              <button type="button" onClick={()=>decrease(item)}>-</button>
              <input type="text" style={{width:'40px',textAlign:'center'}} value={item.qty} readOnly/>
              <button type="button"  onClick={()=>increase(item)}>+</button>
              </td>
            <td>{item.price * item.qty}</td>
            <td>
              <button type="button"  class="btn btn-danger"  onClick={()=>remove_from_Cart(item)}>
                <FaTrash/>
              </button>
              
            </td>
        </tr>
        )}
    </tbody>
</Table>
<Row>
  <Col xs={9}>
  <button type="button"  class="btn btn-danger btn-lg" onClick={()=>empty_cart()} >
                <FaTrash/>Empty Cart
              </button>
  </Col>
  <Col xs={3}>
          <h4>Total: <span className='float-end'>${total}</span></h4><hr/>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary"  >
              Checkout
            </button>
          </div>
          
  </Col>
</Row>
</Container>
  )
}

export default Cart
