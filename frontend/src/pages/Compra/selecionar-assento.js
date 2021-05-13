import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { FaCouch } from 'react-icons/fa';

import './selecionar-assento.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SelecionarAssento() {
  let fileiras = [];
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [fileiraAtual, setFileiraAtual] = useState(1);
  const [assentos, setAssentos] = useState([]);

  /* async function carregarFileiras(sal_id) {
    const response = await api.get('/sala/qtdeFileiras/' + sal_id);
    console.log(response);
    for (let i = 1; i <= response.data[0].sal_qtdeFileira; i++) {
      fileiras.push(<option value={i} key={i}>Fileira {i}</option>);
    }
    console.log(fileiras);
  } */

  async function carregarAssentosOcupados(eve_id, ses_id) {
    const response = await api.get('/assentosOcupados/' + eve_id + '/' + ses_id);
    console.log("ocupados: " + response.data);
    setAssentosOcupados(response.data);
  }
  async function carregarAssentos(sal_id, ast_fileira) {
    const response = await api.get('/assentos/' + sal_id + '/' + ast_fileira);
    console.log("assentos:" + response.data);
    setAssentos(response.data);
  }

  useEffect(() => {
    //carregarFileiras(1);
    carregarAssentosOcupados(8, 1);
    carregarAssentos(1, 1);
  }, []);

  return (
    <React.Fragment>
      <Container className="pt-5">
        <Navbar />
        <Col className="mt-5">
          <h1 className="text-center font-weight-bold mb-0">SELECIONAR ASSENTO</h1>
          <Row className="justify-content-center">
            <p className="ml-3 mr-3 font-weight-medium">nome do evento</p>
            <p className="ml-3 mr-3">sala ?</p>
            <p className="ml-3 mr-3">horario: 00:00</p>
          </Row>
        </Col>

        <Col className="mt-5">
          <h1 className="text-center">Legenda</h1>
          <Row className="justify-content-center align-items-center">
            <FaCouch size={36} color='#231F20' /> <p className="mb-0 ml-3 mr-3">Disponível</p>
            <FaCouch size={36} color='#6BD84D' /> <p className="mb-0 ml-3 mr-3">Selecionado</p>
            <FaCouch size={36} color='#D0BB5F' /> <p className="mb-0 ml-3 mr-3">Ocupado</p>
          </Row>
        </Col>

        <Row className="mt-5 justify-content-center">
          {fileiras}
          <select className='custom-select' defaultValue='null'>
            <option value='null' disabled>Selecionar fileira...</option>
          </select>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col>
            <h4 className="mb-0 font-weight-bold">Fileira {fileiraAtual}</h4>
            <Row className="borda p-2">
              {assentos.length != 0
                ? assentos.map((ast, index) => (
                  <input type="select" value={ast.ast_id} key={`${ast.ast_num}`}>{ast.ast_num}</input>
                ))
                : null
              }
              <Col className="justify-content-center">
                <p className="text-center m-0"></p>
                <FaCouch size={36} color='#231F20' />
              </Col>

            </Row>
            <Row className="justify-content-between">
              <p>A fileira 1 é a mais próxima do palco.</p>
              <p>Quantidade de assentos selecionados: ?</p>
            </Row>
          </Col>

        </Row>
      </Container >
    </React.Fragment >
  );
}