import React, { useEffect, useState, useContext } from 'react'
import api from '../../services/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './checkout.css'
import { useHistory } from 'react-router';

import { InfoContext } from '../../context/InfoContext.js';

export default function CheckoutPagamento() {
  const history = useHistory();
  const [cpf, setCpf] = useState('');
  //const [dataNasc, setDataNasc] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [nome, setNome] = useState('');
  const [numCartao, setNumCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvc, setCvc] = useState('');
  const [telefone, setTelefone] = useState('');
  const [checadoPP, setChecadoPP] = useState(false);
  const [checadoCC, setChecadoCC] = useState(false);
  const [eve_nome, setEveNome] = useState('');
  const [eve_val, setEveVal] = useState();
  const eve_id = localStorage.getItem('eve_id');
  const usu_id = localStorage.getItem('usu_id');
  const ses_id = localStorage.getItem('ses_id');
  let ven_id = 0;

  const {
    selecionado, qtdeSelecionado
  } = useContext(InfoContext);

  async function recuperarNomeEvento() {
    const response = await api.get('/eventos/' + eve_id);
    setEveNome(response.data[0].eve_nome);
    setEveVal(response.data[0].eve_valor);
  }
  function verificaMetodoPgmt() {
    if (setChecadoPP)
      return 'P';
    return 'C';
  }

  async function concluir() {
    let ast_id;
    const ven_MetodoPgmt = verificaMetodoPgmt();
    const hoje = new Date();
    const ven_data = hoje.getFullYear() + "-" + (hoje.getMonth() + 1) + "-" + hoje.getDate();

    const response = await api.post('/venda/cadastro', {
      ven_data, ven_MetodoPgmt,
      usu_id, eve_id, ses_id
    });
    if (response) {
      ven_id = response.data.lastId;
      console.log("ven_id: " + ven_id);
      localStorage.setItem('ven_id', ven_id);
      for (ast_id = 0; ast_id < selecionado.length; ast_id++) {
        if (selecionado[ast_id]) {
          let ing_qrCode = ven_id + "" + ast_id;
          await api.post('/ingresso/cadastro', {
            ing_qrCode,
            eve_id, ses_id, ven_id, ast_id
          });
          history.push('/concluido');
        }
      }
    }
  }
  async function recuperarUsuario() {
    const response = await api.get('/usuarios/id/' + usu_id);
    console.log(response.data);
    if (response.data) {

      if (response.data[0].usu_fone != null)
        setTelefone(response.data[0].usu_fone);
      if (response.data[0].usu_cpf != null)
        setCpf(response.data[0].usu_cpf != null);
      if (response.data[0].usu_endereco != null)
        setEndereco(response.data[0].usu_endereco);
      if (response.data[0].usu_cep != null)
        setCep(response.data[0].usu_cep);
      if (response.data[0].usu_cidade != null)
        setCidade(response.data[0].usu_cidade);
    }
  }


  useEffect(() => {
    recuperarNomeEvento();
    recuperarUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Container className="mt-5">
        <h1 className="text-center font-weight-bold mb-5">CHECKOUT</h1>
        <Row className="mt-5">
          <Col xs={7}>
            <h4 className="font-weight-bold">Detalhes de Pagamento</h4>
            <form method="post" onSubmit={() => { }}>
              <div className="form-row justify-content-between">
                <Col xs={5}>
                  <Row>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="cpf" id="cpf"
                      value={cpf} onChange={e => setCpf(e.target.value)}
                      placeholder="Digite seu cpf..."
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="cep" id="cep"
                      value={cep} onChange={e => setCep(e.target.value)}
                      placeholder="Digite seu CEP..."
                    ></input>
                    <input
                      className="form-ctrl"
                      name="endereco" id="endereco"
                      value={endereco} onChange={e => setEndereco(e.target.value)}
                      placeholder="Digite seu endereço (com o nº)..."
                    ></input>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row>
                    <input
                      className="form-ctrl form-group"
                      type="date"
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="cidade" id="cidade"
                      value={cidade} onChange={e => setCidade(e.target.value)}
                      placeholder="Digite o nome da sua Cidade..."
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="telefone" id="telefone"
                      value={telefone} onChange={e => setTelefone(e.target.value)}
                      placeholder="Digite seu número..."
                    ></input>
                  </Row>
                </Col>
              </div>
            </form>
          </Col>
          <Col xs={4} className="barra m-3 p-3 align-self-center">
            <p className="m-0">{qtdeSelecionado} {eve_nome} ? ............. R${eve_val}</p>
            <p className="mt-2 mb-0 font-weight-bold">TOTAL: R${qtdeSelecionado * eve_val}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={7}>
            <h4 className="font-weight-bold">Formas de Pagamento</h4>

            {
              !checadoPP
                ?
                <React.Fragment>
                  <form method="post" onSubmit={() => { }}>
                    <div className="form-row justify-content-start">
                      <Col xs={7}>
                        <Row>
                          <input
                            className="form-ctrl form-group"
                            type="text" name="nome" id="nome"
                            value={nome} onChange={e => setNome(e.target.value)}
                            placeholder="Nome Completo..."
                          ></input>
                          <input
                            className="form-ctrl form-group"
                            type="text" name="cpf" id="cpf"
                            value={cpf} onChange={e => setCpf(e.target.value)}
                            placeholder="Digite seu cpf..."
                          ></input>
                          <input
                            className="form-ctrl"
                            name="numCartao" id="numCartao"
                            value={numCartao} onChange={e => setNumCartao(e.target.value)}
                            placeholder="Número do Cartão"
                          ></input>
                          <Row className="mt-3 justify-content-between">
                            <Col xs={6}>
                              <input
                                className="form-ctrl"
                                name="dataValidade" id="dataValidade"
                                value={dataValidade} onChange={e => setDataValidade(e.target.value)}
                                placeholder="MM/AA"
                              ></input>
                            </Col>

                            <Col xs={6}>
                              <input
                                className="form-ctrl"
                                name="cvc" id="cvc"
                                value={cvc} onChange={e => setCvc(e.target.value)}
                                placeholder="CVC"
                              ></input>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                    </div>
                  </form>
                </React.Fragment>
                :
                <React.Fragment>
                  <h4> Você selecionou para pagar presencialmente</h4>
                </React.Fragment>
            }

          </Col>
          <Col xs={4} className="m-3 p-1 align-self-center">
            <Row>
              <div className="custom-radio">
                <Col xs={9} className="mb-3">
                  <Row className='custom-control custom-radio custom-control-inline'>
                    <input
                      checked={checadoCC}
                      onChange={e => {
                        setChecadoCC(true);
                        setChecadoPP(false);
                      }}
                      type="radio"
                      id="evt_cartaoCredito_ativo"
                      name="formaPagamento"
                      className='custom-control-input'
                    />
                    <label className="custom-control-label"
                      htmlFor='evt_cartaoCredito_ativo'>
                      Cartão de Crédito</label>
                  </Row>
                  <Row className='custom-control custom-radio custom-control-inline'>
                    <input
                      checked={checadoPP}
                      onChange={e => {
                        setChecadoCC(false);
                        setChecadoPP(true);
                      }}
                      type="radio"
                      id="evt_pagarPresencial_ativo"
                      name="formaPagamento"
                      className='custom-control-input'
                    />
                    <label className="custom-control-label"
                      htmlFor='evt_pagarPresencial_ativo'>
                      Pagar Presencialmente</label>
                  </Row>
                </Col>


              </div>
            </Row>
            <Col xs={5}>
              <button
                className='btn bg-brown w-30'
                type='submit'
                onClick={() => concluir()}>
                CONFIRMAR
              </button>
            </Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  );
}