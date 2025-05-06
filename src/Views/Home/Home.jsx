import CardsEquipos from "../../Components/CardsEquipos/CardsEquipos";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEquiposData } from "../../Store/Slices/equiposSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEquiposData());
  }, [dispatch]);

  return (
    <div>
      <CardsEquipos />
    </div>
  );
}
