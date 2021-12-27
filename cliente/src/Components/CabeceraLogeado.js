import { Link } from "react-router-dom";

function Cabecera(setLogged) {
  return (
    <header>
      <nav>
        <div>
          <Link to="/" className="logo outfit mayor">
            <p>Cook Lover</p>
          </Link>
        </div>
        <div className="navLogeado">
          {/* <Link to="/espacio" className="logo outfit menor mright50">
            <p>Mi espacio</p>
          </Link> */}

          <Link
            to="/identificarse"
            className="logo outfit menor"
            onClick={() => setLogged(false)}
          >
            <p>Logout</p>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Cabecera;
