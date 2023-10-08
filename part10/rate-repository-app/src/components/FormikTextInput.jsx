import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
  errorField: {
    width: '80%',
    borderColor: 'red',
    borderWidth: 1,
  },
});

function FormikTextInput(props) {
  const [field, meta, helpers] = useField(props.name);
  const showError = meta.error && meta.touched;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError ? styles.errorField : {}}
        {...props}
        secureTextEntry={props.secureTextEntry}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
}

export default FormikTextInput;
