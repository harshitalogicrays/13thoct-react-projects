import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaArrowAltCircleLeft, FaHome, FaListOl, FaLock, FaPenAlt, FaShoppingCart} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Protected, ProtectedAdmin, ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { NavDropdown } from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, logoutuser, selectUserName, selectUserRole } from '../redux/authSlice';
import { doc, getDoc } from 'firebase/firestore';
const Header = () => {
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


  let handleLogout=()=>{
    signOut(auth).then(() => {
      toast.success("LogggedOut Successfully")
      navigate('/')
    }).catch((error) => {
     toast.error(error.message)
    });
   
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#home">miniproject</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/'><FaHome/> Home</Nav.Link>
        {role=="admin" ?
         <NavDropdown title="Products" id="basic-nav-dropdown">
         <NavDropdown.Item as={Link} to='/admin/add'>Add</NavDropdown.Item> <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/admin/view'> View </NavDropdown.Item>
             </NavDropdown>
      :
      <Nav.Link as={Link} to='/products'><FaListOl/> Products</Nav.Link> 
  }

      </Nav>
      <Nav>
      <Nav.Link as={Link} to='/cart'><FaShoppingCart size={30}/>
      <span class="badge rounded-pill text-bg-danger">0</span>       </Nav.Link>      
        <ShowOnLogout>
            <Nav.Link as={Link} to='/login'><FaLock/> Login</Nav.Link>
            <Nav.Link as={Link} to='/register'><FaPenAlt/> Register</Nav.Link>
        </ShowOnLogout>
        <ShowOnLogin>  
            <Nav.Link as={Link} to='/'>My Orders</Nav.Link>
            <Nav.Link as={Link} to='/'>Welcome {username}</Nav.Link>
            <Nav.Link onClick={handleLogout}><FaArrowAltCircleLeft/> Logout</Nav.Link>
        </ShowOnLogin>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header
