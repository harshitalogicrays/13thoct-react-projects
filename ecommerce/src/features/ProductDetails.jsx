import React from 'react'
import { Col, Container, Row,Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectproducts } from '../redux/productSlice'
import { ADD_TO_CART, DECREASE, selectcartItems } from '../redux/cartSlice'

const ProductDetails = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const allproducts=useSelector(selectproducts)
    const product=allproducts.find(item=>item.id==id)
    
    const cartItems=useSelector(selectcartItems)
    const itemIndex=cartItems.findIndex(item=>item.id==id)
    const item=cartItems.find(item=>item.id==id)
  return (
    <Container className='mt-5 shadow col-8 p-2'>
        <Row>
            <Col xs={6}>
                <Image src={product.image[0]} className='img-fluid'/>
            </Col>
            <Col xs={6}>
                <>
                    {product.stock > 0 ?
                    <span  class="badge rounded-pill text-bg-success float-end">In stock</span> :
                    <span  class="badge rounded-pill text-bg-danger float-end">Out of stock</span>
                    }
                    <h4>{product.name}</h4>
                    <p>{product.brand}</p>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                    <p>{product.desc}</p>

                    {itemIndex == -1  ? 
                    <Button type="button" variant="danger"  onClick={()=>dispatch(ADD_TO_CART(product))}>Add to Cart</Button>
                    :
                    <>
                    <button type="button" onClick={()=>dispatch(DECREASE(item))}>-</button>
                    <input type="text" style={{width:'40px',textAlign:'center'}} value={item.cartQuantity} readOnly/>
                    <button type="button"  onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
                    </>
                    }
                </>
            </Col>
        </Row>
   </Container>
  )
}

export default ProductDetails
