import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaArrowAltCircleLeft, FaHome, FaListOl, FaLock, FaPenAlt, FaSearch, FaShoppingCart} from 'react-icons/fa'
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Logout, Protected, ProtectedAdmin, ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { Button, Col, NavDropdown, Row ,Form, InputGroup} from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, logoutuser, selectUserName, selectUserRole } from '../redux/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { selectcartItems } from '../redux/cartSlice';
import useFetchCollection from '../customhook/useFetchCollection';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
const Header = () => {
  const cartItems=useSelector(selectcartItems)
  const role=useSelector(selectUserRole)
  const username=useSelector(selectUserName)
  const navigate=useNavigate()
  const dispatch=useDispatch() 
  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if (user) {
          const uid = user.uid;
          try{
            const docRef=doc(db,"users",uid)
            const docSnap=await getDoc(docRef)
            let obj={userEmail:docSnap.data().email,userName:docSnap.data().username,userRole:docSnap.data().role,userId:uid}
            dispatch(loginuser(obj))
          }
          catch(error){console.log(error.message)}
         
      
      } else {
        dispatch(logoutuser())
      }
    });
  },[auth])


  let [search,setSearch]=useState('')
  const {data:products}=useFetchCollection("products")
  // let handleSearch=(e)=>{
  //   e.preventDefault()
  //     dispatch(FILTER_BY_SEARCH({products,search}))
  // }

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[search])
 
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#home">main-project</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/'><FaHome/> Home</Nav.Link>
       <Nav.Link as={Link} to='/products'><FaListOl/> Products</Nav.Link> 
      </Nav>
      <Nav>
      <Form inline>
      <InputGroup>
          <Form.Control placeholder="search by name" value={search} onChange={(e)=>setSearch(e.target.value)}
          />
          {/* <Button type="button" variant='danger' onClick={handleSearch}><FaSearch/></Button> */}
        </InputGroup>
     
      </Form>

      <Nav.Link as={Link} to='/cart'><FaShoppingCart size={30}/>
      <span class="badge rounded-pill text-bg-danger">{cartItems.length}</span> </Nav.Link>      
        <ShowOnLogout>
            <Nav.Link as={Link} to='/login'><FaLock/> Login</Nav.Link>
            <Nav.Link as={Link} to='/register'><FaPenAlt/> Register</Nav.Link>
        </ShowOnLogout>
        <ShowOnLogin>  
            <Nav.Link as={Link} to='/myorders'>My Orders</Nav.Link>
            <Nav.Link as={Link} to='/'>Welcome {username}</Nav.Link>
            <Nav.Link><Logout></Logout></Nav.Link>
        </ShowOnLogin>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header
