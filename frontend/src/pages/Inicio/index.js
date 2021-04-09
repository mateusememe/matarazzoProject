import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import api from '../../services/api'
import Navbar from '../../components/Navbar'
import CapaEvento from '../../components/CapaEvento'
import CapaCurso from '../../components/CapaCurso'
import CarouselIni from '../../components/CarouselIni'

import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inicio() {
    const [eventos, setEvento] = useState([]);
    const [cursos, setCurso] = useState([]);

    async function carregarEventos() {
        const response = await api.get('/eventos');
        setEvento(response.data);
    }

    async function carregarCursos() {
        const response = await api.get('/cursos');
        setCurso(response.data);
    }

    useEffect(() => {
        carregarEventos();
        carregarCursos();
        return () => {
            setEvento({});
            setCurso({});
        };
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <CarouselIni />
            <Container className="mt-1">
                <Col className="mb-4">
                    <h1 className="title">Proximos Eventos</h1>
                    <Row>
                        {eventos.length !== 0
                            ? eventos.map(evento => (
                                <Col xs={3} className="mb-0" key={`${evento.eve_id}`}>
                                    <CapaEvento data={evento} />
                                </Col>

                            ))
                            : <span style={{ textAlign: 'center' }}>Não existem cursos</span>
                        }
                    </Row>
                </Col>
                <Col className="mb-4">
                    <h1 className="title">Cursos Abertos</h1>
                    <Row>
                        {cursos.length !== 0
                            ? cursos.map(curso => (
                                <Col xs={3} className="mb-0" key={`${curso.cur_id}`}>
                                    <CapaCurso data={curso} />
                                </Col>
                            ))
                            : <span style={{ textAlign: 'center' }}>Não existem cursos</span>
                        }
                    </Row>
                </Col>
            </Container>
        </React.Fragment>
    );
}
