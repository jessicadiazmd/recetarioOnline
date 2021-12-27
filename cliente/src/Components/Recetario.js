import Recetas from "./Recetas";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Recetario() {
  const [categoria, setCategoria] = useState([]);
  let params = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/recetas/${params.categoria}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoria(data.results);
      });
  }, []);

  return (
    <>
      <div className="cardRecetario top">
        {categoria.map((receta, index) => {
          return (
            <Recetas
              key={index}
              full={false}
              img={receta.img}
              nombre={receta.nombre}
              dificultad={receta.dificultad}
              tiempo={receta.tiempo}
              kcal={receta.kcal}
              pasos={receta.pasos}
              ingredientes={receta.ingredientes}
              categoria={receta.categoria}
            />
          );
        })}
      </div>
    </>
  );
}

export default Recetario;
