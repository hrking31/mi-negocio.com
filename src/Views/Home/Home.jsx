import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEquiposData } from "../../Store/Slices/equiposSlice";
import Drawer from "../../Components/Drawer/Drawer.jsx";
import ModalDemo from "../../Components/ModalDemo/ModalDemo.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const equipos = useSelector((state) => state.equipos.equipos);
  const shouldOpen = location.state?.mostrarModal === true;
  const [open, setOpen] = useState(shouldOpen);

  useEffect(() => {
    if (equipos.length === 0) {
      dispatch(fetchEquiposData());
    }
  }, [dispatch, equipos]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer />
      <ModalDemo open={open} onClose={handleClose} />
    </>
  );
}
