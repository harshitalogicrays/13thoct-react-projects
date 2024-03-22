import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';

const ChangeOrderStatus = ({id,order_status,order}) => {
    let [status,setStatus]=useState(order_status)
    const navigate=useNavigate()
    let handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const docRef=doc(db,"orders",id)
            await setDoc(docRef,{
                ...order,
                orderStatus:status,
                createdAt:order.createdAt,
                editedAt:Timestamp.now().toMillis()
            })

            emailjs.send('service_a8dsm3m', 'template_wwrc5ya', 
            {user_email:order.userEmail,order_status:status,amount:order.totalAmount}, {
              publicKey: 'ouyyULNr1Fl9QYxiJ',
            })
            .then( () => {
                toast.success("order status updated")
                navigate('/admin/orders')
              },(error) => { toast.error(error.text)  },
            );            
        }
        catch(err){
            toast.error(err.message)
        }
    }
  return (
    <div className='col-6'>
        <h1>Update Order Status</h1><hr/>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="" class="form-label">Update Status</label>
                <select class="form-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option >Select one</option>
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                </select>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
            >
                Submit
            </button>
            
      </form>
    </div>
  )
}

export default ChangeOrderStatus
