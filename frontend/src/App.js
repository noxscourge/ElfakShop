import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreens from './screens/ProductScreens'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CartScreens from './screens/CartScreens'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'



const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
    <Container> 
    <Route path='/login' component={LoginScreen} />
    <Route path='/admin/userlist' component={UserListScreen} />
    <Route path='/admin/productlist' component={ProductListScreen} />
    <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
    <Route path='/admin/orderlist' component={OrderListScreen} />
    <Route path='/admin/user/:id/edit' component={UserEditScreen} />
    <Route path='/shipping' component={ShippingScreen} />  
    <Route path='/payment' component={PaymentMethodScreen} /> 
    <Route path='/placeorder' component={PlaceOrderScreen} /> 
    <Route path='/order/:id' component={OrderScreen} />
    <Route path='/register' component={RegisterScreen} />
    <Route path='/profile' component={ProfileScreen} />
    <Route path='/product/:id' component={ProductScreens} exact/> 
    <Route path='/cart/:id?' component={CartScreens}  /> 
    <Route path='/' component={HomeScreen} exact/>  
    </Container>
      </main>

      <Footer/>
    </Router>
  )
}

export default App

 