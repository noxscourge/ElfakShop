import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row,Col,Image, ListGroup,Card,Button, Form} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProductDetails} from '../actions/productActions'



const ProductScreens = ({match,history}) => {

    const [qty,setQty] = useState(1)



    const dispatch = useDispatch()
    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails
    
   useEffect(()=>
   {

        dispatch(listProductDetails(match.params.id))
    
   },[dispatch,match])


   const addToCartHandler = () =>
   {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
   }
  

    return (
        <>
        <Link className='btn btn-light my-3' to='/'> Vrati se </Link>
      
        {loading ? <Loader> </Loader> : 
        error ? <Message variant='danger'> {error} </Message> : (

            <Row> 
            <Col md={6}>
                <Image src={product.image}  alt={product.name} fluid />
            </Col>
    
            <Col md={3}>
             <ListGroup variant='flush'>
            <ListGroup.Item>
    
                <h3> {product.name} </h3>
            </ListGroup.Item>
             <ListGroup.Item>  
                 Cena: {product.price} din 
             </ListGroup.Item>
    
             <ListGroup.Item>  
                 Opis: {product.description}  
             </ListGroup.Item>
    
             </ListGroup>
            </Col>
    
    
            <Col md={3}> 
            
            <Card>
    
                <ListGroup variant='flush'>
    
                    <ListGroup.Item>
    
                    <Row>
    
                <Col>
                
                   cena:  
                </Col>
    
                <Col>
                
                <strong>   {product.price} din </strong>  
                 </Col>
    
                    </Row>
    
                    </ListGroup.Item>
    
                    <ListGroup.Item>
    
                    <Row>
    
                <Col>
                
                   Status: 
                </Col>
    
                <Col>
                
                {product.countInStock > 0 ? 'Dostupno u kopirnici' : 'Nedostupno u kopirnici'}  
                 </Col>
    
                    </Row>
    
                    </ListGroup.Item>
    

                    {product.countInStock > 0 && (

                        <ListGroup.Item> 

                        <Row>

                            <Col>
                                Raspolozivo
                            </Col>
                            <Col>
                            
                            <Form as='select' value={qty} onChange={(e)=>
                            setQty(e.target.value)}>
                                {
                                [...Array(product.countInStock).keys()].map((x)=>
                                (
                                        <option key={x+1} value={x+1} > 
                                        {x+1}
                                        </option>
                            ))}
                            
                            
                                 </Form>
                            
                            </Col>
                        </Row>

                        </ListGroup.Item>

                    )}

                  <ListGroup.Item> 
                      <Button 
                       onClick={addToCartHandler}
                      className = 'btn-block' type='button' disabled={product.countInStock === 0 }> Dodaj u korpu </Button>
                  </ListGroup.Item>
    
    
                </ListGroup>
    
            </Card>
            
            </Col>
        </Row>
            
        )}
      
        
         </>
    )
}

export default ProductScreens
