import { Alert } from "react-bootstrap";

export const Feedback = ({ variante, mensaje }) => {
  return (
    <>
      {mensaje ? <Alert variant={variante || "primary"}>{mensaje}</Alert> : ""}
    </>
  );
};
