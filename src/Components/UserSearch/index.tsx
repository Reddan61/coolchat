import { FC, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { renderTextField } from "../Formik/Fields/Fields";

interface Props {
  onChangeInput: (text: string) => unknown;
}

const UserSearch: FC<Props> = ({ onChangeInput }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null) 

  const submit = (values: { search: string }) => {
    clearTimeout(timeoutRef.current ?? undefined);

    timeoutRef.current = setTimeout(() => {
      onChangeInput(values.search.trim());
    }, 1000);
  };

  return (
    <Formik initialValues={{ search: "" }} onSubmit={submit}>
      {({ handleChange, submitForm, isSubmitting }) => (
        <Form>
          <Field
            fullWidth
            margin="dense"
            label="Поиск"
            type="text"
            name="search"
            component={renderTextField}
            onChange={(e: any) => {
              if (isSubmitting) return;
              
              handleChange(e);
              submitForm();
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserSearch;
