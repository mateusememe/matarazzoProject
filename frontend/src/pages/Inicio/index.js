import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import api from '../../services/api'
import Navbar from '../../components/Navbar'
import CapaEvento from '../../components/CapaEvento'
import CarouselIni from '../../components/CarouselIni'

import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inicio() {
    const [eventos, setEvento] = useState([]);

    async function carregarEventos(params) {
        const response = await api.get('/eventos');
        setEvento(response.data);
    }

    useEffect(() => {
        carregarEventos();
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <CarouselIni />
            <Container className="mt-1">
                <Col className="mb-4">
                    <h1 className="title">Proximos Eventos</h1>
                    <Row>
                        {eventos.map(evento => (
                            <Col xs={3} className="mb-0" key={`${evento.eve_id}`}>
                                <CapaEvento data={evento} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Container>
        </React.Fragment>
    );
}