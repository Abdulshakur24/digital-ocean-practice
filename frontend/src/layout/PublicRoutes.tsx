import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/redux/store";

function PublicRoutes() {
  const { user } = useSelector((state: RootState) => state.userState);

  return user ? <Navigate to={"/"} /> : <Outlet />;
}
export default PublicRoutes;
