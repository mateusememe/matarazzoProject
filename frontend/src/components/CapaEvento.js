import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CapaEvento({ data }) {
    const history = useHistory();

    function abrirPagina(id, nome) {
        localStorage.setItem("eve_id", id);
        localStorage.setItem("eve_nome", nome)
        history.push('./selecionar-sessao');
    }

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <Card.Img variant="top" src={"uploads/" + data.eve_img} />
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.eve_nome}</Card.Title>
                    <Badge pill className="mb-auto" variant="warning">R${data.eve_valor}</Badge>
                </div>
                <Button className="mt-auto font-weight-bold" variant="success" block onClick={() => abrirPagina(data.eve_id, data.eve_nome)}>VER MAIS</Button>
            </Card.Body>
        </Card>
    )
}