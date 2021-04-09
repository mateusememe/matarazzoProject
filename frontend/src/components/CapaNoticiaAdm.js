import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiDelete, FiEdit } from "react-icons/fi"
import api from '../services/api'

export default function CapaNoticia({ data }) {
    async function removerNoticia(id) {
        await api.delete(`/noticias/${id}`);
        window.location.reload();
    }

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <div className="d-flex justify-content-end p-2">
                <Button className="m-0 p-0 border-0 bg-transparent"><FiEdit style={{color: "#231f20"}} /></Button>
                <Button onClick={() => removerNoticia(data.not_id)} className="ml-2 p-0 border-0 bg-transparent"><FiDelete style={{color: "#231f20"}} /></Button>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-0 font-weight-bold">{data.not_titulo}</Card.Title>
            </Card.Body>
        </Card>
    )   
}