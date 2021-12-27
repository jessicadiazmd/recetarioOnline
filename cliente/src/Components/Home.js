//Components Import
import Presentacion from "./Presentacion";
import Buscador from "./Buscador";
import Categorias from "./Categorias";
import Instagram from "./Instagram";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

function Home() {
  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <body className="fondoVerde">
      <Buscador />
      <Presentacion />
      <Categorias />
      <Instagram />
      <button className="botonTop" onClick={toTop}>
        <FontAwesomeIcon className="rosa arrow" icon={faArrowCircleUp} />
      </button>
    </body>
  );
}

export default Home;
