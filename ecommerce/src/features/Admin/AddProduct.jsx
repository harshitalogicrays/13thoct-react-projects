import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { selectproducts } from '../../redux/productSlice'
import useFetchCollection from '../../customhook/useFetchCollection'

const AddProduct = () => {  
    let {data:categories}=useFetchCollection("categories")
    let initialState={category:'',name:'',brand:'',price:'',stock:'',image:'',desc:''}
    let [product,setProduct]=useState({...initialState})
    let [uploadProgress,setUploadProgress]=useState(0) 
    const navigate=useNavigate()

//edit
    const {id}=useParams()
    const [oldImages,setOldImages]=useState([])
    const [newImages,setNewImages]=useState([])
    const allproducts=useSelector(selectproducts)
    const productEdit=allproducts.find(item=>item.id==id)
    useEffect(()=>{
        if(id){
            setProduct({...productEdit})
            setOldImages(productEdit.image || [])
        }
        else setProduct({...initialState})
    },[id])



    let handleImage=(e)=>{
        let images=e.target.files
        let arr=[]
        Array.from(images).forEach((file)=>{
            let storageRef=ref(storage,`13thoct/products/${Date.now()}`)
            const uploadTask=uploadBytesResumable(storageRef,file)
            uploadTask.on('state_changed',(snapshot)=>{
                let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                setUploadProgress(progress) },(error)=>{toast.error(error.message)},
            ()=>{getDownloadURL(uploadTask.snapshot.ref).then(url=>{
                    arr.push(url)
                    setNewImages(prevImages=>[...prevImages,url])
                }) }  ) 
        })
       setProduct({...product,image:arr}) 
    }
    let handleSubmit=async(e)=>{
        e.preventDefault()
       if(!id){
        try{
            const docRef=collection(db,"products")
            await addDoc(docRef,{
            ...product,
            createdAt:Timestamp.now().toMillis()  })
            toast.success("product added")
            navigate('/admin/viewproducts')  }
        catch(error){ toast.error(error.message) }
       }
       else {
        const updatedImges=[...oldImages,...newImages] 
        try{
            const docRef=doc(db,"products",id)
            await setDoc(docRef,{
            ...product,
            image:updatedImges,
            createdAt:productEdit.createdAt,
        editAt:Timestamp.now().toMillis()  })
            toast.success("product updated")
            navigate('/admin/viewproducts')  }
        catch(error){ toast.error(error.message) }
       }
        
        }


    let removeImage=(index,image)=>{
        const updatedImages=[...oldImages]
        updatedImages.splice(index,1)
        setOldImages(updatedImages)
        deleteObject(ref(storage,image))
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
                {categories.map((c,i)=><option key={i}>{c.title}</option>)}
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
            {uploadProgress > 0 && 
                        <div class="progress">
                        <div class="progress-bar bg-info" style={{width:`${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `uploading ${uploadProgress}%` : `uploaded ${uploadProgress}%`}
                        </div>
                        </div>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control type="file"  name="image" multiple onChange={handleImage}/>
            </Form.Group>
            {id && <>
                {oldImages.map((image,i)=>
                <>
                <img src={image} width={50} height={50} />
                <span className='me-2' style={{position:'relative',top:'-20px',cursor:'pointer'}}onClick={()=>removeImage(i,image)}>X</span>
                </>
                )}
            </>}
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
