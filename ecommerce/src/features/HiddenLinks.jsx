import { useSelector } from "react-redux"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice"
import Header from "./Header"
import { useState } from "react"
import { Button,Col,Nav,Navbar,Offcanvas, Row,Dropdown, NavDropdown } from "react-bootstrap"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { toast } from "react-toastify"

export const ShowOnLogin=({children})=>{
        const isLoggedIn=useSelector(selectIsLoggedIn)
        if(isLoggedIn) return children
        else return null
}

export const ShowOnLogout=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
        if(isLoggedIn==false) return children
        else return null
}

export const ProtectedAdmin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="admin") return children
    else return <Navigate to='/login' replace={true}/>
}

export const Protected=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="user") return children
    else return <Navigate to='/login' replace={true}/>
}


export const DefaultDashboard=({children})=>{
        return (
            <>
            <Header/>
                {children}
            </>
        )
}

export const AdminDashboard=()=>{
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="me-auto">
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Category" id="basic-nav-dropdown">
         <NavDropdown.Item as={Link} to='/admin/addcategory'>Add</NavDropdown.Item> <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/admin/viewcategories'> View </NavDropdown.Item>
             </NavDropdown>
          <NavDropdown title="Slider" id="basic-nav-dropdown">
         <NavDropdown.Item as={Link} to='/admin/addslider'>Add</NavDropdown.Item> <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/admin/viewslider'> View </NavDropdown.Item>
             </NavDropdown>
          <NavDropdown title="Products" id="basic-nav-dropdown">
         <NavDropdown.Item as={Link} to='/admin/addproduct'>Add</NavDropdown.Item> <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/admin/viewproducts'> View </NavDropdown.Item>
             </NavDropdown>
            </Nav>
            <Nav>
          <Nav.Item>
            <Nav.Link><Logout></Logout></Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
        </Navbar>
         <Outlet/>
        </>
    )
}


export const Logout=()=>{
  const navigate=useNavigate()
  let handleLogout=()=>{
    signOut(auth).then(() => {
      toast.success("LogggedOut Successfully")
      navigate('/')
    }).catch((error) => {
     toast.error(error.message)
    });
   
  }
  return (<><span onClick={handleLogout}><FaArrowAltCircleLeft/> Logout</span> </>)
}