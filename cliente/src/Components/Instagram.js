import imgInstagram from "../img/instagram.jpg";
import imgInstagram1 from "../img/instagram1.jpg";
import imgInstagram2 from "../img/instagram2.jpg";
import imgInstagram3 from "../img/instagram3.jpg";
import imgInstagram4 from "../img/instagram4.jpg";
import imgInstagram5 from "../img/instagram5.jpg";
import imgInstagram6 from "../img/instagram6.jpg";
import imgInstagram7 from "../img/instagram7.jpg";

function Instagram() {
  return (
    <div className="instagram outfit paddTop">
      <h2 className="rosa centrar mayor">Siguenos en Instagram</h2>
      <h3 className="rosa centrar ">@cooklover</h3>
      <div className="galeriaInstagram">
        <img
          src={imgInstagram}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram4}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram3}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram5}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram6}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram2}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram7}
          alt="Imagen de comida"
          className="imgInstagram"
        />
        <img
          src={imgInstagram1}
          alt="Imagen de comida"
          className="imgInstagram"
        />
      </div>
    </div>
  );
}

export default Instagram;
