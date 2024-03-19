import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../redux/productSlice'
import { Container } from 'react-bootstrap'

const Products = () => {
  const {data}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_products(data))
  },[data])

  const products=useSelector(selectproducts)
  return (
    <>
   
      <ProductList products={products}/>
  
    </>
  )
}

export default Products
