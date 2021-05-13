import React from 'react'
import {
  Container, Col, Card
} from 'react-bootstrap';
import './banner.css'
import Navbar from './Navbar';

export default function Banner({ data }) {
  return (
    <React.Fragment>
      <Navbar />
      <Card className="bg-dark text-white border-0 rounded-0 mt-0 mb-5">
        <Card.Img className="cover border-0 rounded-0" src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80" alt="Card image" />
        <Card.ImgOverlay className="d-flex border-0 rounded-0 p-0 gradiente">
          <Container className="d-flex justify-content-start align-items-end">
            <Col>
              <Card.Title className="titulo-banner">ARTE DE RUA</Card.Title>
              <Card.Text className="resumo-banner">
                EXPOSIÇÃO DE ARTE UNDERGROUND
              </Card.Text>
            </Col >
          </Container>
        </Card.ImgOverlay>
      </Card>
    </React.Fragment >
  )
}