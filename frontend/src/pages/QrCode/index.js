import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import QrReader from 'react-qr-reader'
import api from '../../services/api'


export default function LeitorQrCode() {
  const [valido, setValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [leitorAtivo, setLeitorAtivo] = useState('');
  const nivel = localStorage.getItem('usu_nivel');
  const ses_id = localStorage.getItem('ses_id');
  const eve_id = localStorage.getItem('eve_id');
  const history = useHistory();

  const handleScan = (info) => {
    if (info) {
      setModal(true);
      validarQrCode(info);
      setLeitorAtivo(false);
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  async function validarQrCode(ing_qrCode) {
    const response = await api.get('/ingresso/qrCode/' + ing_qrCode);
    if (response.data.length != 0) {
      setValido(true);
      await api.put('sessoes/incrementar_freq/' + eve_id + '/' + ses_id);
    }
    else
      setValido(false);
  }

  useEffect(() => {
    if (nivel !== 'A')
      history.push('./');
  }, [nivel, history]);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        {
          leitorAtivo
            ?
            <QrReader
              delay={500}
              style={{ width: '30vw' }}
              onError={handleError}
              onScan={handleScan}
            />
            : <button
              className="btn bg-brown mt-3 w-30"
              onClick={() => setLeitorAtivo(true)}>
              Abrir Leitor
              </button>
        }
      </Row>

      <Modal
        show={modal}
        onHide={() => { setValido(false); setModal(false) }}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Status do QrCode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            valido
              ? <h4 style={{ color: "green", textAlign: "center" }}>Valido</h4>
              : <h4 style={{ color: "red", textAlign: "center" }}>Invalido</h4>
          }
        </Modal.Body>
      </Modal>

    </Container >
  );

}

