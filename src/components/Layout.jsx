import Navvbar from "./Navvbar"
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navvbar />
      <Outlet />
    </>
  );
}

export default AppLayout;

