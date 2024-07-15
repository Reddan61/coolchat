import { useAppSelector } from "../Redux/store";
import {
  AUTH_REDUCERS_TYPES,
  AuthReducerActions,
  logOutThunk,
} from "../Redux/Reducers/authReducer";
import { useDispatch } from "react-redux";
import { AuthApi } from "../API/Auth";
import { isSuccess } from "../Utils/api";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuth = useAppSelector(state => state.AuthPage.isAuth)

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    me();
  }, [])

  const me = async () => {
    setLoading(true);
    try {
      const response = await AuthApi.me();

      if (isSuccess(response.status)) {
        dispatch(
          AuthReducerActions[AUTH_REDUCERS_TYPES.ISLOGINNED](response.data)
        );
      }
    } catch {
      dispatch(logOutThunk());
    }
    setLoading(false);
  };

  return {
    isLoading,
    isAuth
  };
};
