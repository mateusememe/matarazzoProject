import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../../services/api'
import './sessao.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'

export default function SelecionarSessao() {
  const [horarios, setHorario] = useState([]);
  const [datas, setData] = useState([]);
  const [checado, setChecado] = useState("");

  const history = useHistory();
  const eve_id = localStorage.getItem("eve_id")

  function converterData(data) {
    var days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    var d = new Date(data);
    var dayName = days[d.getDay()];
    return dayName;
  }

  function formatarData(aux) {
    const dia = aux.split('-')[2];
    const mes = aux.split('-')[1];

    return dia + '/' + mes;
  }

  function formatarData2(temp) {
    if (temp) {
      const dia = temp.split('-')[2];
      const mes = temp.split('-')[1];
      const ano = temp.split('-')[0];

      return ano + '-' + mes + '-' + dia;
    }
  }

  function formatarHora(temp) {
    if (temp) {
      temp = temp.split(':');
      if (temp[0] < 10) temp[0] = '0' + temp[0];
      return temp[0] + ':' + temp[1];
    }
  }
  async function carregarHorariosSala(data) {
    setChecado(data);
    console.log("data" + formatarData2(data));
    const response = await api.get('sessoes/salas_horarios/' + eve_id + "/" + data);
    console.log(response);
    setHorario(response.data)
  }

  async function selecionarAssentos(sala_id, ses_id) {
    localStorage.setItem('ses_id', ses_id);
    localStorage.setItem('sala_id', sala_id);
    history.push('/selecionar-assentos');
  }
  useEffect(() => {
    async function carregarDatas() {
      const response = await api.get('/sessoes/datas/' + eve_id);
      setData(response.data);
    }
    carregarDatas();
  }, [eve_id]);

  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <Container>
        <h3 className="font-weight-bold">Selecionar Dia</h3>
        <Row className="barra mb-5">
          <Col className="d-flex justify-content-center p-0 pl-2 pr-2">
            {datas.length !== 0
              ? datas.map((data, index) => (
                <div className='custom-control-inline radio-toolbar m-2' key={index}>
                  <input
                    onChange={() => carregarHorariosSala(data.ses_data)}
                    checked={checado === data.ses_data}
                    value={checado}
                    id={data.ses_data}
                    type='radio'
                  />
                  <label htmlFor={data.ses_data}>
                    <p className="dia-semana">
                      {converterData(data.ses_data)}
                    </p>
                    <p className="data">
                      {formatarData(data.ses_data)}
                    </p>
                  </label>
                </div>
              ))
              : <span style={{ textAlign: 'center' }}>Não existem datas para esse evento</span>
            }
          </Col>
        </Row>
        {checado
          ? horarios.map((horario) => (
            <Row className="borda mb-3 p-2" key={`${horario.sala}`}>
              <Col>
                <h5 className="font-weight-bold text-lowercase">Sala {horario.sala}</h5>
                <Row>
                  {
                    horario.horario.map((h2, index) => (
                      <button
                        className="btn bg-brown m-2"
                        type="submit" key={index} onClick={() => selecionarAssentos(horario.sala, h2.ses_id)}>
                        {formatarHora(h2.ses_horarioInicio)}
                      </button>
                    ))
                  }
                </Row>
              </Col>
            </Row>
          ))
          : null
        }
      </Container>
    </React.Fragment>
  );
}