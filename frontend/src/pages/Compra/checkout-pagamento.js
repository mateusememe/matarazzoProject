import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './checkout.css'

export default function CheckoutPagamento() {
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
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
            <p className="m-0">2x INGRESSO EVENTO ? ............. R$00</p>
            <p className="mt-2 mb-0 font-weight-bold">TOTAL: R$00,00</p>
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
                  <h4> Você Selecionou para pagar presencialmente</h4>
                  <p> No dia do Evento leve o dinheiro para pagar</p>
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
                type='submit'>
                CONFIRMAR
                  </button>
            </Col>
            {/* 
              //row 
                //inputs
              //bt 
            */}



          </Col>
        </Row>
      </Container>
    </React.Fragment >
  );
}