import { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, DialogActions } from "@material-ui/core";
import { renderTextField } from "../Formik/Fields/Fields";
import { useNavigate, useParams } from "react-router-dom";
import { AuthApi } from "../../API/Auth";
import { isSuccess } from "../../Utils/api";
import { useSnackbar } from "notistack";

type ResetPasswordFormType = {
  password: string;
  password2: string;
};

interface ResetPasswordData {
  password: string;
  password2: string;
  resetToken: string;
}

export const ResetForm: FC = () => {
  const { token } = useParams<{
    token: string;
  }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      const response = await AuthApi.resetPassword(data);

      if (isSuccess(response.status)) {
        enqueueSnackbar("Пароль изменён");
      }

      redirect();
    } catch {
      enqueueSnackbar("Что-то пошло не так!");
    }
  };

  const submit = async (
    values: ResetPasswordFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!token) return null;

    const data = { ...values, resetToken: token };
    await resetPassword(data);

    setSubmitting(false);
  };

  const redirect = () => {
    navigate("/auth");
  };

  return (
    <Formik
      initialValues={{ password: "", password2: "" }}
      onSubmit={submit}
      validationSchema={resetPasswordSchema}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form>
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
            <Button color="primary" onClick={redirect}>
              Назад
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

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Слишком короткий пароль")
    .required("Необходимое поле"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Необходимое поле"),
});
