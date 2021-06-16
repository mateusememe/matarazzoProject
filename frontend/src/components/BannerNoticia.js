import React, { useEffect, useState } from 'react'
import {
  Container, Col, Card, Spinner
} from 'react-bootstrap';
import api from '../services/api';
import './banner.css'
import Navbar from './Navbar';

export default function Banner({ data, tipo }) {
  const [titulo, setTitulo] = useState('');
  const [img, setImg] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataNot, setDataNot] = useState('');


  function formatarData(temp) {
    if (temp) {
      console.log(temp);
      const dia = temp.split('-')[0];
      const mes = temp.split('-')[1];
      const ano = temp.split('-')[2].split('T')[0];

      return ano + '-' + mes + '-' + dia;
    }
  }

  async function carregaCategoria(id) {
    let result = await api.get('/categorias/id/' + id);
    let cat = JSON.parse(JSON.stringify(result.data[0]));

    setDescricao(cat.cat_nome);
  }
  async function getData(dados) {
    dados = JSON.parse(dados);
    setImg(dados['not_img']);
    console.log("imagem vinda: " + dados['not_img'] + "imagem processada: " + img)
    setDataNot(formatarData(dados['not_data']));
    await carregaCategoria(dados.cat_id);
    setTitulo(dados['not_titulo']);
  }

  useEffect(() => {
    getData(data);
  }, [data])

  return (
    <React.Fragment>
      <React.Fragment >
        <Navbar />
        <Card className="bg-dark text-white border-0 rounded-0 mt-0 mb-5" >
          <Card.Img className="cover border-0 rounded-0" src={"/uploads/noticia/" + JSON.parse(data)['not_img']} alt="Card image" />
          <Card.ImgOverlay className="d-flex border-0 rounded-0 p-0 gradiente">
            <Container className="d-flex justify-content-start align-items-end">
              <Col>
                <Card.Title className="titulo-banner">{titulo}</Card.Title>
                <Card.Text className="resumo-banner-noticia">
                  <div className="float-left">{descricao}</div>
                  <div className="float-right"><strong>Data:</strong>&nbsp;{dataNot}</div>
                </Card.Text>
              </Col>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </React.Fragment >
    </React.Fragment >
  )
}