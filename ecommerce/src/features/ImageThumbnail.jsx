import ReactImageMagnify from '@blacklab/react-image-magnify'
import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
const ImageThumbnail = ({images}) => {
    let [image,setImage]=useState(images[0])
    let [index,setIndex]=useState(0)
    let handleImage=(i)=>{
        setIndex(i)
        setImage(images[i])
    }
    let handlePrev=()=>{
        if(index > 0){
            setIndex(index-1)
            setImage(images[index-1])
        }     
    }
    let handleNext=()=>{
        if(index < images.length-1){
            setIndex(index+1)
            setImage(images[index+1])
        }
      
    }
  return (
    <>
    {/* <Image src={image} className='img-fluid mb-3' height={200}  width={300}/> */}
    <ReactImageMagnify
     imageProps = {{
        alt : "loading",
        src : image,
        height : 200,
        width : 400
        }}
        magnifiedImageProps = {{
            src : image,
            height : 800,
            width : 1800
        }}
        magnifyContainerProps ={{
            height : 200,
            width : 400
            }}
            portalProps ={{
                horizontalOffset : 10,
                verticalOffset : -100
                }}
/>
    <Row className='mt-5'>
        <Col xs={1}>
        <button type="button" onClick={handlePrev}><FaArrowLeft/></button>
        </Col>
     
        {images.map((img,i)=>
            <Col xs={2}>
            <Image src={img} className={`img-fluid ${index==i ? 'border border-success':''}`} onClick={()=>handleImage(i)}/>
            </Col>
        )}
          <Col xs={1}>
        <button type="button" onClick={handleNext}><FaArrowRight/></button>
        </Col>
    </Row>
    </>
  )
}

export default ImageThumbnail
