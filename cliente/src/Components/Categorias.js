import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import img from "../img/5ingredientes.jpg";
import img1 from "../img/20minutos.jpg";
import img2 from "../img/postre.jpg";
import img3 from "../img/vegetaiano.jpg";
import img4 from "../img/singluten.jpg";
import img5 from "../img/asiatico.jpg";
import img6 from "../img/mexicano.jpg";
import img7 from "../img/italiano.jpg";

function Categorias() {
  return (
    <div>
      <h2 className="rosa centrar outfit mayor paddTop">Categorias</h2>
      <Row className="categorias">
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/5ingredientes"
            className="logo playfair mayor cardCategoria borde"
          >
            <img src={img} alt="Icono de la categoría 5 ingredientes o menos" />
            <h4>
              5 ingredientes <br></br>o menos
            </h4>
          </Link>
        </Col>

        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/postre"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img2} alt="Icono de la categoría postres" />
            <h4>Postres </h4>
          </Link>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/vegetariano"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img3} alt="Icono de la categoría vegetariano" />
            <h4>Vegetariano</h4>
          </Link>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/singluten"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img4} alt="Icono de la categoría sin gluten" />
            <h4>Sin gluten</h4>
          </Link>
        </Col>
      </Row>
      <Row className="categorias blanco">
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="recetas/20minutos"
            className="logo playfair mayor cardCategoria borde"
          >
            <img src={img1} alt="Icono de la categoría 20 minutos o menos" />
            <h4>
              20 minutos <br></br>o menos
            </h4>
          </Link>
        </Col>

        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/asiatico"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img5} alt="Icono de la categoría comida asiatica" />
            <h4>Asiático</h4>
          </Link>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/mexicano"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img6} alt="Icono de la categoría mexicano" />
            <h4>Mexicano</h4>
          </Link>
        </Col>
        <Col xl={3} l={3} md={6} s={12}>
          <Link
            to="/recetas/italiano"
            className="logo playfair mayor cardCategoria borde pb"
          >
            <img src={img7} alt="Icono de la categoría italiano" />
            <h4>Italiano</h4>
          </Link>
        </Col>
        <Col xl={12} l={12} md={12} s={12}>
          <Link
            to="/recetas/todas"
            className="logo playfair mayor todaCategoria borde "
          >
            <h4>Ver todas las recetas</h4>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Categorias;
