import React, { useState, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Table, Button
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import api from '../../services/api.js';
import Modal from '../Modal'
import { DadosContext } from '../../context/DadosContext.js';

export default function GerenciarCategoria(props) {
  const [erroMsg, setErroMsg] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState('');
  const [categoria, setCat] = useState('');
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const { carregarCategorias, categorias } = useContext(DadosContext);

  const [cat_id, setCatId] = useState('');
  const [cat_nome, setCatNome] = useState('');
  const [cat_tipo, setTipo] = useState('');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function limparFormCategoria() {
    setCatNome('');
    setTipo('null');
  }

  async function removerCategoria(id) {
    const resp = await api.delete(`/categorias/${id}`);
    if (resp.data.status === false) {
      alert('Categoria em uso. Operação Falhou!');
    }
    carregarCategorias(null);
    setModal(false);
  }

  async function editarCategoria(id) {
    const response = await api.get('/categorias/id/' + id);
    setCatId(id);
    setCatNome(response.data[0].cat_nome);
    setTipo(response.data[0].cat_tipo);
    setModalEditar(true);
  }

  async function adicionarCategoria(e) {
    e.preventDefault();
    if (cat_nome && cat_tipo) {
      if (props.flag === 'add') {
        const resp = await api.get(
          '/categorias/' + cat_nome + '/' + cat_tipo
        );
        if (resp.data.length === 0) {
          await api.post('/categorias', {
            cat_nome, cat_tipo
          });
          setSucessoMsg('Categoria adicionada com sucesso!');
          await sleep(3000);
          setSucessoMsg(false);
        } else {
          setErroMsg('Categoria já existente!');
        }
      }
      else {
        await api.put('/categorias', {
          cat_id, cat_nome, cat_tipo
        });
        setSucessoMsg('Categoria alterada com sucesso!');

      }

      limparFormCategoria();
      carregarCategorias(null);
      await sleep(3000);
      setModalEditar(false);
      setSucessoMsg(false);
    } else {
      setErroMsg('Preencha todos os campos!');
      await sleep(3000);
      setErroMsg(false);
    }
  }

  if (props.flag === 'add')
    return (
      <React.Fragment>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <div style={{ minWidth: '50vh' }}>
              <h3 className='title p-0 pb-3'>Adicionar Nova Categoria</h3>
              <form
                method='post'
                onSubmit={adicionarCategoria}>
                <div className='form-col form-group'>
                  <div className='col'>
                    <input
                      className='form-ctrl'
                      type='text'
                      name='cat_nome'
                      id='cat_nome'
                      value={cat_nome}
                      onChange={e => {
                        setCatNome(e.target.value);
                        setErroMsg(false);
                        setSucessoMsg(false);
                      }}
                      placeholder='Nome da categoria...'></input>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <div className='col mt-2'>
                        <select
                          className='custom-select'
                          defaultValue='null'
                          onChange={e => {
                            setErroMsg(false);
                            setSucessoMsg(false);
                            setTipo(e.target.value);
                          }}>
                          <option
                            value='null'
                            disabled
                          >
                            Escolher tipo...
                          </option>
                          <option value='E'>Evento</option>
                          <option value='C'>Curso</option>
                          <option value='N'>Notícia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <Col>
                  {erroMsg ? (<span className='erro'>	{erroMsg}</span>) : null}
                  {sucessoMsg ? (<span className='sucesso'> {sucessoMsg}</span>) : null}
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
        {
          modalEditar
            ?
            <Row className='align-items-center justify-content-center'>
              <div style={{ minWidth: '50vh' }}>
                <h3 className='title'>Editar Categoria</h3>
                <form
                  method='post'
                  onSubmit={adicionarCategoria}>
                  <div className='form-col form-group'>
                    <div className='col'>
                      <input
                        className='form-ctrl'
                        type='text'
                        name='cat_nome'
                        id='cat_nome'
                        value={cat_nome}
                        onChange={e => {
                          setCatNome(e.target.value);
                          setErroMsg(false);
                          setSucessoMsg(false);
                        }}
                        placeholder='Nome da categoria...'></input>
                      <div className='form-row form-group pt-1 mb-0 align-items-center'>
                        <div className='col mt-2'>
                          <select
                            className='custom-select'
                            defaultValue='null'
                            onChange={e => {
                              setErroMsg(false);
                              setSucessoMsg(false);
                              setTipo(e.target.value);
                            }}>
                            <option
                              value='null'
                              disabled
                            >
                              Escolher tipo...
                            </option>
                            <option value='E'>Evento</option>
                            <option value='C'>Curso</option>
                            <option value='N'>Notícia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Col>
                    {erroMsg ? (<span className='erro'>	{erroMsg}</span>) : null}
                    {sucessoMsg ? (<span className='sucesso'> {sucessoMsg}</span>) : null}
                  </Col>
                  <div className='form-group d-flex flex-row-reverse p-3 mb-0'>
                    <button
                      className='btn bg-brown w-30'
                      type='submit'>
                      CONFIRMAR
                    </button>
                  </div>
                </form>
              </div>
            </Row>
            : null
        }
        <React.Fragment>
          <h3 className='title pt-0'>Categorias Cadastradas</h3>
          <div style={{ height: '50vh', overflow: 'auto' }}>
            <Table responsive hover size='sm'>
              <thead>
                <tr>
                  <th>#</th><th>Nome</th><th>Tipo</th><th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {categorias.length !== 0
                  ? Object.keys(categorias).map((key, index) => (
                    <tr key={`${categorias[key].cat_id}`}>
                      <td>{categorias[key].cat_id}</td>
                      <td>{categorias[key].cat_nome}</td>
                      <td>{categorias[key].cat_tipo}</td>
                      <td>
                        <Button
                          onClick={() => editarCategoria(categorias[key].cat_id)}
                          className='m-0 p-0 border-0 bg-transparent'>
                          <FiEdit style={{ color: '#231f20' }} />
                        </Button>
                        <Button
                          onClick={() => { setCat(categorias[key].cat_id); setModal(true); }}
                          className='ml-2 p-0 border-0 bg-transparent'>
                          <FiTrash
                            style={{ color: '#231f20' }} />
                        </Button>
                      </td>
                    </tr>
                  ))
                  : <tr>
                    <td colSpan='4'>
                      Não há categorias cadastradas.
                    </td>
                  </tr>
                }
              </tbody>
            </Table>
          </div>
        </React.Fragment>
        {modal
          ? <Modal onClose={() => setModal(false)}>
            <Col className='p-5'>
              <h3>Confirmar operação?</h3>
              <Row className='justify-content-center'>
                <Button
                  className='bg-brown border-0'
                  onClick={() => removerCategoria(categoria)}>
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