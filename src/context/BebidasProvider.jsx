import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BebidasContext = createContext();

function BebidasProvider({ children }) {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);

  const obtenerBebidas = async (datos) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
    const { data } = await axios(url);
    setBebidas(data.drinks);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return;
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  return (
    <BebidasContext.Provider
      value={{
        obtenerBebidas,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
}

export { BebidasProvider };
export default BebidasContext;
