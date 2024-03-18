import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Table } from 'react-bootstrap'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectSliders, store_sliders } from '../../redux/sliderSlice'
import {FaPen, FaTrash} from 'react-icons/fa'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
const ViewSlider = () => {
  const {data}=useFetchCollection('sliders')
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(store_sliders(data))
  },[data])

  const allSliders=useSelector(selectSliders)

  let handleDelete=(id,image)=>{
    if(window.confirm("are you sure to delete this??")){
      deleteObject(ref(storage,image))
      deleteDoc(doc(db,'sliders',id))
      toast.success("slider deleted")
    }
  }
  return (
    <Container className='mt-5 shadow p-2'>
    <Card>
        <Card.Header>
            <h4>View Sliders 
                <Button type="button" variant="danger" as={Link} to='/admin/addslider' className='float-end'>Add Slider</Button></h4>
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allSliders.length==0 && <tr><td colSpan={6}>No Slider Found</td></tr>}
                {allSliders.map((s,i)=>
                  <tr key={s.id}>
                    <td>{i+1}</td>
                    <td>{s.title}</td>
                    <td><img src={s.image} width={50} height={50}/></td>
                    <td>{s.desc}</td>
                    <td>{s.status=="active"? <span
                      class="badge rounded-pill text-bg-success">Active</span>
                      :
                      <span
                      class="badge rounded-pill text-bg-danger">Inactive</span>
                    }</td>
                    <td>
                      <Link type="button" class="btn btn-success me-2" 
                      to={`/admin/editslider/${s.id}`} ><FaPen/></Link>
                      <button type="button" class="btn btn-danger me-2" 
                      onClick={()=>handleDelete(s.id,s.image)} ><FaTrash/></button>

                    </td>
                  </tr>
                )}
              </tbody>
    </Table>
        </Card.Body>
    </Card>
</Container>
  )
}

export default ViewSlider
