import { Link } from "react-router-dom";

//Bootstrap Import
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

//FontAwesome icons Import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faBurn } from "@fortawesome/free-solid-svg-icons";
import { faSignal } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

function RecetasLog(props) {
  /* RECETA COMPLETA EN UNA SOLA PÁGINA*/
  if (props.full) {
    let pasosObj = [];
    let ingredientesObj = [];
    pasosObj = Object.entries(props.pasos);
    console.log(pasosObj);
    ingredientesObj = Object.entries(props.ingredientes);
    console.log(ingredientesObj);
    let mostrarPasos = pasosObj.map((paso) => {
      return (
        <div className="pasos">
          <p className="mtop10">
            <span className="rosa bold ">{paso[0]}</span>
            <br></br>
            {paso[1]}
          </p>
        </div>
      );
    });

    let ingredientes = ingredientesObj.map((ingrediente) => {
      return (
        <>
          <p className="mright20">{ingrediente[0]}</p>
        </>
      );
    });

    let mostrarIngredientes = ingredientesObj.map((ingrediente) => {
      return (
        <div className="pasos">
          <p className="bold mright10">{ingrediente[0]}:</p>
          <p>{ingrediente[1]}</p>
        </div>
      );
    });

    return (
      <>
        {/* link para volver al listado de recetas según categoria */}
        <div className="volver ">
          <Link className="sinLinea negro" to={"/recetas/" + props.categoria}>
            <p className="negroLink">
              <FontAwesomeIcon
                className="rosa marginRignt"
                icon={faChevronCircleLeft}
              />
              Volver al listado de recetas
            </p>
          </Link>
        </div>

        {/* Comienzo de la receta */}
        <div className="receta " key={props.nombre}>
          {/*  <img src={props.img} alt={props.nombre} /> */}
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={props.img1}
                alt={props.nombre}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={props.img2}
                alt={props.nombre}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={props.img3}
                alt={props.nombre}
              />
            </Carousel.Item>
          </Carousel>
          <h2 className="rosa playfair mtop10 ">{props.nombre}</h2>

          {/* linea con iconos y pequeña info extra */}
          <div className="flex negro ">
            <p className="mRight25 ">
              <FontAwesomeIcon className="rosa" icon={faClock} /> {props.tiempo}{" "}
              minutos
            </p>
            <p className="mRight25 ">
              <FontAwesomeIcon className="rosa" icon={faSignal} />{" "}
              {props.dificultad} dificultad
            </p>
            <p className="mRight25 ">
              <FontAwesomeIcon className="rosa" icon={faBurn} /> {props.kcal}{" "}
              kcal
            </p>
          </div>

          {/* ingredientes y pasos separados en pestañas */}
          <Tabs
            defaultActiveKey="ingredientes"
            transition={false}
            id="noanim-tab-example"
            className="mb-3 "
          >
            {/* ingredientes*/}
            <Tab
              className="widthLinea tabReceta"
              eventKey="ingredientes"
              title="Ingredientes"
            >
              <div className="ingredientes ">{ingredientes}</div>
              <div>{mostrarIngredientes}</div>
            </Tab>

            {/* pasos */}
            <Tab
              className="widthLinea tabReceta"
              eventKey="pasos"
              title="Pasos"
            >
              <div>{mostrarPasos}</div>
            </Tab>
            <Tab
              className="widthLinea tabReceta"
              eventKey="Trucos"
              title="Trucos"
            >
              <Row>
                <Col xl={10} l={10} md={9} s={12}>
                  <div className="truco">{props.truco}</div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </>
    );
  } else {
    /* LISTADO con imagen y nombre de receta en cards */
    return (
      <div className="cardReceta top borde " key={props.index}>
        <Link
          className="sinLinea negro"
          to={
            "/recetas/" +
            props.categoria +
            "/" +
            props.nombre /* .replace(/ |[áéíóú]/g, "-" */
          }
        >
          <img src={props.img} alt={props.nombre} />
          <h1 className="menor playfair mtop10">{props.nombre}</h1>
          <div className="flex negro mb-10">
            <p className="mRight25 ">
              <FontAwesomeIcon className="negro" icon={faClock} />{" "}
              {props.tiempo} minutos
            </p>
            <p className="mRight25 ">
              <FontAwesomeIcon className="negro" icon={faSignal} />{" "}
              {props.dificultad} dificultad
            </p>
          </div>
          {/* <div>
            <FontAwesomeIcon className="corazon" icon={faHeart} />
          </div> */}
        </Link>
      </div>
    );
  }
}

export default RecetasLog;
