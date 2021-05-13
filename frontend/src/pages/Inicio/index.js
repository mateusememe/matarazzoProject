import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar'
import CarouselIni from '../../components/CarouselIni'

import CapaEvento from '../../components/CapaEvento'
import CapaCurso from '../../components/CapaCurso'
import CapaNoticia from '../../components/CapaNoticia'

import { DadosContext } from '../../context/DadosContext.js';

export default function Inicio() {
  const {
    carregarCursos, carregarEventos, carregarNoticias,
    eventos, cursos, noticias
  } = useContext(DadosContext);

  useEffect(() => {
    carregarEventos();
    carregarCursos();
    carregarNoticias();
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
              ? eventos.map((evento) => (
                <Col xs={3} className="mb-0" key={`${evento.eve_id}`}>
                  <CapaEvento data={evento} />
                </Col>
              ))
              : <span style={{ fontWeight: 'bold' }}>Não existem eventos</span>
            }
          </Row>
        </Col>
        <Col className="mb-4">
          <h1 className="title">Cursos Abertos</h1>
          <Row>
            {cursos.length !== 0
              ? Object.keys(cursos).map((key, index) => (
                <Col xs={3} className="mb-0" key={`${cursos[key].cur_id}`}>
                  <CapaCurso data={cursos[key]} />
                </Col>
              ))
              : <span style={{ textAlign: 'center' }}>Não existem cursos</span>
            }
          </Row>
        </Col>
        <Col className="mb-4">
          <h1 className="title">Ultimas Notícias</h1>
          <Row>
            {noticias.length !== 0
              ? noticias.map((noticia) => (
                <Col xs={3} className="mb-0" key={`${noticia.not_id}`}>
                  <CapaNoticia data={noticia} />
                </Col>
              ))
              : <span style={{ textAlign: 'center' }}>Não existem noticias</span>
            }
          </Row>
        </Col>
      </Container>
    </React.Fragment>
  );
}
