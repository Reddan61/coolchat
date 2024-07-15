import { FC } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button, DialogActions } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { renderTextField } from "../Formik/Fields/Fields";
import { AUTH_REDUCERS_TYPES, AuthReducerActions, RegistrationFormDataType } from "../../Redux/Reducers/authReducer";
import { AuthApi } from "../../API/Auth";
import { isSuccess } from "../../Utils/api";
import axios, { AxiosError } from "axios";

interface Props {
  onCancel: () => void;
  close: () => void;
}

export const RegistrationForm: FC<Props> = ({ onCancel, close }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const registration = async (values: RegistrationFormDataType) => {
    try {
      const response = await AuthApi.registration(values);

      if (isSuccess(response.status)) {
        dispatch(AuthReducerActions[AUTH_REDUCERS_TYPES.REGISTRATION](response.data));

        enqueueSnackbar("Успешно!");
        close();
      }
    } catch(err: any) {
      if(!axios.isAxiosError(err)) return;
      const status = err.response?.status;

      if (status === 400) {
        enqueueSnackbar("Такой пользователь уже существует!", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Что-то пошло не так!", {
          variant: "error",
        });
      }
    }
  };
  
  const submit = async (
    values: RegistrationFormDataType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);

    await registration(values);

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ password: "", username: "", email: "", password2: "" }}
      onSubmit={submit}
      validationSchema={registrationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field
            name="username"
            autoFocus
            component={renderTextField}
            label="Имя пользователя"
            margin="dense"
            type="text"
            fullWidth
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username ? errors.username : null}
          />
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            margin="dense"
            type="email"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : null}
          />
          <Field
            name="password"
            component={renderTextField}
            label="Пароль"
            margin="dense"
            type="password"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password ? errors.password : null}
          />
          <Field
            name="password2"
            component={renderTextField}
            label="Подтвердите пароль"
            margin="dense"
            type="password"
            fullWidth
            error={touched.password2 && Boolean(errors.password2)}
            helperText={touched.password2 ? errors.password2 : null}
          />
          <DialogActions>
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

const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Слишком короткое имя")
    .max(20, "Слишком длинное имя")
    .required("Необходимое поле"),
  email: Yup.string().email("Неправильный формат").required("Необходимое поле"),
  password: Yup.string()
    .min(6, "Слишком короткий пароль")
    .required("Необходимое поле"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Необходимое поле"),
});
