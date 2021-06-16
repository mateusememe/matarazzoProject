import React from 'react'
import {
  Container, Col, Card, Spinner, Row
} from 'react-bootstrap';
import './banner.css'
import Navbar from './Navbar';

export default function Banner({ data }) {
  return (
    <React.Fragment>
      {data.length !== 0
        ?
        <React.Fragment >
          <Navbar />
          <Card className="bg-dark text-white border-0 rounded-0 mt-0 mb-5" >
            <Card.Img className="cover border-0 rounded-0" src={'uploads/evento/' + data[0].eve_img} alt="Card image" />
            <Card.ImgOverlay className="d-flex border-0 rounded-0 p-0 gradiente">
              <Container className="d-flex justify-content-start align-items-end">
                <Col>
                  <Card.Title className="titulo-banner">{data[0].eve_nome}</Card.Title>
                  <Card.Text className="resumo-banner">
                    {data[0].eve_descricao}
                  </Card.Text>
                </Col >
              </Container>
            </Card.ImgOverlay>
          </Card>
        </React.Fragment >
        :
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      }

    </React.Fragment>

  )
}