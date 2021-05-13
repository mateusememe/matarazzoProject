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
  //const history = useHistory();

  const [erroMsg, setErroMsg] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState('');
  const [modalVisivel, setModal] = useState(false);

  const {
    carregarUsuarios, usuarios
  } = useContext(DadosContext);

  const [usu_id, setIdUsu] = useState('');
  const [usu_nome, setNome] = useState('');
  const [usu_sobrenome, setSobrenome] = useState('');
  const [usu_email, setEmail] = useState('');
  const [usu_senha, setSenha] = useState('');
  const [usu_nivel, setNivel] = useState('');
  const [usu_dtNasc, setDtNasc] = useState('');
  const [usu_fone, setFone] = useState('');
  const [usu_cpf, setCPF] = useState('');
  const [usu_endereco, setEndereco] = useState('');
  const [usu_cep, setCEP] = useState('');
  const [usu_cidade, setCidade] = useState('');
  const [usu_sexo, setSexo] = useState('');

  async function removerUsuario(id) {
    await api.delete(`/usuarios/${id}`);
    carregarUsuarios();
  }

  function limparFormUsuario() {
    setNome('');
    setSobrenome('');
    setEmail('');
    setSenha('');
    setNivel('null');
  }

  function validarEmail() {
    if (usu_email === '') {
      setErroMsg('Preencha o campo Email!');
      return false;
    } else if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(usu_email)) {
      setErroMsg('Email inválido!');
      return false;
    }
    setErroMsg('');
    return true;
  }

  function validarSenha() {
    if (usu_senha === '') {
      setErroMsg('Preencha o campo Senha!');
      return false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(usu_senha)) {
      setErroMsg('Senha deve possuir pelo menos 6 caracteres, uma letra e um número');
      return false;
    }
    setErroMsg('');
    return true;
  }

  async function registrar(e) {
    e.preventDefault();
    if (usu_nome.length < 3)
      setErroMsg('Nome precisa ter pelo menos 3 caracteres');
    else if (usu_sobrenome.length < 3)
      setErroMsg('Sobrenome precisa ter pelo menos 3 caracteres');
    else if (validarEmail()) {
      if (validarSenha()) {
        if (props.flag === 'add') {
          const resp = await api.get('/usuarios/busca/' + usu_email);
          if (resp.data.length === 0) {
            await api.post('/usuarios/cadastro', {
              usu_nome, usu_sobrenome, usu_email,
              usu_senha, usu_nivel
            });
            setSucessoMsg('Usuario adicionado com sucesso!');
          }
          else setErroMsg('Email já cadastrado no sistema!');
        }
        else {
          await api.put('/usuarios/alterar', {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id
          });
          setSucessoMsg('Usuario alterado com sucesso!');
          carregarUsuarios();
        }
        limparFormUsuario();
        await sleep(3000);
        setSucessoMsg(false);
      }
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function editarUsuario(id) {
    const response = await api.get('/usuarios/' + id);
    setIdUsu(id);
    setEmail(response.data[0].usu_email);
    setSenha(response.data[0].usu_senha)
    setNome(response.data[0].usu_nome);
    setDtNasc(response.data[0].usu_dtNasc);
    setFone(response.data[0].usu_fone);
    setSobrenome(response.data[0].usu_sobrenome);
    setCPF(response.data[0].usu_cpf);
    setEndereco(response.data[0].usu_endereco);
    setCEP(response.data[0].usu_cep);
    setCidade(response.data[0].usu_cidade);
    setSexo(response.data[0].usu_sexo);
    setNivel(response.data[0].usu_nivel);
    setModal(true);
  }

  if (props.flag === 'add')
    return (
      <React.Fragment>
        <Container>
          <Row className='align-items-center justify-content-center'>
            <div style={{ minWidth: '50vh' }}>
              <h3 className='title'>Adicionar Novo Usuário</h3>
              <form
                method='post'
                onSubmit={registrar}>
                <div className='form-row form-group justify-content-between'>
                  <Col xs={5}>
                    <div className='row'>
                      <input
                        className='form-ctrl'
                        type='text'
                        name='usu_nome'
                        id='usu_nome'
                        value={usu_nome}
                        onChange={e => {
                          setNome(e.target.value);
                          setErroMsg(false);
                          setSucessoMsg(false);
                        }}
                        placeholder='Digite o primeiro nome...'></input>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className='row'>
                      <input
                        className='form-ctrl'
                        type='text'
                        name='usu_sobrenome'
                        id='usu_sobrenome'
                        value={usu_sobrenome}
                        onChange={e => {
                          setSobrenome(e.target.value);
                          setErroMsg(false);
                          setSucessoMsg(false);
                        }}
                        placeholder='Digite o sobrenome...'></input>
                    </div>
                  </Col>
                </div>
                <div className='row mb-3'>
                  <select
                    className='custom-select'
                    defaultValue='null'
                    onChange={e => {
                      setErroMsg(false);
                      setSucessoMsg(false);
                      setNivel(e.target.value);
                    }}>
                    <option
                      value='null'
                      disabled>
                      Escolher nível...
															</option>
                    <option value='U'>Usuário</option>
                    <option value='A'>Administrador</option>
                  </select>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <input
                      className='form-ctrl'
                      type='text'
                      name='usu_email'
                      id='usu_email'
                      value={usu_email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setErroMsg(false); setSucessoMsg(false);
                      }}
                      placeholder='Digite o email...'></input>
                  </div>
                </div>
                <div className='form-group mb-1'>
                  <div className='row'>
                    <input
                      className='form-ctrl'
                      type='password'
                      name='usu_senha'
                      id='usu_senha'
                      value={usu_senha}
                      onChange={e => {
                        setSenha(e.target.value);
                        setErroMsg(false);
                        setSucessoMsg(false);
                      }}
                      placeholder='Digite a senha...'></input>
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
        <div style={{ height: '50vh', overflow: 'auto' }}>
          <Table responsive hover size='sm'>
            <thead>
              <tr>
                <th>#</th><th>Nível</th><th>Nome</th><th>Cidade</th><th>Sexo</th><th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length !== 0 ?
                Object.keys(usuarios).map((key, index) => (
                  <tr key={`${usuarios[key].usu_id}`}>
                    <td>{usuarios[key].usu_id}</td>
                    <td>{usuarios[key].usu_nivel}</td>
                    <td>{usuarios[key].usu_nome}</td>
                    <td>{usuarios[key].usu_cidade}</td>
                    <td>{usuarios[key].usu_sexo}</td>
                    <td>
                      <Button
                        onClick={() => editarUsuario(usuarios[key].usu_id)}
                        className='m-0 p-0 border-0 bg-transparent'>
                        <FiEdit style={{ color: '#231f20' }} />
                      </Button>
                      <Button

                        onClick={() => removerUsuario(usuarios[key].usu_id)}
                        className='ml-2 p-0 border-0 bg-transparent'>
                        <FiTrash style={{ color: '#231f20' }} />
                      </Button>
                    </td>
                  </tr>
                ))
                : <tr>
                  <td colSpan='6'>Não há usuários cadastrados</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
}