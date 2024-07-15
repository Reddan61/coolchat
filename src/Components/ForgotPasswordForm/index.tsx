import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Button, DialogActions } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { renderTextField } from "../../Components/Formik/Fields/Fields";
import { AuthApi } from "../../API/Auth";
import { isSuccess } from "../../Utils/api";
import axios from "axios";

interface Props {
  onCancel: () => void;
}

export const ForgotPasswordForm: React.FC<Props> = ({ onCancel }) => {
  const { enqueueSnackbar } = useSnackbar();

  const forgot = async (email: string) => {
    try {
      const response = await AuthApi.forgotPassword(email);

      if (isSuccess(response.status)) {
        enqueueSnackbar("Сообщение отправлено на вашу почту");
      }
    } catch(err) {
      if(!axios.isAxiosError(err)) return;

      const status = err.response?.status;

      if (status === 404) {
        enqueueSnackbar("Пользователь не найден!", {
          variant: "error",
        });

        return;
      }

      if (status === 406) {
        enqueueSnackbar("Почта не подтверждена!", {
          variant: "error",
        });

        return;
      }

      enqueueSnackbar("Что-то пошло не так!", {
        variant: "error",
      });
    }
  };

  const submit = async (values: { email: string }, { setSubmitting }: any) => {
    setSubmitting(true);
    await forgot(values.email);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={submit}
      validationSchema={forgotPasswordSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            margin="dense"
            type="text"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : null}
            fullWidth
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

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Неправильный формат").required("Необходимое поле"),
});
