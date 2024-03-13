import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const AddProduct = () => {  
    let categories=["Grocery","Electronics","Cloths","Jewellary"]
    let initialState={category:'',name:'',brand:'',price:'',stock:'',image:'',desc:''}
    let [product,setProduct]=useState({...initialState})
    const navigate=useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        if(id){
            getIdProductData()
        }
        else setProduct({...initialState})
    },[id])

    let getIdProductData=async()=>{
      
    }


    let handleImage=(e)=>{
            // console.log(e.target.files[0])
            setProduct({...product,image:`/src/assets/images/${e.target.files[0].name}`})
    }
    let handleSubmit=async(e)=>{
        e.preventDefault()
        
        }
  return (
    <Container>
    <Row className="shadow p-2">
        <Col>
        <h1>{id?"Edit" :"Add " } Product</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={product.category} 
                onChange={(e)=>setProduct({...product,category:e.target.value})}>
                <option value='' selected disabled>choose one</option>
                {categories.map((c,i)=><option key={i}>{c}</option>)}
                </Form.Select>
            </Form.Group>
            <Row>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={product.name} 
                onChange={(e)=>setProduct({...product,name:e.target.value})}/>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={product.brand} 
                onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={product.price} 
                onChange={(e)=>setProduct({...product,price:e.target.value})}/>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="number" name="stock" value={product.stock} 
                onChange={(e)=>setProduct({...product,stock:e.target.value})}/>
                </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control type="file"  name="image" onChange={handleImage}/>
            </Form.Group>
            {id && <Image src={product.image} width={50} height={50}/>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="desc" value={product.desc} 
                onChange={(e)=>setProduct({...product,desc:e.target.value})}/>
            </Form.Group>
            <Button type="submit" variant="primary">{id ? "Update Product" :"Submit"} </Button>
        </Form>
        </Col>
        </Row>
    </Container>
  )
}

export default AddProduct
