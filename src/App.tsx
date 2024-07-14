import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./Components/Container";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import Rooms from "./Pages/Rooms";
import Auth from "./Pages/AuthPage/Auth";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { Room } from "./Pages/Room";
import { useAppSelector } from "./Redux/store";
import socket from "./Utils/socket";

const App = () => {
  const socketConnectedRef = useRef(false);
  const isAuth = useAppSelector(state => state.AuthPage.isAuth)
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

  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route index element={<Navigate to={"/profile"} />} />
      </Route>

      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/resetpassword/:token" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
