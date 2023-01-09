import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Sidebar from "src/components/Sidebar/Sidebar";
import openSocket from "src/utils/socket-io";
import { updateUser } from "src/redux/slicers/userSlice";
import api from "src/utils/api";

function PrivateRoutes() {
  const { user, token } = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = openSocket();
    socket.on("user-update", (updatedUser) => {
      dispatch(updateUser(updatedUser));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }, [token]);

  return user ? (
    <>
      <Sidebar />
      <Box sx={(theme) => ({ ml: "75px" })}>
        <Outlet />
      </Box>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}
export default PrivateRoutes;
