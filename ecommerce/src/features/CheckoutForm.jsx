import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import CheckoutSummary from "./CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { EMPTy_CART, selectTotalAmount, selectcartItems } from "../redux/cartSlice";
import { selectUserEmail, selectUserId } from "../redux/authSlice";
import { selectShippingAddress } from "../redux/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) { return; }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret" );
    if (!clientSecret) {  return; }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {return}
    setIsLoading(true);
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },redirect:"if_required"
    }).then((result)=>{
        if(result.error){
            toast.error(result.error.message);setMessage(result.error.message)
            return
        }
        if(result.paymentIntent){
            if(result.paymentIntent.status=='succeeded'){
                toast.success("payment done")
                setIsLoading(false)
                saveorder()                
            }
        }
    })
      setIsLoading(false);
  };

  const cartItems=useSelector(selectcartItems)
  const totalAmount=useSelector(selectTotalAmount)
  const userId=useSelector(selectUserId)
  const userEmail=useSelector(selectUserEmail)
  const shippingAddress=useSelector(selectShippingAddress)
//   console.log(shippingAddress)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    let saveorder=async()=>{
        let today=new Date()
        let orderDate=today.toLocaleDateString()
        let orderTime=today.toLocaleTimeString()
        let orderConfig={userId,userEmail,cartItems,totalAmount,shippingAddress, orderDate,orderTime, orderStatus:"Order Placed",createdAt:Timestamp.now().toMillis()}
        try{
            const docRef=collection(db,"orders")
            await addDoc(docRef,orderConfig)
            toast.success("order placed")
            dispatch(EMPTy_CART())
            navigate('/')
        }
        catch(error){
            toast.error(error.message)
        }
    }

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <Container className="mt-5  shadow p-3">
    <Row>
        <Col><CheckoutSummary/></Col>
        <Col>
            <h1>Stripe Payment Checkout</h1> <hr/>
            <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div class="d-grid gap-2 mt-3">
            <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary">
            <span id="button-text">
                {isLoading ? <div class="d-flex justify-content-center">
                            <div class="spinner-border text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            </div> : "Pay now"}
            </span>
            </button>
            </div>
            {message && <div id="payment-message">{message}</div>}
            </form>
        </Col>
    </Row>
</Container>


   
  );
}