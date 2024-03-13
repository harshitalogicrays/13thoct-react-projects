import React from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'

const ProductItem = ({product}) => {

  let handleCart=()=>{
    
  }
  return (

    <Col xs={3} className='mb-3'>
    <Card>
        <Card.Img src={product.image} height='200px'  variant="top"/>
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
