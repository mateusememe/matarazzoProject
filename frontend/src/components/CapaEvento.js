import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function CapaEvento({ data }) {

    function formatarData(temp) {
        temp = temp.split("T")[0];
        const dia = temp.split("-")[2];
        const mes = temp.split("-")[1];
        const ano = temp.split("-")[0];

        return dia + "/" + mes + "/" + ano;
    }
    
    return (
        <Card className="h-100 shadow-sm bg-transparent rounded">
            <Card.Img variant="top" src="https://i.imgur.com/CSIWGtD.jpg"/>
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.eve_nome}</Card.Title>
                    <Badge pill className="mb-1" variant="warning">R${data.eve_valor}</Badge>
                </div>
                <Card.Text className="text-secundary">Dia: {formatarData(data.eve_data)}</Card.Text>

                <Button className="mt-auto font-weight-bold" variant="success" block >Ver Mais</Button>
            </Card.Body>
        </Card>
    )
}