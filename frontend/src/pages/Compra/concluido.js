import React from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap'

export default function Concluido() {
    const history = useHistory();

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
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}