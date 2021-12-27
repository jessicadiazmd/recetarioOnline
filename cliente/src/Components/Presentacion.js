import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import img from "../img/comida_bn.png";

function Presentacion() {
  return (
    <Row className="inicio top2">
      <Col s={8} sm={8} md={6} lg={5} xl={5} className="textoInicio">
        <p className="playfair">
          <span className="negro mayor interlineado">Encuentra</span>
          <br></br>
          <span className="rosa mayor interlineado">la receta perfecta</span>
          <br></br>
          <span className="negro mayor interlineado">para cada momento</span>
        </p>
        <p className="negro ">
          En Cook Lover podrás encontrar recetas por categorias o buscandolas
          por su nombre o sus ingredientes.<br></br>
          También puedes guardarte las recetas en favoritos o subir las tuyas
          propias creandote una cuenta gratuita.
        </p>
      </Col>
      <Col>
        <img src={img} alt="Imagen de comida" />
      </Col>
    </Row>
  );
}

export default Presentacion;
