import { Link } from "react-router-dom";

function Cabecera() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo outfit mayor">
          <p>Cook Lover</p>
        </Link>
        <Link to="/identificarse" className="logo outfit menor">
          <p>Identificarse</p>
        </Link>
      </nav>
    </header>
  );
}

export default Cabecera;
