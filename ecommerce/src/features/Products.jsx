import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../redux/productSlice'
import { Container } from 'react-bootstrap'
import { selectFilters, selectsearch } from '../redux/filterSlice'

const Products = () => {
  const {data}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_products(data))
  },[data])

  const products=useSelector(selectproducts)
  const filterproducts=useSelector(selectFilters)
  const searchvalue=useSelector(selectsearch)
  return (
    <>
    {searchvalue == '' ? 
          <ProductList products={products}/>  
    :
    <>
      {filterproducts.length == 0 ? <Container className='mt-5'><h1>No product found</h1></Container>
        :
        <ProductList products={filterproducts}  />
    
    }
    </>
  
  }

    </>
  )
}

export default Products
