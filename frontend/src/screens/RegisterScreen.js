import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({location,history}) => {
   
   const [name,setName] = useState('')
   const [confirmPassword,setConfirmPassword] = useState('')
   const [message,setMessage] = useState(null)
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')

   const dispatch= useDispatch()

   const userRegister = useSelector(state=>state.userRegister)
   const {loading,error,userInfo} = userRegister

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
    if(password!==confirmPassword)
    {
        setMessage('Sifre se ne poklapaju')
    }

    else {
    dispatch(register(name,email,password))
    }
   }
    return (
        <FormContainer>
            <h1> Registruj se</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type='name' placeholder='Unesite ime' value={name}
                    onChange={(e)=> setName(e.target.value)}></Form.Control>

                </Form.Group>


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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Potvrdite sifru</Form.Label>
                    <Form.Control type='password' placeholder='Unesite sifru' value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                    
                </Form.Group>



                <Button type='submit' variant='primary'> 
                
                    Registruj se
                </Button>

            </Form>

            <Row className='py-3'> 
            <Col>
            Da li imate nalog? {' '}
            <Link to={redirect ? `/login?redirect=${redirect}`
            : '/login'} > Uloguj se</Link>
            </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
