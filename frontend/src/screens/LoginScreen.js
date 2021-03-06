import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({location,history}) => {
   
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')

   const dispatch= useDispatch()

   const userLogin = useSelector(state=>state.userLogin)

   const {loading,error,userInfo} = userLogin

   const redirect = location.search ?  location.search.split('=')[1] : '/'
   
   useEffect(()=>{

    if(userInfo)
    {
        history.push(redirect)
    }

   },[history,userInfo, redirect])
   
   
   const submitHandler = (e) =>
   {
    e.preventDefault()
    dispatch(login(email,password))
   }
    return (
        <FormContainer>
            <h1> Prijavi se</h1>
            {error && <Message variant='danger'>Sifra ili adresa koju ste uneli nisu ispravne</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Adresa</Form.Label>
                    <Form.Control type='email' placeholder='Unesite email adresu' value={email}
                    onChange={(e)=> setEmail(e.target.value)}></Form.Control>

                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Sifra</Form.Label>
                    <Form.Control type='password' placeholder='Unesite sifru' value={password}
                    onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    
                </Form.Group>

                <Button type='submit' variant='primary'> 
                
                    Prijavi se
                </Button>

            </Form>

            <Row className='py-3'> 
            <Col>
            Novi korisnik? 
            <Link to={redirect ? `/register?redirect=${redirect}`
            : '/register'} > Registruj se</Link>
            </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
