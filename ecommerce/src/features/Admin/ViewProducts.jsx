import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Container, Table } from 'react-bootstrap'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ViewProducts = () => {
    let [products,setProducts]=useState([])
    useEffect(()=>{
        getData()
    },[])
    let getData=async()=>{
       
    }

    let handleDelete=async(id)=>{
        if(window.confirm("are you sure to delete this??")){
          
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
            <td><img src={product.image} height={50} width={50}/></td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
                <Button as={Link}  to={`/admin/edit/${product.id}`}  variant='success' className="me-2"><FaPenAlt/></Button>
                <Button variant='danger' onClick={()=>handleDelete(product.id)}><FaTrashAlt/></Button>
            </td>
            </tr>
        )}
      </tbody>
    </Table>
   </Container>
  )
}

export default ViewProducts
