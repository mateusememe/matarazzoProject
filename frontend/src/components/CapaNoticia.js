import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

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

  return (
    <Card className="h-100 shadow-sm bg-white rounded">
      {/* <Card.Img variant="top" src={"uploads/" + data.not_img} /> */}
      <Card.Body className="d-flex flex-column">
        <Card.Img />
        <div className="d-flex mb-2 justify-content-between">
          <Card.Title className="mb-0 font-weight-bold">{data.not_titulo}</Card.Title>
          <Badge pill className="mb-1" variant="warning">{formatarData(data.not_data)}</Badge>
        </div>
        <Card.Text className="text-secundary">{data.not_descricao}</Card.Text>
        <Button className="mt-auto font-weight-bold" variant="success" block >Ver Mais</Button>
      </Card.Body>
    </Card>
  )
}