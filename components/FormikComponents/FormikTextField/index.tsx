import styles from './textField.module.scss';
import { Field, ErrorMessage, useField } from 'formik';

type fieldInputs = {
  type: string;
  name: string;
  margin?: number;
};
const FormikTextField: React.FC<fieldInputs> = ({ type, name, margin = 6 }) => {
  const [field, meta] = useField(name);
  const errorClass = meta.error && meta.touched ? styles.field__error : '';
  return (
    <div
      className={styles.formik__text__field}
      style={{ margin: `${`${margin.toString()}px`} 0px` }}
    >
      <div className={`${styles.form__field__wrapper} ${errorClass}`}>
        <Field className={styles.form__field} type={type} name={name} />
      </div>
      <ErrorMessage
        className={styles.form__input__error}
        name={name}
        component='div'
      />
    </div>
  );
};
export default FormikTextField;
