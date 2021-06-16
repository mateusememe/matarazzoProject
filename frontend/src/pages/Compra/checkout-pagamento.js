import React, { useEffect, useState, useContext } from 'react'
import api from '../../services/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './checkout.css'
import { useHistory } from 'react-router';

import { InfoContext } from '../../context/InfoContext.js';

export default function CheckoutPagamento() {
  const history = useHistory();
  const [usu_nome, setNome] = useState('');
  const [usu_sobrenome, setSobrenome] = useState();
  const [usu_email, setEmail] = useState();
  const [usu_senha, setSenha] = useState();
  const [usu_cpf, setCpf] = useState('');
  const [usu_cep, setCep] = useState('');
  const [usu_sexo, setSexo] = useState('');
  const [usu_endereco, setEndereco] = useState('');
  const [usu_dtNasc, setDtNasc] = useState('');
  const [usu_cidade, setCidade] = useState('');
  const [usu_fone, setTelefone] = useState('');
  const [erroMsg, setErroMsg] = useState('');
  const [erroMsgPgto, setErroMsgPgto] = useState('');
  //const [dataNasc, setDataNasc] = useState('');

  const [numCartao, setNumCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvc, setCvc] = useState('');
  const [checadoPP, setChecadoPP] = useState(false);
  const [checadoCC, setChecadoCC] = useState(false);
  const [eve_nome, setEveNome] = useState('');
  const [eve_val, setEveVal] = useState();
  const eve_id = localStorage.getItem('eve_id');
  const usu_id = localStorage.getItem('usu_id');
  const usu_nivel = localStorage.getItem('usu_nivel');
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

  function validar() {
    //validação de cpf
    if (usu_cpf == "") {
      setErroMsg("Preencha o campo CPF!");
      return false;
    }
    else if (!(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/i).test(usu_cpf)) {
      setErroMsg("O campo CPF deve estar no formato: 111.111.111-11");
      return false;
    }
    //validação de cep
    else if (usu_cep == "") {
      setErroMsg("Preencha o campo CEP!");
      return false;
    }
    else if (!(/^\d{5}-\d{3}$/i).test(usu_cep)) {
      setErroMsg("O campo CEP deve estar no formato: 11111-111");
      return false;
    }
    //validação de endereço
    else if (usu_endereco == "") {
      setErroMsg("Preencha o campo Endereço!");
      return false;
    }
    //validação da data de nascimentos
    else if (usu_dtNasc == "") {
      setErroMsg("Selecione a data de nascimento!");
      return false;
    }
    //validação da cidade
    else if (usu_cidade == "") {
      setErroMsg("Preencha o campo cidade!");
      return false;
    }
    //validação de telefone
    else if (usu_fone == "") {
      setErroMsg("Preencha o campo telefone!");
      return false;
    }
    else if (checadoCC) {
      if (numCartao == "") {
        setErroMsgPgto("Preencha o número do cartão!");
        return false;
      }
      else if (!(/^[0-9]{16}/i).test(numCartao)) {
        setErroMsgPgto("Número do cartão inválido!");
        return false;
      }
      else if (dataValidade == "") {
        setErroMsgPgto("Preencha a data de validade do cartão!");
        return false;
      }
      else if (dataValidade < new Date()) {
        setErroMsgPgto("Data de validade!");
        return false;
      }
      else if (cvc == "") {
        setErroMsgPgto("Preencha o campo CVC!");
        return false;
      }
    }

    return true;
  }

  async function concluir() {
    const dtPgto = validar();
    if (dtPgto) {
      let ast_id;
      const ven_MetodoPgmt = verificaMetodoPgmt();
      const hoje = new Date();
      const ven_data = hoje.getFullYear() + "-" + (hoje.getMonth() + 1) + "-" + hoje.getDate();

      setSexo('F');

      const r = await api.put('/usuarios/alterar', {
        usu_nome, usu_sobrenome, usu_email,
        usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
        usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id, usu_nivel
      });

      if (r) {
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
    }
  }

  async function recuperarUsuario() {
    const response = await api.get('/usuarios/id/' + usu_id);
    console.log(response.data[0].usu_dtNasc);

    if (response.data.length != 0) {
      if (response.data[0].usu_nome != null)
        setNome(response.data[0].usu_nome);
      if (response.data[0].usu_sobrenome != null)
        setSobrenome(response.data[0].usu_sobrenome);
      if (response.data[0].usu_email != null)
        setEmail(response.data[0].usu_email);
      if (response.data[0].usu_senha != null)
        setSenha(response.data[0].usu_senha);
      if (response.data[0].usu_sexo != null)
        setSexo(response.data[0].usu_sexo);
      if (response.data[0].usu_cpf != null)
        setCpf(response.data[0].usu_cpf);
      if (response.data[0].usu_cep != null)
        setCep(response.data[0].usu_cep);
      if (response.data[0].usu_endereco != null)
        setEndereco(response.data[0].usu_endereco);
      if (response.data[0].usu_dtNasc != null)
        setDtNasc(response.data[0].usu_dtNasc);
      if (response.data[0].usu_cidade != null)
        setCidade(response.data[0].usu_cidade);
      if (response.data[0].usu_fone != null)
        setTelefone(response.data[0].usu_fone);
    }
  }

  function formatarData(temp) {
    if (temp) {
      const dia = temp.split('/')[0];
      const mes = temp.split('/')[1];
      const ano = temp.split('/')[2];

      return ano + '-' + mes + '-' + dia;
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
                      value={usu_cpf} onChange={e => { setCpf(e.target.value); setErroMsg(false); }}
                      placeholder="Digite seu cpf..."
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="cep" id="cep"
                      value={usu_cep} onChange={e => { setCep(e.target.value); setErroMsg(false); }}
                      placeholder="Digite seu CEP..."
                    ></input>
                    <input
                      className="form-ctrl"
                      name="endereco" id="endereco"
                      value={usu_endereco} onChange={e => { setEndereco(e.target.value); setErroMsg(false); }}
                      placeholder="Digite seu endereço (com o nº)..."
                    ></input>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row>
                    <input
                      className="form-ctrl form-group"
                      type="date" name="dtNasc" id="dtNasc"
                      value={usu_dtNasc} onChange={e => { setDtNasc(e.target.value); setErroMsg(false); }}
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="cidade" id="cidade"
                      value={usu_cidade} onChange={e => { setCidade(e.target.value); setErroMsg(false); }}
                      placeholder="Digite o nome da sua Cidade..."
                    ></input>
                    <input
                      className="form-ctrl form-group"
                      type="text" name="telefone" id="telefone"
                      value={usu_fone} onChange={e => { setTelefone(e.target.value); setErroMsg(false); }}
                      placeholder="Digite seu número..."
                    ></input>
                  </Row>
                </Col>
              </div>
              {erroMsg ? <span className="erro">{erroMsg}</span> : null}
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
                            type="text" name="usu_nome" id="usu_nome"
                            value={usu_nome} onChange={e => { setNome(e.target.value); setErroMsgPgto(false); }}
                            placeholder="Nome Completo..."
                          ></input>
                          <input
                            className="form-ctrl form-group"
                            type="text" name="cpf" id="cpf"
                            value={usu_cpf} onChange={e => { setCpf(e.target.value); setErroMsgPgto(false); }}
                            placeholder="Digite seu cpf..."
                          ></input>
                          <input
                            className="form-ctrl"
                            name="numCartao" id="numCartao"
                            value={numCartao} onChange={e => { setNumCartao(e.target.value); setErroMsgPgto(false); }}
                            placeholder="Número do Cartão"
                          ></input>
                          <Row className="mt-3 justify-content-between">
                            <Col xs={6}>
                              <input
                                className="form-ctrl"
                                name="dataValidade" id="dataValidade"
                                value={dataValidade} onChange={e => { setDataValidade(e.target.value); setErroMsgPgto(false); }}
                                placeholder="MM/AA"
                              ></input>
                            </Col>

                            <Col xs={6}>
                              <input
                                className="form-ctrl"
                                name="cvc" id="cvc"
                                value={cvc} onChange={e => { setCvc(e.target.value); setErroMsgPgto(false); }}
                                placeholder="CVC"
                              ></input>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                    </div>
                    {erroMsgPgto ? <span className="erro">{erroMsgPgto}</span> : null}
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