import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DadosContext } from '../context/DadosContext.js';

import './capas.css'
export default function CapaNoticia({ data }) {

  const history = useHistory();
  const {
    getCategoria, cat
  } = useContext(DadosContext);

  function abrirNoticia(not_id) {
    localStorage.setItem("not_id", data.not_id);
    history.push('./noticia');
  }

  function formatarData(temp) {
    if (temp) {
      temp = temp.split("T")[0];
      const dia = temp.split("-")[2];
      const mes = temp.split("-")[1];
      const ano = temp.split("-")[0];

      return dia + "/" + mes + "/" + ano;
    }
  }
  useEffect(() => {
    getCategoria(data.cat_id);
  }, [data.cat_id]);
  function formatarDesc(desc) {
    return desc.substring(0, 70) + "...";
  }

  return (
    <Card>
      <Card.Body>
        <Row className="mb-2">
          <Col xs={4}>
            <Card.Img style={{ borderRadius: '50%', minHeight: '100%', width: '85%', objectFit: 'cover' }} src={"uploads/noticia/" + data.not_img} />
          </Col>
          <Col xs={8} className="p-0">
            <Card.Title className="font-weight-bold font-brown">{data.not_titulo}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{cat}</Card.Subtitle>
          </Col>
        </Row>
        <Card.Text>
          {formatarDesc(data.not_descricao)}
          <Link onClick={() => abrirNoticia(data.not_id)} onstyle={{ fontSize: '14px' }}>Continuar Lendo</Link>
        </Card.Text>
        <Card.Text className="text-right">{formatarData(data.not_data)}</Card.Text>
      </Card.Body>
    </Card >
  )
}