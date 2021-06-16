import React, { useState, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Table, Button, Form
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import api from '../../services/api.js';
import Modal from '../Modal'
import { DadosContext } from '../../context/DadosContext.js';

export default function GerenciarNoticia(props) {
  const [erroMsg, setErroMsg] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState('');
  const [noticia, setNot] = useState('');
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const {
    carregarNoticias, categorias, noticias, carregarCategorias
  } = useContext(DadosContext);

  const [not_id, setIdNot] = useState('');
  const [not_titulo, setTituloNot] = useState('');
  const [not_data, setDataNot] = useState('');
  const [not_dataFim, setDataFimNot] = useState('');
  const [not_descricao, setDescNot] = useState('');
  const [not_adm, setAdmNot] = useState(props.usuario);
  const [not_categoria, setCategoriaNot] = useState('DEFAULT');
  const [not_img, setImgNot] = useState('');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function removerNoticia(id) {
    await api.delete(`/noticias/${id}`);
    carregarNoticias();
  }

  async function editarNoticia(id) {
    carregarCategorias('N');
    const response = await api.get('/noticias/' + id);
    setIdNot(id);
    setTituloNot(response.data[0].not_titulo);
    setDataNot(formatarData(response.data[0].not_data));
    setDataFimNot(formatarData(response.data[0].not_dataFim));
    setAdmNot(response.data[0].usu_id);
    setCategoriaNot(response.data[0].cat_id);
    setDescNot(response.data[0].not_descricao);
    setImgNot(response.data[0].not_img);
    setModalEditar(true);
  }

  function limparFormNoticia() {
    setTituloNot('');
    setDataNot('');
    setDataFimNot('');
    setAdmNot(props.usuario);
    setCategoriaNot('');
    setDescNot('');
    setImgNot('');
  }

  async function uploadImgNoticia() {
    const imgData = new FormData();
    imgData.append('not_img', not_img);
    const resUpload = await api.post('upload/noticias', imgData, {
      config: { headers: { 'Content-type': 'multipart/form-data' } }
    });

    setImgNot(resUpload.data);
    setSucessoMsg('Imagem da Notícia adicionada com sucesso!');
    await sleep(3000);
    setSucessoMsg(false);
  }

  async function adicionarNoticia(e) {
    e.preventDefault();

    if (not_titulo && not_data && not_adm && not_categoria) {
      if (props.flag === 'add') {
        await api.post('/noticias', {
          not_titulo, not_descricao, not_data, not_dataFim, not_adm, not_categoria, not_img
        });
        setSucessoMsg('Noticia adicionada com sucesso!');
      }
      else {
        await api.put('/noticias', {
          not_titulo, not_descricao, not_data, not_dataFim, not_adm, not_categoria, not_img, not_id
        });
        setSucessoMsg('Noticia atualizada com sucesso!');
      }

      limparFormNoticia();
      carregarNoticias();
      await sleep(3000);
      setModalEditar(false);
      setSucessoMsg(false);
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

  function getStatusNot(dataIni, dataFim) {
    const today = new Date();
    const dtIni = dataIni.split('-');
    const dateIni = new Date(parseInt(dtIni[0]), parseInt(dtIni[1]) - 1, parseInt(dtIni[2]));
    const dtFim = dataFim.split('-');
    const dateFim = new Date(parseInt(dtFim[0]), parseInt(dtFim[1]) - 1, parseInt(dtFim[2]));
    if (dateIni <= today && today <= dateFim) {
      return "Ativa";
    }
    else {
      return "Inativa";
    }
  }

  if (props.flag === 'add')
    return (
      <React.Fragment>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <div style={{ minWidth: '50vh' }}>
              <h3 className='title p-0 pb-3'>Adicionar Nova Notícia</h3>
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
                          Data inicial da notícia
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
                      <Col>
                        <label className='mb-0'>
                          Data final da notícia
                        </label>
                        <input
                          className='form-ctrl'
                          type='date'
                          name='not_dataFim'
                          id='not_dataFim'
                          value={not_dataFim}
                          onChange={e => {
                            setDataFimNot(e.target.value);
                            setErroMsg(false);
                            setSucessoMsg(false);
                          }}></input>
                      </Col>
                    </div>
                    <div className='form-row form-group pt-1 mb-0 align-items-center justify-content-between'>
                      <Col xs={10}>
                        <div className='custom-file mt-2'>
                          <input
                            type='file'
                            name='not_img'
                            className='custom-file-input'
                            onChange={e => {
                              setImgNot(e.target.files[0]);
                              setErroMsg(false); setSucessoMsg(false);
                            }}
                            id='not_img'//fazer uma pasta dedicada
                          />
                          <label
                            className='custom-file-label form-ctrl'
                            htmlFor='not_img'>
                            Escolher imagem
                          </label>
                        </div>
                      </Col>
                      <Col>
                        <input
                          type='button'
                          className='btn bg-brown mt-2'
                          onClick={uploadImgNoticia}
                          value='Enviar'
                        />
                      </Col>
                    </div>
                    <div className='form-row form-group pt-1 mb-0 align-items-center'>
                      <Col xs={12}>
                        <div className="custom-desc mt-2">
                          <textarea
                            rows={10}
                            cols={40}
                            maxLength="1999"
                            name='not_descricao'
                            id='not_descricao'
                            value={not_descricao}
                            className='form-ctrl'
                            onChange={e => {
                              setDescNot(e.target.value);
                              setErroMsg(false);
                              setSucessoMsg(false);
                            }}
                            placeholder='Digite aqui a descrição da notícia...'
                          />
                        </div>
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
        {
          modalEditar
            ?
            <Row className='align-items-center justify-content-center'>
              <div style={{ maxWidth: '50vw' }}>
                <h3 className='title m-0 p-0 pb-3'>Editar Notícia</h3>
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
                            Data inicial da notícia
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
                        <Col>
                          <label className='mb-0'>
                            Data final da notícia
                          </label>
                          <input
                            className='form-ctrl'
                            type='date'
                            name='not_dataFim'
                            id='not_dataFim'
                            value={not_dataFim}
                            onChange={e => {
                              setDataFimNot(e.target.value);
                              setErroMsg(false);
                              setSucessoMsg(false);
                            }}></input>
                        </Col>
                      </div>
                      <div className='form-row form-group pt-1 mb-0 align-items-center justify-content-between'>
                        <Col xs={10}>
                          <div className='custom-file mt-2'>
                            <input
                              type='file'
                              name='not_img'
                              className='custom-file-input'
                              onChange={e => {
                                setImgNot(e.target.files[0]);
                                setErroMsg(false); setSucessoMsg(false);
                              }}
                              id='not_img'//fazer uma pasta dedicada
                            />
                            <label
                              className='custom-file-label form-ctrl'
                              htmlFor='not_img'>
                              Escolher imagem
                            </label>
                          </div>
                        </Col>
                        <Col>
                          <input
                            type='button'
                            className='btn bg-brown mt-2'
                            onClick={uploadImgNoticia}
                            value='Enviar'
                          />
                        </Col>
                      </div>
                      <div className='form-row form-group pt-1 mb-0 align-items-center'>
                        <Col xs={12}>
                          <div className="custom-desc mt-2">
                            <textarea
                              rows={10}
                              cols={40}
                              maxLength="1999"
                              name='not_descricao'
                              id='not_descricao'
                              value={not_descricao}
                              className='form-ctrl'
                              onChange={e => {
                                setDescNot(e.target.value);
                                setErroMsg(false);
                                setSucessoMsg(false);
                              }}
                              placeholder='Digite aqui a descrição da notícia...'
                            />
                          </div>
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
                      CONFIRMAR
                    </button>
                  </div>
                </form>
              </div>
            </Row>
            : null
        }
        <React.Fragment>
          <h3 className='title pt-0'>Noticias Cadastradas</h3>
          <div style={{ height: '50vh', overflow: 'auto' }}>
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
                      <td>{getStatusNot(noticias[key].not_data, noticias[key].not_dataFim)}</td>
                      <td>
                        <Button
                          onClick={() => editarNoticia(noticias[key].not_id)}
                          className='m-0 p-0 border-0 bg-transparent'>
                          <FiEdit style={{ color: '#231f20' }} />
                        </Button>
                        <Button
                          onClick={() => { setIdNot(noticias[key].not_id); setModal(true) }}
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
          </div>
        </React.Fragment>
        {modal
          ? <Modal onClose={() => setModal(false)}>
            <Col className='p-5'>
              <h3>Confirmar operação?</h3>
              <Row className='justify-content-center'>
                <Button
                  className='bg-brown border-0'
                  onClick={() => { removerNoticia(not_id); setModal(false) }}>
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