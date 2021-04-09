import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiDelete, FiEdit } from "react-icons/fi"
import api from '../services/api'

export default function CapaCurso({ data }) {
    async function removerCurso(id) {
        await api.delete(`/cursos/${id}`);
        window.location.reload();
    }

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <div className="d-flex justify-content-end p-2">
                <Button className="m-0 p-0 border-0 bg-transparent"><FiEdit style={{color: "#231f20"}} /></Button>
                <Button onClick={() => removerCurso(data.cur_id)} className="ml-2 p-0 border-0 bg-transparent"><FiDelete style={{color: "#231f20"}} /></Button>
            </div>
            <Card.Img variant="top" src={"uploads/" + data.cur_img}/>
            <Card.Body className="d-flex flex-column">
                <Card.Img />
                <Card.Title className="mb-0 font-weight-bold">{data.cur_nome}</Card.Title>
            </Card.Body>
        </Card>
    )   
}