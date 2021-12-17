import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header';
import { NavLink } from 'react-router-dom'
import './style.css'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return (
    <>
      <Header />
      {
        props.sidebar
          ?
          <Container fluid>
            <Row  >
              <Col md={2} className="sidebar">
                <ul>
                  <li><NavLink to={`/`} exact >Home</NavLink></li>
                  <li><NavLink to={`/account`} exact >Account</NavLink></li>
                  {/* <li><NavLink to={`/page`} exact >Page</NavLink></li> */}
                  <li><NavLink to={`/category`}>Category</NavLink></li>
                  <li><NavLink to={`/brand`}>Brand</NavLink></li>
                  <li><NavLink to={`/products`}>Products</NavLink></li>
                  <li><NavLink to={`/orders`}>Orders</NavLink></li>
                  <li><NavLink to={`/supplier`}>Supplier</NavLink></li>
                  <li><NavLink to={`/receipt`}>Receipt</NavLink></li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: 'auto', paddingTop:'100px' }}>
                {props.children}
              </Col>
            </Row>
          </Container>
          :
          props.children
      }

    </>
  )

}

export default Layout

