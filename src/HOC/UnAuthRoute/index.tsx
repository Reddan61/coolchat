import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/store";

export const UnAuthRoute: FC = ({ children }) => {
  const isAuth = useAppSelector(state => state.AuthPage.isAuth);

  if (isAuth) {
    return <Navigate to={"/profile"} />
  }
  
  return <>{children}</>;
};
