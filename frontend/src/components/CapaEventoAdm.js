import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiDelete, FiEdit } from "react-icons/fi"
import api from '../services/api'

export default function CapaEvento({ data }) {
    async function removerEvento(id) {
        await api.delete(`/eventos/${id}`);
        window.location.reload();
    }

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <div className="d-flex justify-content-end p-2">
                <Button className="m-0 p-0 border-0 bg-transparent"><FiEdit style={{color: "#231f20"}} /></Button>
                <Button onClick={() => removerEvento(data.eve_id)} className="ml-2 p-0 border-0 bg-transparent"><FiDelete style={{color: "#231f20"}} /></Button>
            </div>
            <Card.Img variant="top" src={"uploads/" + data.eve_img}/>
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <Card.Title className="mb-0 font-weight-bold">{data.eve_nome}</Card.Title>
            </Card.Body>
        </Card>
    )
}