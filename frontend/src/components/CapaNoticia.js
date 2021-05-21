import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './capas.css'
export default function CapaNoticia({ data }) {

  function formatarData(temp) {
    if (temp) {
      temp = temp.split("T")[0];
      const dia = temp.split("-")[2];
      const mes = temp.split("-")[1];
      const ano = temp.split("-")[0];

      return dia + "/" + mes + "/" + ano;
    }
  }

  function formatarDesc(desc) {
    return desc.substring(0, 70) + "...";
  }

  return (
    <Card>
      <Card.Body>
        <Row className="mb-2">
          <Col xs={4}>
            <Card.Img style={{ borderRadius: '50%', minHeight: '100%', width: '85%', objectFit: 'cover' }} src={"uploads/not_img.jpg"} />
          </Col>
          <Col xs={8} className="p-0">
            <Card.Title className="font-weight-bold font-brown">{data.not_titulo}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Categ{data.not_categoria}</Card.Subtitle>
          </Col>
        </Row>
        <Card.Text>
          {formatarDesc(data.not_descricao)}
          <a href="./" style={{ fontSize: '14px' }}>Continuar Lendo</a>
        </Card.Text>
        <Card.Text className="text-right">{formatarData(data.not_data)}</Card.Text>
      </Card.Body>
    </Card>
  )
}