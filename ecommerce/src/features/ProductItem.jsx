import React from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/cartSlice'
import { Link } from 'react-router-dom'

const ProductItem = ({product}) => {
  const dispatch=useDispatch()
  let handleCart=()=>{
      dispatch(ADD_TO_CART(product))
  }
  return (

    <Col xs={3} className='mb-3'>
    <Card>
      <Link to={`/product-details/${product.id}`}>
        <Card.Img src={product.image} height='200px'  variant="top"/>
        </Link>
        <Card.Body>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <Button type="button" variant="danger" onClick={handleCart} >Add to Cart</Button>
        </Card.Body>
    </Card>
</Col>
  )
}

export default ProductItem
