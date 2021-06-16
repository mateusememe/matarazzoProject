import React, { useEffect, useState, useContext } from 'react'
import { Tab, Container, Row, Col, Nav, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import QrGen from 'qrcode.react'
import Modal from '../../components/Modal'

export default function MinhaConta() {
  const usu_id = localStorage.getItem('usu_id');
  const usu_nivel = localStorage.getItem('usu_nivel');
  const [usu_nome, setNome] = useState('');
  const [usu_sobrenome, setSobrenome] = useState();
  const [usu_email, setEmail] = useState();
  const [usu_dtNasc, setDtNasc] = useState('');
  const [usu_fone, setTelefone] = useState('');
  const [usu_cpf, setCpf] = useState('');
  const [usu_cep, setCep] = useState('');
  const [usu_cidade, setCidade] = useState('');
  const [usu_endereco, setEndereco] = useState('');
  const [usu_senha, setSenha] = useState('');
  const [usu_sexo, setSexo] = useState('');

  const [vendas, setVendas] = useState([]);
  const [sucessoMsg, setSucessoMsg] = useState('');
  const [erroMsg, setErroMsg] = useState('');
  const [checado, setChecado] = useState(false);
  const [checado2, setChecado2] = useState(false);
  const [ingressos, setIngressos] = useState([]);
  //const ven_id = localStorage.getItem('ven_id');
  const [modal, setModal] = useState(false);

  async function recuperarIngressos(ven_id) {
    const response = await api.get('/ingresso/' + ven_id);
    console.log(response);
    setIngressos(response.data);
  }

  function formatarHora(temp) {
    if (temp) {
      temp = temp.split(':');
      if (temp[0] < 10) temp[0] = '0' + temp[0];
      return temp[0] + ':' + temp[1];
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function recuperarUsuario() {
    const response = await api.get('/usuarios/id/' + usu_id);
    if (response.data.length != 0) {
      if (response.data[0].usu_nome != null)
        setNome(response.data[0].usu_nome);
      if (response.data[0].usu_sobrenome != null)
        setSobrenome(response.data[0].usu_sobrenome);
      if (response.data[0].usu_email != null)
        setEmail(response.data[0].usu_email);
      if (response.data[0].usu_dtNasc != null)
        setDtNasc(response.data[0].usu_dtNasc);
      if (response.data[0].usu_fone != null)
        setTelefone(response.data[0].usu_fone);
      if (response.data[0].usu_cpf != null)
        setCpf(response.data[0].usu_cpf);
      if (response.data[0].usu_cep != null)
        setCep(response.data[0].usu_cep);
      if (response.data[0].usu_cidade != null)
        setCidade(response.data[0].usu_cidade);
      if (response.data[0].usu_endereco != null)
        setEndereco(response.data[0].usu_endereco);
      if (response.data[0].usu_senha != null)
        setSenha(response.data[0].usu_senha);
      if (response.data[0].usu_sexo != null) {
        if (response.data[0].usu_sexo == 'M') {
          setChecado(true); setChecado2(false); setSexo('M');
        } else {
          setChecado2(true); setChecado(false); setSexo('F');
        }
      }
    }
  }

  async function concluir(e) {
    e.preventDefault();
    await api.put('/usuarios/alterar', {
      usu_nome, usu_sobrenome, usu_email,
      usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
      usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id, usu_nivel
    });
    setSucessoMsg('Dados atualizados com sucesso!');
    await sleep(3000);
    setSucessoMsg(false);
  }

  async function recuperarVenda() {
    const response = await api.get('/venda/' + usu_id);
    setVendas(response.data);
  }

  async function vizualizarIngressos(id) {
    recuperarIngressos(id);

    setModal(true);
    console.log(id);

  }

  function formatarData(temp) {
    if (temp) {
      console.log(temp);
      const dia = temp.split('-')[0];
      const mes = temp.split('-')[1];
      const ano = temp.split('-')[2].split('T')[0];

      return ano + '-' + mes + '-' + dia;
    }
  }

  useEffect(() => {
    recuperarUsuario();
    recuperarVenda();
  }, []);

  return (
    <Container>
      <button className="btn bg-brown mt-3 w-30">
        <Link
          to='./'
          style={{ color: '#fce373', textDecoration: 'none' }}>
          INÍCIO
        </Link>
      </button>
      <h1 className="title">Minha Conta</h1>
      <Tab.Container>
        <Row>
          <Col sm={3}>
            <Nav variant='pills' activeKey="meus-dados" className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey="meus-dados"> Meus Dados</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="meus-ingressos"> Meus Ingressos</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='meus-dados'>
                <Row className="justify-content-center">
                  <div style={{ maxWidth: '50vw' }}>
                    <form
                      method='post'
                      onSubmit={concluir}>
                      <div className='form-group'>
                        <div className='row'>
                          <input
                            className='form-ctrl'
                            type='text'
                            name='usu_cpf'
                            id='usu_cpf'
                            value={usu_cpf}
                            readOnly />
                        </div>
                      </div>
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
                      <div className='form-row form-group justify-content-between'>
                        <Col xs={5}>
                          <div className='row'>
                            <input
                              className='form-ctrl'
                              type='date'
                              name='usu_dtNasc'
                              id='usu_dtNasc'
                              value={usu_dtNasc}
                              onChange={e => {
                                setDtNasc(e.target.value);
                                setErroMsg(false);
                                setSucessoMsg(false);
                              }} />
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className='row'>
                            <input
                              className='form-ctrl'
                              type='text'
                              name='usu_fone'
                              id='usu_fone'
                              value={usu_fone}
                              onChange={e => {
                                setTelefone(e.target.value);
                                setErroMsg(false);
                                setSucessoMsg(false);
                              }}
                              placeholder='Digite o telefone...' />
                          </div>
                        </Col>
                      </div>
                      <div className='form-row form-group justify-content-between'>
                        <Col xs={5}>
                          <div className='row'>
                            <input
                              className='form-ctrl'
                              type='text'
                              name='usu_cep'
                              id='usu_cep'
                              value={usu_cep}
                              onChange={e => {
                                setCep(e.target.value);
                                setErroMsg(false);
                                setSucessoMsg(false);
                              }} placeholder="Digite o cep..." />
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className='row'>
                            <input
                              className='form-ctrl'
                              type='text'
                              name='usu_cidade'
                              id='usu_cidade'
                              value={usu_cidade}
                              onChange={e => {
                                setCidade(e.target.value);
                                setErroMsg(false);
                                setSucessoMsg(false);
                              }}
                              placeholder='Digite o telefone...' />
                          </div>
                        </Col>
                      </div>
                      <Row className="mb-3">
                        <div className='custom-control custom-radio custom-control-inline'>
                          <input
                            checked={checado}
                            onChange={e => {
                              setSexo('M'); setChecado(true);
                              setChecado2(false); setErroMsg(false);
                              setSucessoMsg(false);
                            }}
                            type='radio'
                            id='usu_sexo_masculino'
                            name='usu_sexo'
                            className='custom-control-input'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='usu_sexo_masculino'>
                            Masculino
                          </label>
                        </div>

                        <div className='custom-control custom-radio custom-control-inline'>
                          <input
                            checked={checado2}
                            onChange={e => {
                              setSexo('F'); setChecado2(true);
                              setChecado(false); setErroMsg(false);
                              setSucessoMsg(false);
                            }}
                            type='radio'
                            id='usu_sexo_feminino'
                            name='usu_sexo'
                            className='custom-control-input'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='usu_sexo_feminino'>
                            Feminino
                          </label>
                        </div>
                      </Row>
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
                            placeholder='Digite o email...' />
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
                      <Row>
                        {erroMsg ? (<span className='erro'>{erroMsg}</span>) : null}
                        {sucessoMsg ? (<span className='sucesso'>{sucessoMsg}</span>) : null}
                      </Row>
                      <div className='form-group'>
                        <Row className='justify-content-end mt-4'>
                          <button
                            className='btn bg-brown'
                            type='submit'>
                            CONCLUIR
                          </button>
                        </Row>
                      </div>
                    </form>
                  </div>
                </Row>
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey='meus-ingressos'>
                <Row className="justify-content-center">
                  <h3 className='title pt-0'>Meus Ingressos</h3>
                  <div style={{ height: '50vh', overflow: 'auto' }}>
                    <Table responsive hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th><th>Evento</th><th>Sessão</th><th>Valor(R$)</th><th>Quantidade</th><th>Total(R$)</th><th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendas.map((venda, index) => (
                          <tr key={`${venda.eve_id}`}>
                            <td>{venda.id}</td>
                            <td>{venda.eve_nome}</td>
                            <td>{venda.ses_id}</td>
                            <td>{venda.eve_valor}</td>
                            <td>{venda.qtdeIngressosEve}</td>
                            <td>{venda.total}</td>
                            <td>
                              <button
                                className='btn bg-brown w-30'
                                type='submit'
                                onClick={() => vizualizarIngressos(venda.id)}
                              >
                                Ver QrCode
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
        {
          modal
            ? <Modal onClose={() => setModal(false)}>
              <h1 className="p-5 text-center">Ingressos</h1>
              <Row className='m-5 justify-content-between'>
                {ingressos.length != 0
                  ? ingressos.map((item) => (
                    <div className="borda-2 m-1 p-1">
                      <Row className="m-0 justify-content-center">
                        <QrGen value={item.ing_qrCode} renderAs="SVG" />
                      </Row>
                      <Col className="mt-2">
                        <p className="text-center m-0" style={{ fontWeight: 'bold' }}>SALA: {item.sal_nome}</p>
                        <p className="text-center m-0" style={{ fontWeight: 'bold' }}>ASSENTO: {item.ast_num}</p>
                        <p className="text-center m-0" style={{ fontWeight: 'bold' }}>DATA: {formatarData(item.eve_data)}</p>
                        <p className="text-center m-0" style={{ fontWeight: 'bold' }}>HORA: {formatarHora(item.eve_horario)}</p>
                      </Col>
                    </div>
                  ))
                  : null
                }
              </Row>
            </Modal>
            : null
        }
      </Tab.Container>
    </Container >
  );
}
