import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { FaCouch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import './selecionar-assento.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SelecionarAssento() {
  const [assentosOcupados, setAssentosOcupados] = useState([]);
  const [fileiraAtual, setFileiraAtual] = useState(1);
  const [assentos, setAssentos] = useState([[]]);
  const [fileiras, setFileira] = useState([]);
  const sala_id = localStorage.getItem('sala_id');
  const eve_id = localStorage.getItem('eve_id');
  const [eve_nome, setEveNome] = useState('');
  const [ses_horarioInicio, setHorarioInicio] = useState('');
  const ses_id = localStorage.getItem('ses_id');
  const [selecionado, setSelecionado] = useState([[false]]);
  const [qtdeSelecionado, setQtde] = useState(0);

  async function carregarFileiras(sal_id) {
    const response = await api.get('/sala/qtdeFileiras/' + sal_id);
    let temp = [];
    for (let i = 1; i <= response.data[0].sal_qtdeFileira; i++)
      temp.push(i);
    setFileira(temp);
    /*
      const response = await api.get('/sala/qtdeFileiras/' + sal_id);
      let temp = [], tempAssentos= [];
      for (let i = 1; i <= response.data[0].sal_qtdeFileira; i++){
        temp.push(i);
        tempAssentos[i] = await api.get('/assentos/' + sala_id + '/' + i);
      }
      setAssentos(tempAssentos);
      setFileira(temp);
    */
  }

  async function carregarAssentosOcupados() {
    const response = await api.get('/assentosOcupados/' + eve_id + '/' + ses_id);
    console.log(response.data);
    setAssentosOcupados(response.data);
  }

  async function carregarAssentos(ast_fileira) {
    const response = await api.get('/assentos/' + sala_id + '/' + ast_fileira);
    const temp = assentos.slice();

    temp[ast_fileira] = response.data;
    console.log(temp);
    setAssentos(temp);

  }
  async function recuperarNomeEvento() {
    const response = await api.get('/eventos/' + eve_id);
    setEveNome(response.data[0].eve_nome);
  }
  function estaOcupado(ast_id) {
    let i;
    for (i = 0; i < assentosOcupados.length && assentosOcupados[i].ast_id != ast_id; i++);
    return i < assentosOcupados.length;
  }
  async function recuperarHorarioSessao() {
    const response = await api.get('/sessoes/' + ses_id);
    setHorarioInicio(response.data[0].ses_horarioInicio);
  }

  function selecionar(ast) {
    const temp = selecionado.slice()
    if (!selecionado[ast])
      setQtde(qtdeSelecionado + 1)
    else
      setQtde(qtdeSelecionado - 1)
    temp[ast] = !selecionado[ast]
    setSelecionado(temp);
  }

  useEffect(() => {
    recuperarHorarioSessao();
    recuperarNomeEvento();
    carregarFileiras(sala_id);
    carregarAssentosOcupados();
  }, []);

  return (
    <React.Fragment>
      <Container className="pt-5">
        <Navbar />
        <Col className="mt-5">
          <h1 className="text-center font-weight-bold mb-0">SELECIONAR ASSENTO</h1>
          <Row className="justify-content-center">
            <p className="ml-3 mr-3 font-weight-medium">{eve_nome}</p>
            <p className="ml-3 mr-3">sala {sala_id}</p>
            <p className="ml-3 mr-3">{ses_horarioInicio}</p>
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
          <select className='custom-select' defaultValue='0' onChange={e => { carregarAssentos(e.target.value); setFileiraAtual(e.target.value) }}>
            <option value='0' disabled >Selecionar fileira...</option>
            {
              fileiras.map((fileira, index) => (
                <option value={fileira} key={index} >Fileira {fileira}</option>
              ))
            }
          </select>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col>
            <h4 className="mb-0 font-weight-bold">Fileira {fileiraAtual}</h4>
            <Row className="borda-2 p-2">
              {assentos.length != 0
                ? assentos.map((teste, sindex) => (
                  teste.map((ast, index) => (
                    [sindex == fileiraAtual
                      ?
                      <Col className="justify-content-center align-itens-center ml-2 mr-2" key={`${ast.ast_num}`}>
                        <p className="text-center mb-0">{ast.ast_num}</p>
                        <Row className="align-items-center justify-content-center">
                          {
                            estaOcupado(ast.ast_id)
                              ? <FaCouch className="icone-sofa" size={36} color='#d0bb5f' />
                              :
                              [selecionado[ast.ast_id]
                                ? <FaCouch className="icone-sofa" size={36} color='#6bd84d' />
                                : <FaCouch className="icone-sofa" size={36} color='#231F20' />
                              ]
                          }
                          <input
                            id={ast.ast_id}
                            type="checkbox"
                            value={ast.ast_id}
                            disabled={estaOcupado(ast.ast_id)}
                            checked={selecionado}
                            onChange={() => {
                              selecionar(ast.ast_id);

                            }} />
                        </Row>
                      </Col>
                      : null]
                  ))
                ))
                : null
              }
            </Row>
            <Row className="justify-content-between">
              <p>A fileira 1 é a mais próxima do palco.</p>
              <p>Quantidade de assentos selecionados: {qtdeSelecionado}</p>
            </Row>
          </Col>
        </Row>
      </Container >
    </React.Fragment >
  );
}