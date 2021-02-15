import React, {useEffect} from 'react'
import {Row,Col, ListGroup} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList
    useEffect(()=>
    {

      dispatch(listProducts())


    },[dispatch])

    return (
        <>
            <h1> Najnovije stvari </h1>
            {loading ? <Loader> </Loader>: error ? 
            <Message variant='danger'>{error} </Message > :<Row>
            {products.map((product,index) => (
                <Col sm={2} md={4} lg={3} xl={3} key={index}>
                 
                    <Product product ={product} ></Product>
                    
                </Col>
            ))  }
            </Row>
            }
            
        </>
    )
}

export default HomeScreen
