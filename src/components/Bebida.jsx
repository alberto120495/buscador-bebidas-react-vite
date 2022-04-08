import { Card, Col, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

function Bebida({ bebida }) {
  const { handleModalClick, handleBebidaIdClick } = useBebidas();
  return (
    <Col md={6} lg={4}>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={`Imagen de ${bebida.strDrink}`}
        />

        <Card.Body>
          <Card.Title>{bebida.strDrink}</Card.Title>
          <Card.Text>
            {bebida.strInstructions}
            <br />
            <Button
              className="w-100"
              variant="info"
              onClick={() => {
                handleModalClick();
                handleBebidaIdClick(bebida.idDrink);
              }}
            >
              Ver receta
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Bebida;
