import React from 'react'
import { Navbar, Nav, Container, NavDropdown }  from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions.js'
const Header = () => {

const dispatch = useDispatch()
const userLogin = useSelector(state=>state.userLogin)
const {userInfo} = userLogin 
const logoutHandler = () =>
{

  
  dispatch(logout())
}
  return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               
            <Container> 

             <LinkContainer to='/' > 
  <Navbar.Brand > Elfak online Shop </Navbar.Brand>
             </LinkContainer> 
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to='/cart' > 
      <Nav.Link ><i className='fas fa-shopping-cart'></i> Korpa</Nav.Link>
    
      </LinkContainer> 
       {userInfo ? (

        <NavDropdown title={userInfo.name} id='username'> 
        
        <LinkContainer to='/profile'>

        <NavDropdown.Item> Profil </NavDropdown.Item>

        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}> Odjavi se</NavDropdown.Item>
        </NavDropdown>

       ):  <LinkContainer to='/login' > 
       <Nav.Link ><i className='fas fa-user'></i> Prijavi se</Nav.Link>
       </LinkContainer>  }
     
     {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu'> 
        
        <LinkContainer to='/admin/userlist'>

        <NavDropdown.Item> Korisnici </NavDropdown.Item>

        </LinkContainer>
        
        <LinkContainer to='/admin/productlist'>

        <NavDropdown.Item> Proizvodi </NavDropdown.Item>

        </LinkContainer>

        <LinkContainer to='/admin/orderlist'>

        <NavDropdown.Item> Narudzbine </NavDropdown.Item>

        </LinkContainer>


        </NavDropdown>
     )}

    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
