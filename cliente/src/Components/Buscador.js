import { useState } from "react";

//FontAwesome icons Import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Buscador() {
  const [busqueda, setBusqueda] = useState("");
  return (
    <div className="buscador">
      <FontAwesomeIcon className="blanco mright10 " icon={faSearch} />
      <input
        type="text"
        placeholder="Busca una receta por su nombre"
        onChange={(e) => setBusqueda(e.target.value)}
        value={busqueda}
      />
    </div>
  );
}

export default Buscador;
