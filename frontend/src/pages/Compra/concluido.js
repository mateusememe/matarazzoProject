import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap'
import QrGen from 'qrcode.react'

export default function Concluido() {
    const history = useHistory();
    const [ingressos, setIngressos] = useState([]);
    const ven_id = localStorage.getItem('ven_id');

    useEffect(() => {
        recuperarIngressos();
    }, []);
    async function recuperarIngressos() {
        const response = await api.get('/ingresso/' + ven_id);
        console.log(response.data);
        setIngressos(response.data);
    }
    return (
        <React.Fragment>
            <Container>
                <Row style={{ minHeight: "100vh" }} className="align-items-center">
                    <Col>
                        <div className="d-flex justify-content-center">
                            <h1>Compra realizada com sucesso!</h1>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn bg-brown w-30" onClick={() => history.push('./')}>VOLTAR PARA INICIO</button>
                        </div>
                        <Row className="justify-content-around mt-5">
                            {
                                ingressos.map((data, index) => (
                                    <QrGen value={data.ing_qrCode} renderAs="SVG" />
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}