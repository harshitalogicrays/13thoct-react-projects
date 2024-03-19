import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Container, Table } from 'react-bootstrap'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../../redux/productSlice'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
import useFetchCollection from '../../customhook/useFetchCollection'

const ViewProducts = () => {
  let {data}=useFetchCollection("products")
   const dispatch=useDispatch()

   useEffect(()=>{
    dispatch(store_products(data))
   },[data])
  
   let products=useSelector(selectproducts)

  let handleDelete=async(id,image)=>{
        if(window.confirm("are you sure to delete this??")){
          image.forEach(img=>deleteObject(ref(storage,img)))         
          deleteDoc(doc(db,'products',id))
          toast.success("product deleted") 
        }
    }
  return (
   <Container className="mt-5 shadow p-3">
        <h1>View Products</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Name</th>
          <th>Image</th>
          <th>Brand</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length==0 &&   <tr><td colSpan={8}>No Product Found</td></tr>}
      {products.map((product,index)=>
            <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.category}</td>
            <td>{product.name}</td>
            <td><img src={product.image[0]} height={50} width={50}/></td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
                <Button as={Link}  to={`/admin/editproduct/${product.id}`}  variant='success' className="me-2"><FaPenAlt/></Button>
                <Button variant='danger' onClick={()=>handleDelete(product.id,product.image)}><FaTrashAlt/></Button>
            </td>
            </tr>
        )}
      </tbody>
    </Table>
   </Container>
  )
}

export default ViewProducts
