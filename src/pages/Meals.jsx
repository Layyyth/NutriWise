import { useParams } from "react-router-dom";

function Meals() {
  const { type } = useParams();

  return <div>{type}</div>;
}

export default Meals;
