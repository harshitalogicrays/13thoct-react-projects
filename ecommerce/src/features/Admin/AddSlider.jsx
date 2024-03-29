import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { selectSliders } from '../../redux/sliderSlice'
import store from '../../redux/store'

const AddSlider = () => {
  const navigate=useNavigate()
  let [slider,setSlider]=useState({title:'',desc:'',image:'',status:''})
  let [isActive,setIsActive]=useState(false)
  let [uploadProgress,setUploadProgress]=useState(0) 

    //edit 
    const {id}=useParams()
    const allSliders=useSelector(selectSliders)
    let sliderEdit=allSliders.find(item=>item.id==id)
    useEffect(()=>{
        if(id){
           
            setSlider({...sliderEdit})
            setIsActive(sliderEdit.status=='active'?true:false)
        }
        else {
            setSlider({title:'',desc:'',image:'',status:''})
        }
    },[id]) 


  let handleImage=(e)=>{
        // console.log(e.target.files)
        let file=e.target.files[0]
        let storageRef=ref(storage,`13thoct/sliders/${Date.now()}`)
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on('state_changed',(snapshot)=>{
            let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            setUploadProgress(progress) },(error)=>{toast.error(error.message)},
        ()=>{getDownloadURL(uploadTask.snapshot.ref).then(url=>{
                setSlider({...slider,image:url})
            }) }  ) }


  let handleSubmit=async(e)=>{  e.preventDefault()
    if(!id){
        try{
            const docRef=collection(db,"sliders")
            await addDoc(docRef,{
                title:slider.title, 
                desc:slider.desc, 
                image:slider.image,
                status : isActive? "active":"inactive",
                createdAt:Timestamp.now().toMillis()  })
            toast.success("slider added")
            navigate('/admin/viewsliders')  }
        catch(error){ toast.error(error.message) }
    }
    else {
        if(sliderEdit.image != slider.image){
            deleteObject(ref(storage,sliderEdit.image))
        }
        try{
            const docRef=doc(db,"sliders",id)
            await setDoc(docRef,{
                title:slider.title, 
                desc:slider.desc, 
                image:slider.image,
                status : isActive? "active":"inactive",
                createdAt:sliderEdit.createdAt,
            editedAt:Timestamp.now().toMillis()  })
            toast.success("slider updated")
            navigate('/admin/viewsliders')  }
        catch(error){ toast.error(error.message) }
    }
     }
  return (
    <Container className='mt-5 shadow p-2'>
        <Card>
            <Card.Header>
                <h4>{id ?"Edit " : "Add "} slider 
                    <Button variant="primary" type="button" as={Link} to='/admin/viewsliders' className='float-end'>View Slider</Button></h4>
            </Card.Header>
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name='title' placeholder='enter slider title'
                                value={slider.title} onChange={(e)=>setSlider({...slider,title:e.target.value})}
                            />
                        </Form.Group>
                        {uploadProgress > 0 && 
                        <div class="progress">
                        <div class="progress-bar bg-info" style={{width:`${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `uploading ${uploadProgress}%` : `uploaded ${uploadProgress}%`}
                        </div>
                        </div>}
                        <Form.Group className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name='image'  onChange={handleImage} />
                        </Form.Group>
                        {id && <img src={slider.image} width={50} height={50}/>}
                        <Form.Group className='mb-3'>
                            <Form.Check.Label>status: </Form.Check.Label>
                            <Form.Check.Input name="isActive" checked={isActive} 
                            onChange={()=>setIsActive(!isActive)}></Form.Check.Input>   
                             {"  "} {isActive ? "active":"inactive"}                 
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control  value={slider.desc} onChange={(e)=>setSlider({...slider,desc:e.target.value})}   as="textarea"  name="desc"/>
                        </Form.Group>
                        <Button type="submit" variant="primary">{id? "Update " :"Submit"}</Button>
                    </Form>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default AddSlider
