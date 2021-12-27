import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function MiEspacio(
  nombre,
  setNombre,
  email,
  setEmail,
  contraseña,
  setContraseña,
  setVariante,
  setMensaje
) {
  const [contraseñaNew, setContraseñaNew] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [nombreNew, setNombreNew] = useState("");

  function modificarNombre() {
    console.log(nombre);
    axios({
      method: "PUT",
      data: {
        nombre: nombreNew,
      },
      withCredentials: true,
      url: "http://localhost:3001/usuarios/modificarnombre",
    }).then((res) => {
      console.log(res.data);
      setNombreNew("");
      /* setVariante("success");
      setMensaje(res.data.mensaje); */
    });
  }

  return (
    <div className=" top areaUsuario fondoVerde">
      <Tabs
        defaultActiveKey="datos"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="datos" title="Mis datos" className="tabArea">
          <div className="flex">
            <p className="rosa bold mright10">Nombre: </p> <p>Lorem ipsum</p>
          </div>
          <div className="flex">
            <p className="rosa bold mright10">Email: </p> <p>Lorem ipsum</p>
          </div>

          <h4 className="rosa bold modificarDatos ">Modificar mis datos</h4>
          <div className="flex">
            <input
              className="inputModificar mright20"
              type="text"
              placeholder="Nombre"
              value={nombreNew}
              onChange={(e) => setNombreNew(e.target.value)}
            />
            <Button
              id="botonLogin"
              className="botonmodificar"
              onClick={modificarNombre}
            >
              Modificar
            </Button>
          </div>
          <div className="flex">
            <input
              className="inputModificar mright20"
              type="email"
              placeholder="Email"
              value={emailNew}
              onChange={(e) => setEmailNew(e.target.value)}
            />
            <button className="botonmodificar">Modificar</button>
          </div>
          <div className="flex">
            <input
              className="inputModificar mright20"
              type="password"
              placeholder="Contraseña"
              value={contraseñaNew}
              onChange={(e) => setContraseñaNew(e.target.value)}
            />
            <button className="botonmodificar">Modificar</button>
          </div>

          {/* <button className="botonLogin" onClick={modificar}>
            Modificar datos
          </button> */}
        </Tab>
        <Tab eventKey="recetasFavs" title="Recetas favoritas"></Tab>
        <Tab eventKey="misRecetas" title="Mis recetas"></Tab>
      </Tabs>
    </div>
  );
}

export default MiEspacio;
