import { FC } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, DialogActions, Link } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { renderTextField } from "../Formik/Fields/Fields";
import { AUTH_REDUCERS_TYPES, AuthReducerActions, LoginFormDataType } from "../../Redux/Reducers/authReducer";
import { AuthApi } from "../../API/Auth";
import { isSuccess } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

interface Props {
  onCancel: () => void;
  onForgot: () => void;
}

export const LoginForm: FC<Props> = ({ onCancel, onForgot }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values: LoginFormDataType) => {
    try {
      const response = await AuthApi.login(values);

      if (isSuccess(response.status)) {
        dispatch(AuthReducerActions[AUTH_REDUCERS_TYPES.LOGIN](response.data));
        return true;
      }
    } catch {
      enqueueSnackbar("Ошибка авторизации", {
        variant: "error",
      });
    }

    return false;
  };

  const submit = async (
    values: LoginFormDataType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);

    const success = await login(values);

    if (success) {
      navigate('/profile');
    } else {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ password: "", username: "" }}
      onSubmit={submit}
      validationSchema={LoginSchema}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form>
          <Field
            fullWidth
            margin="dense"
            label="Имя пользователя"
            type="text"
            name="username"
            component={renderTextField}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username ? errors.username : null}
          />
          <Field
            fullWidth
            label="Пароль"
            margin="dense"
            type="password"
            name="password"
            component={renderTextField}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password ? errors.password : null}
          />
          <DialogActions>
            <Box
              style={{
                flex: "1 0 0",
              }}
            >
              <Link
                component="button"
                onClick={(e: any) => {
                  e.preventDefault();
                  onForgot();
                }}
              >
                Забыли пароль?
              </Link>
            </Box>
            <Button onClick={onCancel} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              Отправить
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Слишком короткое имя")
    .max(20, "Слишком длинное имя")
    .required("Необходимое поле"),
  password: Yup.string()
    .min(6, "Слишком короткий пароль")
    .required("Необходимое поле"),
});
function enqueueSnackbar(arg0: string, arg1: { variant: string; }) {
  throw new Error("Function not implemented.");
}

