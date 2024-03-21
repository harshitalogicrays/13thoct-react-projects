import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import Loader from './Loader'
import useFetchCollection from '../customhook/useFetchCollection'
import ReactPaginate from 'react-paginate'
const ProductList = ({products}) => {
  const {data:categories}=useFetchCollection("categories")

  const itemsPerPage=2
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems,setCurrentItems]=useState([])
  const [pageCount,setPageCount]=useState(0)

  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(products.length / itemsPerPage))
  },[itemOffset,currentItems,products])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
      setItemOffset(newOffset);
  };



  return (
    <Container fluid>
      <Row className='mt-5'>
        <Col xs={2}>
            <Card>
              <Card.Header>Categories</Card.Header>
              <Card.Body>
                {categories.map((c,i)=>
                  <Form.Check key={i}
                    type="radio"
                    name="category"
                    label={c.title}                  />
              )}
              </Card.Body>
            </Card>
        </Col>
        <Col xs={10}>
        {products.length==0 && <h1>No Product Found</h1>}
        <Row>
        {currentItems.map((product)=><ProductItem key={product.id} product={product}/>)}
      
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeLinkClassName="page-item active"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
      />
        </Row>

        </Col>
      </Row>
   
    </Container>
  )
}

export default ProductList
