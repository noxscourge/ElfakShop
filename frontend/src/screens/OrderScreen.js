import React, {useEffect} from 'react'
import {Button, Row,Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import {getOrderDetails,payOrder,deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({match,history}) => {
  
    const dispatch = useDispatch()
    const orderId = match.params.id
    

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order,loading,error} = orderDetails

    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin


    const orderPay = useSelector(state=>state.orderPay)
    const {success:successPay} = orderPay

    const orderDeliver = useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver} = orderDeliver

    const addDecimals = (num) => 
    {
        return (Math.round(num*100)/100).toFixed(2)
    }


    const ProknjiziUplatu = () =>
    {
     
          
          dispatch(payOrder(orderId))
          
         window.location.reload(false);
         history.push('/')
    }


     useEffect(() => {
       
        dispatch(getOrderDetails(orderId))
       
        if(successPay)
        {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch,orderId,successPay])

    const deliverHandler = () =>
    {
        dispatch(deliverOrder(orderId))
        window.location.reload(false);
    }
  
    return (
        loading ? < Loader/> : error ? <Message variant='danger'>{error}</Message>
        :<> 
        <h1>Order {order._id} </h1> 
        <Row>

<Col md={8}>
    <ListGroup variant='flush'> 
    <ListGroup.Item>
        <h2> Shipping </h2>
        <p>
        <strong> Ime: </strong> {order.user.name} </p>
        <p> Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        </p>
        <p> 
         <strong>Adresa:</strong>
         {order.shippingAddress.address},
         {order.shippingAddress.city},
         {order.shippingAddress.postalCode} ,
         {order.shippingAddress.country}   ,
          
        </p>


      
       {order.isDelivered ? <Message variant='success' > Isporuceno </Message> 
       : <Message variant='danger'> Nije isporuceno </Message> }


    </ListGroup.Item> 

    <ListGroup.Item>
        <h2> Metoda Placanja </h2>
        <p>
       {order.paymentMethod}
       </p> 
       {order.isPaid  ?  <Message variant='success' > Placeno {order.paidAt} </Message> 
       : <Message variant='danger'> Nije placeno </Message> }
    </ListGroup.Item> 



    <ListGroup.Item>
       <h2> Porucene stavke </h2>
       {order.orderItems.length === 0 ? <Message>Porudzbina je prazna! </Message>
       : (
           <ListGroup variant='flush'>
               {order.orderItems.map((item,index)=>(
                   <ListGroup.Item key={index}>
                       <Row>
                        <Col md={1}>
                            <Image src={item.image} alt={item.name}
                            fluid rounded > 
                            </Image>
                        </Col>
                        <Col>
                        <Link to={`/product/${item.product}`}>
                            {item.name}
                        </Link>
                        </Col>
                        <Col md={6}>
                            {item.qty} x {item.price} dinara = {item.qty * item.price} dinara
                        </Col>
                       </Row>
                  </ListGroup.Item>
               ))}
           </ListGroup>
       )}
    </ListGroup.Item>
   
   
    </ListGroup>
</Col>
<Col md={4}>
    <Card>
        <ListGroup variant='flush'>
       <ListGroup.Item>
           <h2> Racun </h2>
       </ListGroup.Item>
       <ListGroup.Item>
           <Row>
                <Col>Stavke</Col>
                <Col>{order.totalPrice - order.shippingPrice} dinara</Col>
           </Row>

       </ListGroup.Item>

       <ListGroup.Item>
           <Row>
                <Col>Shipping</Col>
                <Col>{order.shippingPrice} dinara</Col>
           </Row>

       </ListGroup.Item>

       <ListGroup.Item>
           <Row>
                <Col>Ukupno</Col>
                <Col>{order.totalPrice} dinara</Col>
           </Row>

       </ListGroup.Item>
               
       
        <Button variant='primary' disabled = {order.isPaid===true}  onClick={()=> ProknjiziUplatu()} > Plati </Button> 
       


                {userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block' 
                        onClick={
                            deliverHandler}>
                                Cekiraj kao isporuceno
                        </Button>
                    </ListGroup.Item>
                }

        </ListGroup>
    </Card>
</Col>
</Row>
        </>
    )
}


export default OrderScreen
