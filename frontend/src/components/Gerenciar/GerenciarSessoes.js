import React, { useState, useContext } from 'react';
import {
  Container, Row, Col, Button, Table
} from 'react-bootstrap';
import { DadosContext } from '../../context/DadosContext.js';
import api from '../../services/api.js';
import { FiTrash, FiEdit } from 'react-icons/fi';
import Modal from '../Modal'

export default function GerenciarSessoes(props) {
  const [ses_id, setSesId] = useState('');
  const [ses_horarioInicio, setSesHoraIni] = useState('');
  const [ses_qtdIng, setSesQtdIng] = useState(0);
  const [ses_data, setData] = useState('');
  const [sal_id, setSalId] = useState('');
  const [eve_id, setEveId] = useState('');
  const [ses, setSes] = useState('');
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [erroMsg, setErroMsg] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState('');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const {
    eventos, salas, sessoes, carregarSessoes
  } = useContext(DadosContext);

  async function adicionarSessao(e) {
    e.preventDefault();
    console.log(ses_horarioInicio, ses_qtdIng, ses_data, sal_id, eve_id);
    if (ses_horarioInicio && ses_qtdIng && ses_data && sal_id && eve_id) {
      if (props.flag) {
        await api.post('/sessoes', {
          ses_horarioInicio, ses_qtdIng, ses_data,
          sal_id, eve_id
        });
        setSucessoMsg('Sessão adicionada com sucesso!');
      } else {
        await api.put('/sessoes', {
          ses_horarioInicio, ses_qtdIng, ses_data,
          sal_id, eve_id, ses_id
        });
        setSucessoMsg('Sessão atualizado com sucesso!');
        carregarSessoes();
      }

      limparFormSessao();
      await sleep(3000);
      setSucessoMsg(false);
      setModalEditar(false);
    } else {
      setErroMsg('Preencha todos os campos!');
      await sleep(3000);
      setErroMsg(false);
    }
  }

  function formatarData(temp) {
    if (temp) {
      temp = temp.split('T')[0];
      const dia = temp.split('-')[2];
      const mes = temp.split('-')[1];
      const ano = temp.split('-')[0];

      return ano + '-' + mes + '-' + dia;
    }
  }

  async function editarSessao(id) {
    const response = await api.get('/sessoes/' + id);
    console.log(response);
    setSesId(id);
    setSesHoraIni(response.data[0].ses_horarioInicio);
    setSesQtdIng(response.data[0].ses_qtdeIng);
    setData(response.data[0].ses_data);
    setSalId(response.data[0].sal_id);
    setEveId(response.data[0].eve_id);
    setModalEditar(true);
  }

  async function removerSessao(id) {
    await api.delete(`/sessoes/${id}`);
    carregarSessoes();
    setModal(false);
  }

  async function limparFormSessao() {
    setSesId('');
    setSesHoraIni('');
    setSesQtdIng(0);
    setData('');
    setSalId('');
    setEveId('');
  }

  if (props.flag === 'add')
    return (
      <React.Fragment>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <div style={{ minWidth: '10vw' }}>
              <h3 className='title pt-0'>Adicionar Nova Sessão</h3>
              <form
                method='post'
                encType='multipart/form-data'
                onSubmit={adicionarSessao}>
                <div className='form-col form-group'>
                  <div className='form-row form-group pt-1 mb-0 align-items-center'>
                    <Col>
                      <label className='mb-0'>
                        Selecione a Sala
                      </label>
                      <select
                        className='custom-select w-100'
                        value={sal_id}
                        onChange={e => {
                          setSalId(e.target.value);
                          setErroMsg(false); setSucessoMsg(false);
                          // console.log("Setado Qtde ing: " + ses_qtdIng + "Qtde ingresso: " + salas[e.target.value].sal_qtdeAssento);
                        }}>
                        <option
                          value=''
                          disabled>
                          Escolher sala...
                        </option>
                        {salas.map((item) => (
                          <option
                            key={item.sal_id}
                            value={item.sal_id}>
                            {item.sal_nome}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </div>
                  <div className='form-row form-group pt-1 mb-0 align-items-center'>
                    <Col xs={8}>
                      <label className='mb-0'>
                        Selecione o Evento
                      </label>
                      <select
                        className='custom-select w-100'
                        value={eve_id}
                        onChange={e => {
                          setEveId(e.target.value);
                          setErroMsg(false); setSucessoMsg(false);
                        }}>
                        <option
                          value='DEFAULT'
                          disabled>
                          Escolher evento...
                        </option>
                        {eventos.map((item) => (
                          <option
                            key={item.eve_id}
                            value={item.eve_id}>
                            {item.eve_nome}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col>
                      <label className='mb-0'>
                        Total de Ingressos
                      </label>
                      <input
                        value={ses_qtdIng}
                        className='form-ctrl' type='number'
                        onChange={e => setSesQtdIng(e.target.value)}
                      />
                    </Col>
                  </div>
                  <div className='form-row form-group pt-1 mb-0 align-items-center'>
                    <Col className='mt-2'>
                      <label className='mb-0'>
                        Data da Sessao
                      </label>
                      <input
                        className='form-ctrl'
                        type='date'
                        name='ses_data'
                        id='ses_data'
                        value={ses_data}
                        onChange={e => {
                          setData(e.target.value);
                          setErroMsg(false);
                          setSucessoMsg(false);
                        }}></input>
                    </Col>
                    <Col className='mt-2'>
                      <label className='mb-0'>
                        Horario da Sessao
                      </label>
                      <input
                        className='form-ctrl'
                        type='time'
                        name='ses_horarioInicio'
                        id='ses_horarioInicio'
                        value={ses_horarioInicio}
                        onChange={e => {
                          setSesHoraIni(e.target.value);
                          setErroMsg(false);
                          setSucessoMsg(false);
                        }}></input>
                    </Col>
                  </div>
                </div>
                <Col>
                  {erroMsg ? (<span className='erro'>{erroMsg}</span>) : null}
                  {sucessoMsg ? (<span className='sucesso'>{sucessoMsg}</span>) : null}
                </Col>
                <Row className='m-0 flex-row-reverse'>
                  <button
                    className='btn bg-brown w-30'
                    type='submit'>
                    ADICIONAR
                  </button>
                </Row>
              </form>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        {
          modalEditar
            ? <Row className='align-items-center mb-5 justify-content-center'>
              <div style={{ minWidth: '10vw' }}>
                <h3 className='title pt-0'>Editar Sessão</h3>
                <form
                  method='post'
                  encType='multipart/form-data'
                  onSubmit={adicionarSessao}>
                  <div className='form-col form-group'>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <Col>
                        <label className='mb-0'>
                          Selecione a Sala
                        </label>
                        <select
                          className='custom-select w-100'
                          value={sal_id}
                          onChange={e => {
                            setSalId(e.target.value);
                            setErroMsg(false); setSucessoMsg(false);
                            setSesQtdIng(salas[e.target.value - 1].sal_qtdeAssento)
                          }}>
                          <option
                            value=''
                            disabled>
                            Escolher sala...
                          </option>
                          {salas.map((item) => (
                            <option
                              key={item.sal_id}
                              value={item.sal_id}>
                              {item.sal_nome}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </div>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <Col xs={8}>
                        <label className='mb-0'>
                          Selecione o Evento
                        </label>
                        <select
                          className='custom-select w-100'
                          value={eve_id}
                          onChange={e => {
                            setEveId(e.target.value);
                            setErroMsg(false); setSucessoMsg(false);
                          }}>
                          <option
                            value='DEFAULT'
                            disabled>
                            Escolher evento...
                          </option>
                          {eventos.map((item) => (
                            <option
                              key={item.eve_id}
                              value={item.eve_id}>
                              {item.eve_nome}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col>
                        <label className='mb-0'>
                          Total de Ingressos
                        </label>
                        <input
                          value={ses_qtdIng}
                          className='form-ctrl' type='number'
                          onChange={e => setSesQtdIng(e.target.value)}
                        />
                      </Col>
                    </div>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <Col className='mt-2'>
                        <label className='mb-0'>
                          Data da Sessao
                        </label>
                        <input
                          className='form-ctrl'
                          type='date'
                          name='ses_data'
                          id='ses_data'
                          value={ses_data}
                          onChange={e => {
                            setData(e.target.value);
                            setErroMsg(false);
                            setSucessoMsg(false);
                          }}></input>
                      </Col>
                      <Col className='mt-2'>
                        <label className='mb-0'>
                          Horario da Sessao
                        </label>
                        <input
                          className='form-ctrl'
                          type='time'
                          name='ses_horarioInicio'
                          id='ses_horarioInicio'
                          value={ses_horarioInicio}
                          onChange={e => {
                            setSesHoraIni(e.target.value);
                            setErroMsg(false);
                            setSucessoMsg(false);
                          }}></input>
                      </Col>
                    </div>
                  </div>
                  <Col>
                    {erroMsg ? (<span className='erro'>{erroMsg}</span>) : null}
                    {sucessoMsg ? (<span className='sucesso'>{sucessoMsg}</span>) : null}
                  </Col>
                  <Row className='m-0 flex-row-reverse'>
                    <button
                      className='btn bg-brown w-30'
                      type='submit'>
                      CONCLUIR
                    </button>
                  </Row>
                </form>
              </div>
            </Row>
            : null
        }
        <React.Fragment>
          <h3 className='title pt-0'>Sessões Cadastradas</h3>
          <div style={{ height: '50vh', overflow: 'auto' }}>
            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th>#</th><th>Evento</th><th>Horario</th><th>Ingressos</th><th>Data</th>
                  <th>Frequencia</th><th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {sessoes.map((sessao, index) => (
                  <tr key={`${sessao.ses_id}`}>
                    <td>{sessao.ses_id}</td>
                    <td>{sessao.eve_id}</td>
                    <td>{sessao.ses_horarioInicio}</td>
                    <td>{sessao.ses_qtdeIng}</td>
                    <td>{formatarData(sessao.ses_data)}</td>
                    <td>{sessao.ses_freq}</td>
                    <td>
                      <Button
                        onClick={() => editarSessao(sessao.ses_id)}
                        className='m-0 p-0 border-0 bg-transparent'>
                        <FiEdit style={{ color: '#231f20' }} />
                      </Button>
                      <Button
                        onClick={() => { setSes(sessao.ses_id); setModal(true) }}
                        className='ml-2 p-0 border-0 bg-transparent'>
                        <FiTrash style={{ color: '#231f20' }} />
                      </Button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
          </div>
        </React.Fragment>
        {modal
          ?
          <Modal onClose={() => setModal(false)}>
            <Col className='p-5'>
              <h3>Confirmar operação?</h3>
              <Row className='justify-content-center'>
                <Button
                  className='bg-brown border-0'
                  onClick={() => removerSessao(ses)}>
                  Sim
                </Button>
                <Button
                  className='ml-2 bg-brown border-0'
                  onClick={() => setModal(false)}>
                  Não
                </Button>
              </Row>
            </Col>
          </Modal>
          : null
        }
      </React.Fragment>
    );
}