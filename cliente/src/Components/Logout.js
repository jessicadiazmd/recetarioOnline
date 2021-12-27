import { Button } from "react-bootstrap";
import Axios from "axios";

export const Logout = ({
  user,
  setUser,
  logged,
  setLogged,
  setVariante,
  setMensaje,
}) => {
  function logout() {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    }).then((res) => {
      if (!res.data.logged) {
        setLogged(false);
        setUser(null);
        setMensaje(res.data.mensaje);
        setVariante("success");
      } else {
        setMensaje("Logout Incorrecto");
        setVariante("danger");
      }
    });
  }

  return (
    <>
      <Button variant="danger" onClick={() => setLogged(false)}>
        {" "}
        {/* onClick={logout} */}
        Logout
      </Button>
    </>
  );
};
