import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import { Container, Row, Col, Tab, Nav, NavDropdown } from 'react-bootstrap';

import './paineladm.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PainelAdm() {

    return (
        <React.Fragment>
            <Container>
                <h1 className="title">Painel Administrativo</h1>
                <Tab.Container defaultActiveKey="first">
                    <Row className="mt-5 mb-5">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <NavDropdown title="Gerenciar Curso" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-curso">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-curso">Alterar Existente</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="remove-curso">Remover Existente</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Gerenciar Evento" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-evento">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-evento">Alterar Existente</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="remove-evento">Remover Existente</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Gerenciar Noticia" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-noticia">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-noticia">Alterar Existente</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="remove-noticia">Remover Existente</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="add-curso">
                                    Adicionar
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-curso">
                                    Editar
                                </Tab.Pane>
                                <Tab.Pane eventKey="remove-curso">
                                    Remover
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-evento">
                                    Adicionar
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-evento">
                                    Editar
                                </Tab.Pane>
                                <Tab.Pane eventKey="remove-evento">
                                    Remover
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-noticia">
                                    Adicionar
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-noticia">
                                    Editar
                                </Tab.Pane>
                                <Tab.Pane eventKey="remove-noticia">
                                    Remover
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </React.Fragment>
    )
}