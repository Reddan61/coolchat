import { FC, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { renderTextField } from "../Formik/Fields/Fields";

interface Props {
  submit: (text: string) => unknown;
}
interface Fields {
  search: string
}

const UserSearch: FC<Props> = ({ submit }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null) 

  const submitForm = (values: Fields) => {
    clearTimeout(timeoutRef.current ?? undefined);

    timeoutRef.current = setTimeout(() => {
      submit(values.search.trim());
    }, 1000);
  }

  return (
    <Formik initialValues={{ search: "" }} 
      onSubmit={submitForm}
    >
      {({ handleChange, submitForm }) => (
        <Form>
          <Field
            fullWidth
            margin="dense"
            label="Поиск"
            type="text"
            name="search"
            component={renderTextField}
            onChange={(e: any) => {
              handleChange(e);
              submitForm()
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserSearch;
