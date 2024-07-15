import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./Components/Container";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import Rooms from "./Pages/Rooms";
import Auth from "./Pages/AuthPage/Auth";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { Room } from "./Pages/Room";
import socket from "./Utils/socket";
import { useAuth } from "./hooks/useAuth";
import Loader from "./Components/Loader/Loader";
import { Box } from "@material-ui/core";
import { UnAuthRoute } from "./HOC/UnAuthRoute";

const App = () => {
  const { isLoading, isAuth } = useAuth();
  const socketConnectedRef = useRef(false);
  socketConnectedRef.current = socket.connected;

  useEffect(() => {
    if (isAuth && !socketConnectedRef.current) {
      socket.connect();
    }

    if (!isAuth && !socketConnectedRef.current) {
      socket.disconnect();
    }

    return () => {
      if (socketConnectedRef.current) {
        socket.disconnect();
      }
    };
  }, [isAuth]);

  if (isLoading) {
    return <Box 
      minHeight={"100vh"} 
      width={"100%"} 
      display={"flex"} 
      justifyContent={"center"}
      alignItems={"center"}
    >
        <Loader />
    </Box>
  }

  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route index element={<Navigate to={"/profile"} />} />
      </Route>

      <Route path="/auth" element={<UnAuthRoute><Auth /></UnAuthRoute>} />
      <Route path="/auth/resetpassword/:token" element={<UnAuthRoute><ResetPassword /></UnAuthRoute>} />

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
