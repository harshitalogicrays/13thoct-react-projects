import React from 'react'
import ProductItem from './ProductItem'
import { Row } from 'react-bootstrap'
import Loader from './Loader'

const ProductList = ({products}) => {
  return (
    <>
    {products.length==0 && <h1>No Product Found</h1>}

     <Row>
      {products.map((product)=><ProductItem key={product.id} product={product}/>)}
      </Row>
    </>
  )
}

export default ProductList
