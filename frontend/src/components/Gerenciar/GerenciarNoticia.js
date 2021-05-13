import React, { useState, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Table, Button
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import api from '../../services/api.js';
import Modal from '../Modal'
import { DadosContext } from '../../context/DadosContext.js';

export default function GerenciarNoticia(props) {
  //const history = useHistory();

  const [erroMsg, setErroMsg] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState('');
  const [noticia, setNot] = useState('');
  const [modal, setModal] = useState(false);

  const { carregarNoticias } = useContext(DadosContext);
  const { categorias } = useContext(DadosContext);
  const { noticias } = useContext(DadosContext);

  const [not_id, setIdNot] = useState('');
  const [not_titulo, setTituloNot] = useState('');
  const [not_data, setDataNot] = useState('');
  const [not_adm, setAdmNot] = useState(props.usuario);
  const [not_categoria, setCategoriaNot] = useState('DEFAULT');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function removerNoticia(id) {
    await api.delete(`/noticias/${id}`);
    carregarNoticias();
  }

  async function editarNoticia(id) {
    const response = await api.get('/noticias/' + id);
    setIdNot(id);
    setTituloNot(response.data[0].not_titulo);
    setDataNot(formatarData(response.data[0].not_data));
    setAdmNot(response.data[0].usu_id);
    setCategoriaNot(response.data[0].cat_id);
    setModal(true);
  }

  function limparFormNoticia() {
    setTituloNot('');
    setDataNot('');
    setAdmNot(props.usuario);
    setCategoriaNot('');
  }

  async function adicionarNoticia(e) {
    e.preventDefault();

    if (not_titulo && not_data && not_adm && not_categoria) {
      if (props.flag === 'add') {
        await api.post('/noticias', {
          not_titulo, not_data, not_adm, not_categoria
        });
        setSucessoMsg('Noticia adicionada com sucesso!');
      }
      else {
        await api.put('/noticias', {
          not_titulo, not_data, not_adm, not_categoria, not_id
        });
        setSucessoMsg('Noticia atualizada com sucesso!');
      }

      limparFormNoticia();
      await sleep(3000);
      setSucessoMsg(false);
      carregarNoticias();
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

  if (props.flag === 'add')
    return (
      <React.Fragment>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <div style={{ minWidth: '50vh' }}>
              <h3 className='title'>Adicionar Nova Notícia</h3>
              <form
                method='post'
                onSubmit={adicionarNoticia}>
                <div className='form-col form-group'>
                  <div className='col'>
                    <input
                      className='form-ctrl'
                      type='text'
                      name='not_titulo'
                      id='not_titulo'
                      value={not_titulo}
                      onChange={e => {
                        setTituloNot(e.target.value);
                        setErroMsg(false); setSucessoMsg(false);
                      }}
                      placeholder='Titulo da notícia...'></input>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <div className='col mt-4'>
                        <select
                          className='custom-select'
                          value={not_categoria}
                          onChange={e => {
                            setCategoriaNot(e.target.value);
                            setErroMsg(false); setSucessoMsg(false);
                          }}>
                          <option
                            value='DEFAULT'
                            disabled>
                            Escolher categoria...
																		</option>
                          {Object.keys(categorias).map((key, index) => (
                            <option
                              key={categorias[key].cat_id}
                              value={categorias[key].cat_id}>
                              {categorias[key].cat_nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Col>
                        <label className='mb-0'>
                          Data da noticia
																	</label>
                        <input
                          className='form-ctrl'
                          type='date'
                          name='not_data'
                          id='not_data'
                          value={not_data}
                          onChange={e => {
                            setDataNot(e.target.value);
                            setErroMsg(false);
                            setSucessoMsg(false);
                          }}></input>
                      </Col>
                    </div>
                  </div>
                </div>
                <Col>
                  {erroMsg ? (<span className='erro'>{erroMsg}</span>) : null}
                  {sucessoMsg ? (<span className='sucesso'>{sucessoMsg}</span>) : null}
                </Col>
                <div className='form-group d-flex flex-row-reverse p-3 mb-0'>
                  <button
                    className='btn bg-brown w-30'
                    type='submit'>
                    ADICIONAR
									</button>
                </div>
              </form>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <Table responsive hover size="sm">
          <thead>
            <tr>
              <th>#</th><th>Nome</th><th>Status</th><th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {noticias.length !== 0
              ? Object.keys(noticias).map((key, index) => (
                <tr key={`${noticias[key].not_id}`}>
                  <td>{noticias[key].not_id}</td>
                  <td>{noticias[key].not_titulo}</td>
                  <td>{noticias[key].not_status}</td>
                  <td>
                    <Button
                      onClick={() => setNot(noticias[key].not_id)}
                      className='m-0 p-0 border-0 bg-transparent'>
                      <FiEdit style={{ color: '#231f20' }} />
                    </Button>
                    <Button
                      onClick={() => removerNoticia(noticias[key].not_id)}
                      className='ml-2 p-0 border-0 bg-transparent'>
                      <FiTrash style={{ color: '#231f20' }} />
                    </Button>
                  </td>
                </tr>
              ))
              : <tr>
                <td colSpan='4'> Não há notícias cadastradas</td>
              </tr>
            }
          </tbody>
        </Table>
        {modal
          ? <Modal onClose={() => setModal(false)}>
            <Col className='p-5'>
              <h3>Confirmar operação?</h3>
              <Row className='justify-content-center'>
                <Button
                  className='bg-brown border-0'
                  onClick={() => removerNoticia(noticia)}>
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