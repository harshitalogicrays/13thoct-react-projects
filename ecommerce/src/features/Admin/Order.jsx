import React, { useEffect } from 'react'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../../redux/orderSlice'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Order = () => {
    const {data}=useFetchCollection('orders')
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    const orders=useSelector(selectorders)
  return (
    <Container className='mt-5'>
        <h1>My Orders</h1><hr/>
    <Table className='table table-bordered table-striped'>
        <thead>
            <tr><th>OrderID</th>
                    <th>UserEmail</th>
                <th>Order Date and Time</th>
                <th>Order Amount</th>
                <th>Order Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {orders.length==0 && <tr><td colSpan={5}>No order found</td></tr>}
            {orders.map((order)=>
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userEmail}</td>
                    <td>{order.orderDate} at {order.orderTime}</td>
                    <td>{order.totalAmount}</td>
                    <td><span className={order.orderStatus != 'Delivered' ? 'text-danger':'text-success'}>{order.orderStatus}</span></td>
                    <td><Link
                        type="button"
                        class="btn btn-primary" to={`/admin/orders/details/${order.id}`}
                    >
                        View Order Details
                    </Link>
                    </td>
                </tr>
            )}
        </tbody>
    </Table>

</Container>
  )
}

export default Order
