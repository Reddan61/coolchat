import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import { useAppSelector } from "../../Redux/store";

export const PrivateRoute: FC = ({ children }) => {
  const { isLoading } = useAuth();
  const isAuth = useAppSelector(state => state.AuthPage.isAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate("/auth")
    }
  }, [isAuth, isLoading])
  
  if (isLoading) return <Loader />;

  return <>{children}</>;
};
