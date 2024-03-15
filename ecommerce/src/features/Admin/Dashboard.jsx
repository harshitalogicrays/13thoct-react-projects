import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Button, Offcanvas,Nav,Navbar, Col, Row ,Dropdown} from 'react-bootstrap';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(true);
  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);
  return (
       <>
      {/* <Button variant="primary" onClick={handleShow}>
        Open Menu
      </Button> */}

      {/* <Offcanvas show={showMenu} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas> */}
      {/* <Row>
        <Col xs={3}>
        <Navbar bg="dark" variant="dark" expand="lg" className="flex-column">
      <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#users">Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Settings
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/1">Profile</Dropdown.Item>
                <Dropdown.Item href="#action/2">Preferences</Dropdown.Item>
                <Dropdown.Item href="#action/3">Settings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        </Col>
        <Col xs={9}>
              <Outlet/>
        </Col>
      </Row> */}
     
      <h1>Admin Dashboard</h1>
    </>
    

  )
}

export default Dashboard
