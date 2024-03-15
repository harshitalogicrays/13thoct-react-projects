import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
const Login = () => {
  let [user,setUser]=useState({email:'',password:''})
  let [errors,setErrors]=useState({})
  let [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let validations=(user)=>{
      let formerrors={}
      let emailpattern=/^([\w\d_\!\@\#\$|%\&\*\-\+\.]+)\@([\w\d_]+)\.([a-zA-Z]{3})$/
      if(user.email=='')
          formerrors.emailerr="email is required"
      else if(!emailpattern.test(user.email))
          formerrors.emailerr="invalid email"
      if(user.password=='')
          formerrors.pwderr="password is required"
      return formerrors
  }

  let handleSubmit=async(e)=>{
      e.preventDefault()
      let myerrors=validations(user)
      if(Object.keys(myerrors).length==0){
          setErrors({})
          setIsLoading(true)
          signInWithEmailAndPassword(auth, user.email, user.password)
          .then(async(userCredential) => {
              const user1 = userCredential.user;
              try{
                const docRef=doc(db,"users",user1.uid)
                const docSnap=await getDoc(docRef)
                let role=docSnap.data().role
                if(role=="admin"){
                    navigate('/admin')
                }
                else if(role=="user"){
                    navigate('/')
                }
                toast.success("loggedIn Successfully")
              
                setIsLoading(false)
              }
              catch(error){
                toast.error(error.message)
              }
                
          })
          .catch((error) => {
                setIsLoading(false)
                 toast.error(error.message)
          });         
      }
          else  setErrors(myerrors)
  }


  const provider = new GoogleAuthProvider();
  let loginwithgoogle=()=>{
    signInWithPopup(auth, provider)
    .then(async(result) => {
          const user = result.user;
          try{
            const docRef=doc(db,"users",user.uid)
            await setDoc(docRef,{username:user.displayName,email:user.email,role:"user", createdAt:Timestamp.now().toMillis()})
            toast.success("loggedIn Successfully")
            navigate('/')
            setIsLoading(false)
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
        
    }).catch((error) => {
        toast.error(error.message)
    });
  }
  return (
    <Container>
       
        {isLoading &&  <Loader/>}
    <Row className='shadow p-3'>
    <Col>
        <img src='/src/assets/login.png' height={400} />
    </Col>
    <Col>   
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email"  value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </Form.Group>
                    {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}
    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password"  value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    </Form.Group>
                    {errors.pwderr && <span className='text-danger'>{errors.pwderr}</span>}
    <br/>
                  <div class="d-grid gap-2">
                  <Button type="submit" variant='primary' >Login</Button>           
                    </div>
                <hr/>
                <div class="d-grid gap-2">
                <Button type="button" variant='danger' onClick={loginwithgoogle}>Login With Google</Button> 
                
                </div>
                
            </Form>
            <p>create an account?? <Link to='/register'>Signup</Link></p>
    </Col>
   </Row>
   </Container>
  )
}

export default Login
