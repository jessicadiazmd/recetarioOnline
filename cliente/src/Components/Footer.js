import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import img from "../img/rrss.png";

function Footer() {
  return (
    <footer className="blanco">
      <Row>
        <Col xl={3} l={3} md={6} s={12}>
          <h4>Cook Lover</h4>
          <p>Recetario online gratuito</p>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <p className="bold">Contacto</p>
          <p>
            Contacta con nosotros en<br></br>cookeasy@gmail.com
          </p>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <p className="bold">Seguridad y privacidad</p>
          <p>
            Términos y condiciones<br></br>Política de privacidad
          </p>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <p className="bold">Buscanos en:</p>
          <img className="rrss" src={img} alt="Iconos de redes sociales" />
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
