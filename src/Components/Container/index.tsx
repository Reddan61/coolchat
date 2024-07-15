import { Outlet } from "react-router-dom";
import { Box, Container as ContainerMUI } from "@material-ui/core";
import Header from "../Header";
import { PrivateRoute } from "../../HOC/PrivateRoute";

export const Container = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Header />
      <ContainerMUI
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          padding: "20px",
        }}
      >
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      </ContainerMUI>
    </Box>
  );
};
