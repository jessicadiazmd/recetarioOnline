import Recetas from "./Recetas";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Receta() {
  const [receta, setReceta] = useState([]);
  const [loading, setLoading] = useState(false);
  let params = useParams();
  useEffect(() => {
    console.log(params.categoria);
    console.log(params.nombre);

    setLoading(true);
    fetch(`http://localhost:3001/recetas/${params.categoria}/${params.nombre}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          setReceta(() => {
            return (
              <Recetas
                full={true}
                img={data.results[0].img}
                nombre={data.results[0].nombre}
                dificultad={data.results[0].dificultad}
                tiempo={data.results[0].tiempo}
                kcal={data.results[0].kcal}
                pasos={data.results[0].pasos}
                ingredientes={data.results[0].ingredientes}
                categoria={data.results[0].categoria}
              />
            );
          });
        }
        console.log(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="receta top">
        {loading ? <h1>Cargando...</h1> : <> {receta}</>}
      </div>
    </>
  );
}

export default Receta;
