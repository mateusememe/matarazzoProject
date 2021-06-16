import React, { useState, useContext, useEffect } from 'react';
import {
  Row, Col, Table, Button
} from 'react-bootstrap';
import { FiPlus, FiMinus, FiTrash, FiEdit } from 'react-icons/fi';
import { FaCouch } from 'react-icons/fa';
import api from '../../services/api.js';
import { DadosContext } from '../../context/DadosContext.js';
import Modal from '../Modal'

export default function GerenciarSala({ flag }) {
  const [fileiras, setFileira] = useState([]);
  const [sal_nome, setSalNome] = useState('');
  const [sal_qtdeAssento, setQtdeAssento] = useState();
  const [sal_qtdeFileira, setQtdeFileira] = useState();
  const [sala, setIdSal] = useState('');
  const [modal, setModal] = useState(false);
  const { salas, carregarSalas } = useContext(DadosContext);
  const [done, setDone] = useState(false);
  var lastId = 0;

  function adicionarFileira() {
    lastId++;
    setFileira([...fileiras, { id: lastId, assentos: [1] }]);
  }

  function adicionarAssento(ast_fileira, num) {
    var fls = fileiras.slice();
    fls[ast_fileira].assentos.push({ num });
    setFileira(fls);
  }

  function removerFileira() {
    setFileira(fileiras.slice(0, fileiras.length - 1));
  }

  async function removerSala(id) {
    let sal_id = id;
    let response = await api.delete('/assentos/sala/' + sal_id);
    if (response.length !== 0) {
      response = await api.delete(`/salas/${id}`);
    }
    carregarSalas();
    setModal(false);
  }

  function removerAssento(ast_fileira, num) {
    var fls = fileiras.slice();
    fls[ast_fileira].assentos.pop();
    if (fls[ast_fileira].assentos.length == 0) {
      fls.splice(ast_fileira, 1);
      fls = fls.slice();
    }
    setFileira(fls);
  }

  async function concluir() {
    let sal_id, ast_numero, ast_fileira;
    setQtdeFileira(fileiras.length);
    setQtdeAssento(0);
    //gravar o registro de uma sala
    console.log(sal_nome, sal_qtdeAssento, sal_qtdeFileira);
    const response = await api.post('/salas', {
      sal_nome, sal_qtdeAssento, sal_qtdeFileira
    });
    console.log(response);
    if (response.length !== 0) {
      sal_id = response.data.lastId;
      let qtdeAssento = 0;
      for (let i = 0; i < fileiras.length; i++) {
        ast_fileira = i + 1;
        for (let j = 0; j < fileiras[i].assentos.length; j++) {
          ast_numero = j + 1;
          //gravar o registro de assentos de uma determinada fileira
          await api.post('/assentos', {
            sal_id, ast_numero, ast_fileira
          })
        }
        qtdeAssento += fileiras[i].assentos.length;
      }
      setQtdeAssento(qtdeAssento);
      //console.log(sal_id, sal_nome, sal_qtdeAssento, sal_qtdeFileira)
      const resPut = await api.put('/salas',
        { sal_id, sal_nome, sal_qtdeAssento, sal_qtdeFileira });
      setDone(true);
    }
  }

  useEffect(() => {
    adicionarFileira();
  }, []);

  if (flag == 'add')
    return (
      <React.Fragment>
        {done
          ?
          <h1>Adicionado com sucesso!</h1>
          :
          <Col>
            <Row className="m-0 justify-content-center">
              <Col>
                <h3 className='title mb-5 p-0'>Criar Sala</h3>
                <form
                  method='post'
                  encType='multipart/form-data'
                  onSubmit={concluir}>
                  <Row className="justify-content-center ">
                    <input
                      className='form-ctrl w-50 mb-2'
                      type='text'
                      name='sal_nome'
                      id='sal_nome'
                      value={sal_nome}
                      onChange={e => {
                        setSalNome(e.target.value);
                        /* setErroMsg(false);
                        setSucessoMsg(false); */
                      }}
                      placeholder='Nome da sala...'>

                    </input>
                  </Row>
                </form>
                <Row className="mb-3 justify-content-center">
                  <Col>
                    <Row className="justify-content-center">
                      <button onClick={() => adicionarFileira()} className="btn bg-brown mr-2">
                        <FiPlus />
                      </button>
                      <button onClick={() => removerFileira()} className="btn bg-brown">
                        <FiMinus />
                      </button>
                    </Row>
                    <p className="m-0 mt-1 font-weight-bold text-center">Fileiras</p>
                  </Col>
                </Row>
                {
                  fileiras.map((item, i) => (
                    <Row id={item.id} key={i} className="m-0 align-items-center">
                      <Row className="m-2">
                        <button onClick={() => adicionarAssento(i, item.assentos.length)} className="btn bg-brown mr-2">
                          <FiPlus />
                        </button>
                        <button onClick={() => removerAssento(i, item.assentos.length)} className="btn bg-brown">
                          <FiMinus />
                        </button>
                      </Row>
                      <Row id={item.id} className="borda-2 p-2 mt-2 m-0 justify-content-start">
                        {
                          item.assentos.map((ast, j) => (
                            <Col className="justify-content-center m-0" key={j}>
                              <p className="text-center mb-0">{j + 1}</p>
                              <FaCouch size={30} color='#231F20' />
                            </Col>
                          ))
                        }
                      </Row>

                    </Row>
                  ))
                }

              </Col>
            </Row>
            <Row className="justify-content-center">
              <button
                className='btn bg-brown w-100 mt-4'
                type='submit'
                onClick={() => concluir()}>
                CONFIRMAR
              </button>
            </Row>
          </Col>
        }
      </React.Fragment >
    );
  else
    return (
      <React.Fragment>
        <h3 className='title pt-0'>Salas Cadastradas</h3>
        <div style={{ height: '50vh', overflow: 'auto' }}>
          <Table responsive hover size='sm'>
            <thead>
              <tr>
                <th>#</th><th>Nome</th><th>Quantidade de assentos</th><th>Quantidade de fileiras</th><th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {
                salas.map((sala) => (
                  <tr key={`${sala.sal_id}`}>
                    <td>{sala.sal_id}</td>
                    <td>{sala.sal_nome}</td>
                    <td>{sala.sal_qtdeAssento}</td>
                    <td>{sala.sal_qtdeFileira}</td>
                    <td>
                      <Button
                        onClick={() => { setIdSal(sala.sal_id); setModal(true) }}
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
        {modal
          ?
          <Modal onClose={() => setModal(false)}>
            <Col className='p-5'>
              <h3>Confirmar operação?</h3>
              <Row className='justify-content-center'>
                <Button
                  className='bg-brown border-0'
                  onClick={() => removerSala(sala)}>
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
