import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//Components Import
import Cabecera from "./Components/Cabecera";
import CabeceraLogeado from "./Components/CabeceraLogeado";
import Home from "./Components/Home";
import Recetario from "./Components/Recetario";
import RecetarioLog from "./Components/RecetarioLog";
import Identificarse from "./Components/Identificarse";
import MiEspacio from "./Components/MiEspacio";
import Footer from "./Components/Footer";
import Receta from "./Components/Receta";
import RecetaLog from "./Components/RecetaLog";

/* import { Logout } from "./Logout";*/
import { Feedback } from "./Components/Feedback";

function App() {
  //Estados
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [variante, setVariante] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    mensaje ? setTimeout(() => setMensaje(null), 4000) : console.log("");
  }, [mensaje]);

  if (!logged) {
    return (
      <>
        <BrowserRouter>
          <Cabecera />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recetas/:categoria/" element={<Recetario />} />
            <Route path="/recetas/:categoria/:nombre" element={<Receta />} />

            <Route
              path="/identificarse"
              element={
                <Identificarse
                  user={user}
                  setUser={setUser}
                  logged={logged}
                  setLogged={setLogged}
                  setVariante={setVariante}
                  setMensaje={setMensaje}
                  nombre={nombre}
                  setNombre={setNombre}
                  email={email}
                  setEmail={setEmail}
                  contraseña={contraseña}
                  setContraseña={setContraseña}
                />
              }
            />
          </Routes>
        </BrowserRouter>
        <Feedback variante={variante} mensaje={mensaje} />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <CabeceraLogeado setLogged={setLogged} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recetas/:categoria/" element={<RecetarioLog />} />
            <Route path="/recetas/:categoria/:nombre" element={<RecetaLog />} />

            <Route path="/identificarse" element={<Home />} />

            {/* <Route
              path="/espacio"
              element={
                <MiEspacio
                  nombre={nombre}
                  setNombre={setNombre}
                  email={email}
                  setEmail={setEmail}
                  contraseña={contraseña}
                  setContraseña={setContraseña}
                />
              }
            /> */}
          </Routes>
        </BrowserRouter>
        <Feedback variante={variante} mensaje={mensaje} />
        <Footer />
      </>
    );
  }
}

export default App;
