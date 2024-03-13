import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaArrowAltCircleLeft, FaHome, FaListOl, FaLock, FaPenAlt, FaShoppingCart} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Protected, ProtectedAdmin, ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { NavDropdown } from 'react-bootstrap';
const Header = () => {
  const navigate=useNavigate()
  let handleLogout=()=>{
    sessionStorage.removeItem("auth")
    toast.success("LogggedOut Successfully")
    navigate('/')
  }
  let [username,setUsername]=useState('')
  let [role,setRole]=useState('')
  let [isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
      if(sessionStorage.getItem("auth") !=null){
        let obj=JSON.parse(sessionStorage.getItem("auth"))
        setUsername(obj.name)
        setRole(obj.role)
        setIsLoggedIn(obj.isLoggedIn)
      }
      else { setUsername('');setRole('');setIsLoggedIn(false) }
  },[ sessionStorage.getItem("auth")])
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
        <ShowOnLogout>
            <Nav.Link as={Link} to='/login'><FaLock/> Login</Nav.Link>
            <Nav.Link as={Link} to='/register'><FaPenAlt/> Register</Nav.Link>
        </ShowOnLogout>
        <ShowOnLogin>
           <Nav.Link as={Link} to='/cart'><FaShoppingCart size={30}/>
            <span class="badge rounded-pill text-bg-danger">0</span>          
           </Nav.Link>
            <Nav.Link as={Link} to='/'>Welcome {username}</Nav.Link>
            <Nav.Link onClick={handleLogout}><FaArrowAltCircleLeft/> Logout</Nav.Link>
        </ShowOnLogin>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header
