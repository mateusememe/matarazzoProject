import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Tab, Container, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MinhaConta() {
  return (
    <React.fragment>
      <Container>
        <button className="btn bg-brown mt-3 w-30">
          <Link
            to='./'
            style={{ color: '#fce373', textDecoration: 'none' }}>
            INÍCIO
            </Link>
        </button>
        <h1 className="title">Minha Conta</h1>
        <Tab.Container>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Link active> Meus Dados</Nav.Link>
                <Nav.Link> Meus Ingressos</Nav.Link>
              </Nav>


            </Col>
            <Col sm={9}>

            </Col>



          </Row>

        </Tab.Container>
      </Container>
    </React.fragment >

  );
}