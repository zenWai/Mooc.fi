import { useField } from 'formik';

import TextInput from './TextInput';
import ErrorText from "./theme/ErrorText";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <ErrorText >{meta.error}</ErrorText>}
    </>
  );
};

export default FormikTextInput;