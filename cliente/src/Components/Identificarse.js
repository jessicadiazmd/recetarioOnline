//import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Button } from "react-bootstrap";

import { useState } from "react";
import axios from "axios";

function Identificarse({
  user,
  setUser,
  logged,
  setLogged,
  setVariante,
  setMensaje,
  nombre,
  setNombre,
  email,
  setEmail,
  contraseña,
  setContraseña,
}) {
  //ESTADOS
  /* const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState(""); */
  const [emailRegistro, setEmailRegistro] = useState("");
  const [contraseñaRegistro, setContraseñaRegistro] = useState("");
  const [contraseñaRegistro2, setContraseñaRegistro2] = useState("");
  //const [resp, setResp] = useState({});

  function registrar() {
    axios({
      method: "post",
      url: "http://localhost:3001/signup",
      data: {
        nombre: nombre,
        email: emailRegistro,
        password: contraseñaRegistro,
        password2: contraseñaRegistro2,
      },
      withCredentials: true,
    }).then(function (res) {
      console.log(res.data);

      if (res.data.error) {
        setVariante("danger");
        setMensaje(res.data.mensaje);
      } else {
        setNombre("");
        setEmailRegistro("");
        setContraseñaRegistro("");
        setContraseñaRegistro2("");
        setVariante("success");
        setMensaje(res.data.mensaje);
      }

      //setResp(res);
    });
  }

  function login() {
    axios({
      method: "POST",
      data: {
        email: email,
        password: contraseña,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => {
      console.log(res.data);
      if (res.data.logged) {
        setLogged(res.data.logged);
        setUser(res.data.user);
        setVariante("success");
        setMensaje(res.data.mensaje);
        setNombre(nombre);
        setEmail(email);
      } else {
        setLogged(res.data.logged);
        setUser(null);
        setVariante("danger");
        setMensaje(res.data.mensaje);
      }
    });
  }

  return (
    <div className="miCuenta fondoVerde">
      <Tabs
        defaultActiveKey="login"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="login" title="Iniciar sesión">
          <p className="bold negro registro">
            Inicia sesión para ver trucos extra y más imagenes en las recetas
          </p>
          <form className="formularioLogin">
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <Button id="botonLogin" className="botonLogin" onClick={login}>
              Iniciar sesión
            </Button>
            {/* <Link to="/espacio" className="botonLogin" onClick={login}>
              Iniciar sesión
            </Link> */}
          </form>
        </Tab>
        <Tab eventKey="Register" title="Registrarse">
          <p className="bold negro registro">
            Al registrarte podrás ver trucos extra y más imagenes en las recetas
          </p>
          <form className="formularioLogin">
            <input
              type="text"
              placeholder="Nombre"
              autoComplete="username"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
            <input
              type="text"
              placeholder="Email"
              autoComplete="username"
              onChange={(e) => setEmailRegistro(e.target.value)}
              value={emailRegistro}
            />
            <input
              type="password"
              placeholder="Contraseña"
              autoComplete="new-password"
              onChange={(e) => setContraseñaRegistro(e.target.value)}
              value={contraseñaRegistro}
            />

            <input
              type="password"
              placeholder="Repite la contraseña"
              autoComplete="new-password"
              onChange={(e) => setContraseñaRegistro2(e.target.value)}
              value={contraseñaRegistro2}
            />

            <Button
              id="botonRegistrar"
              className="botonLogin"
              onClick={registrar}
            >
              Registrarme
            </Button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Identificarse;
