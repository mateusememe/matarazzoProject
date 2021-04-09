import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

export default function CapaEvento({ data }) {

    function formatarData(temp) {
        if(temp) {
            temp = temp.split("T")[0];
            const dia = temp.split("-")[2];
            const mes = temp.split("-")[1];
            const ano = temp.split("-")[0];
    
            return dia + "/" + mes + "/" + ano;
        }
    }

    function formatarHora(temp) {
        if(temp) {
            temp = temp.split(":");
            return temp[0]+":"+ temp[1];
        }
    }
    
    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <Card.Img variant="top" src={"uploads/" + data.eve_img}/>
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.eve_nome}</Card.Title>
                    <Badge pill className="mb-1" variant="warning">R${data.eve_valor}</Badge>
                </div>
                <Card.Text className="text-secundary">Dia: {formatarData(data.eve_data)}</Card.Text>
                <Card.Text className="text-secundary">Hora: {formatarHora(data.eve_horario)}</Card.Text>
                <Button className="mt-auto font-weight-bold" variant="success" block >Ver Mais</Button>
            </Card.Body>
        </Card>
    )
}