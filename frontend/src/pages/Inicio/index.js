import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar'
import CarouselIni from '../../components/CarouselIni'

import CapaEvento from '../../components/CapaEvento'
import CapaCurso from '../../components/CapaCurso'
import CapaNoticia from '../../components/CapaNoticia'

import { DadosContext } from '../../context/DadosContext.js';
import InfoProvider/* , { InfoContext } */ from '../../context/InfoContext';

export default function Inicio() {
  const {
    carregarCursosAtivos, carregarEventosAtivos, carregarNoticias,
    eventosAtivos, cursosAtivos, noticias
  } = useContext(DadosContext);

  useEffect(() => {
    carregarEventosAtivos();
    carregarCursosAtivos();
    carregarNoticias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfoProvider>
      <Navbar />
      <CarouselIni />
      <Container className="mt-5">
        <Col className="mb-5">
          <h1 className="title">Proximos Eventos</h1>
          <Row>
            {eventosAtivos.length !== 0
              ? eventosAtivos.map((evento) => (
                <Col xs={3} className="mb-0 mt-4" key={`${evento.eve_id}`}>
                  <CapaEvento data={evento} />
                </Col>
              ))
              : <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Não existem eventos</span>
            }
          </Row>
        </Col>
        <Col className="mb-5">
          <h1 className="title">Cursos Abertos</h1>
          <Row>
            {cursosAtivos.length !== 0
              ? Object.keys(cursosAtivos).map((key, index) => (
                <Col xs={3} className="mb-0 mt-4" key={`${cursosAtivos[key].cur_id}`}>
                  <CapaCurso data={cursosAtivos[key]} />
                </Col>
              ))
              : <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Não existem cursos</span>
            }
          </Row>
        </Col>
        <Col className="mb-2">
          <h1 className="title">Ultimas Notícias</h1>
          <Row>
            {noticias.length !== 0
              ? noticias.map((noticia) => (
                <Col xs={4} className="mb-0 mt-4" key={`${noticia.not_id}`}>
                  <CapaNoticia data={noticia} />
                </Col>
              ))
              : <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Não existem noticias</span>
            }
          </Row>
        </Col>
      </Container>
    </InfoProvider>
  );
}
