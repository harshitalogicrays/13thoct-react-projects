import React from 'react'
import ProductItem from './ProductItem'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Loader from './Loader'
import useFetchCollection from '../customhook/useFetchCollection'

const ProductList = ({products}) => {
  const {data:categories}=useFetchCollection("categories")
  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col xs={2}>
            <Card>
              <Card.Header>Categories</Card.Header>
              <Card.Body>
                {categories.map((c,i)=>
                  <Form.Check key={i}
                    type="radio"
                    name="category"
                    label={c.title}                  />
              )}
              </Card.Body>
            </Card>
        </Col>
        <Col xs={10}>
        {products.length==0 && <h1>No Product Found</h1>}
        <Row>
        {products.map((product)=><ProductItem key={product.id} product={product}/>)}
        </Row>

        </Col>
      </Row>
   
    </Container>
  )
}

export default ProductList
