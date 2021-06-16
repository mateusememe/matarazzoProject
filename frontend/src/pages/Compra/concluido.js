import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import QrGen from 'qrcode.react'

export default function Concluido() {
    const history = useHistory();
    //const [ingressos, setIngressos] = useState([]);
    //const ven_id = localStorage.getItem('ven_id');

    /* useEffect(() => {
        recuperarIngressos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function recuperarIngressos() {
        const response = await api.get('/ingresso/' + ven_id);
        console.log(response.data);
        setIngressos(response.data);
    } */
    return (
        <React.Fragment>
            <Container>
                <Row style={{ minHeight: "100vh" }} className="align-items-center">
                    <Col>
                        <h1 className='text-center'>Compra realizada com sucesso!</h1>
                        <Row className="d-flex justify-content-center">
                            <button className="btn bg-brown w-30"
                                onClick={() => history.push('./minha-conta')}>
                                ACESSAR MEUS INGRESSOS
                            </button>
                        </Row>
                        <Row className="justify-content-center mt-5">
                            <Link to='./'>
                                VOLTAR PARA INÍCIO
                            </Link>
                        </Row>
                        {/* <Row className="justify-content-around mt-5">
                            {
                                ingressos.map((data, index) => (
                                    <QrGen value={data.ing_qrCode} renderAs="SVG" />
                                ))
                            }
                        </Row> */}
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
}