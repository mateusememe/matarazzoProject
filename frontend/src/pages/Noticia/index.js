import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '../../components/BannerNoticia';
import Navbar from '../../components/Navbar'
import { useHistory } from 'react-router-dom';
import './noticia.css';

export default function VisualizarNoticia() {
  const [noticia, setNoticia] = useState([]);
  const [nome, setNome] = useState('');
  const [usu_id, setUsu_id] = useState('');
  const not_id = localStorage.getItem("not_id");

  async function carregaAutorNot(id) {
    let resp = await api.get('/usuarios/id/' + id);
    let dataUsu = JSON.parse(JSON.stringify(resp.data[0]));
    console.log("Nome Autor: " + dataUsu.usu_nome);
    let nomeUsu = dataUsu.usu_nome;
    setNome(nomeUsu);
  }
  async function carregarNoticiaID(id) {
    let response = await api.get('/noticias/' + id);
    console.log("Id: " + id + "\nResponse Noticia Carregada: " + response.data[0]);

    setNoticia(response.data[0]);
    console.log("Noticia Img:" + noticia.not_img);

    setUsu_id(noticia.usu_id);
  }
  useEffect(() => {
    carregarNoticiaID(not_id);
    carregaAutorNot(usu_id);
  }, [not_id, usu_id]);

  return (
    <React.Fragment>
      <Navbar />
      <Banner data={JSON.stringify(noticia)} tipo={'noticia'} />
      <Container>
        <Row className="mb-5 ml-5">
          <Col className="d-flex justify-content-center p-0 pl-2 pr-2">
            {noticia.length !== 0
              ?
              <>
                <Container>
                  <Row>
                    <p className="noticia-desc" style={{ textAlign: 'center' }}>{noticia.not_descricao}</p>
                  </Row>
                  <Row className="justify-content-end">
                    <p className="noticia-text mt-1">
                      <i><strong>Autor:</strong>&nbsp;{nome}</i>
                    </p>
                  </Row>
                </Container>
              </>
              :
              <span style={{ textAlign: 'center' }}>Esta notícia não existe</span>
            }
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  );
}