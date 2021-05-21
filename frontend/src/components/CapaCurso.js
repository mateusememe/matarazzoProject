import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function CapaCurso({ data }) {

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <Card.Img variant="top" src={"uploads/" + data.cur_img} />
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.cur_nome}</Card.Title>
                    <Badge pill className="mb-1" variant="warning">R${data.cur_valor}</Badge>
                </div>

                <Button className="mt-auto font-weight-bold" variant="success" block >VER MAIS</Button>
            </Card.Body>
        </Card>
    )
}