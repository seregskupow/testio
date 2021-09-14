import "./style.scss";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { TFunction } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import CenteredContainer from "../../../../Layout elements/CenteredContainer";
import ProviderButtons from "../../ProvidersButtons";
import FormikTextField from "../../../../Components/FormsComponents/FormikTextField";
import FormikSubmitButton from "../../../../Components/FormsComponents/FormikSubmitButton";
import LanguageSwitcher from "../../../../Components/LanguageSwitcher";
import FormikLabel from "../../../../Components/FormsComponents/FormikLabel";
import MyLink from "../../../../Components/MyLink";
import { signUp } from "../../../../../redux/actions/authAction";

export default function EmployeeRegisterForm({ t }: { readonly t: TFunction }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.errorMessage);
  const validationSchema = yup.object({
    name: yup.string().min(6).max(20).required(),
    email: yup
      .string()
      .email(t("auth:invalidEmail"))
      .required(t("auth:invalidEmail")),
    password: yup
      .string()
      .min(8, t("auth:invalidPassword"))
      .max(15, t("auth:invalidPassword"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        t("auth:invalidPassword")
      )
      .required(t("auth:invalidPassword")),
    passwordConfirmation: yup
      .string()
      .min(8, t("auth:invalidPassword"))
      .max(15, t("auth:invalidPassword"))
      .oneOf([yup.ref("password"), null], t("auth:invalidPassword"))
      .required(t("auth:invalidPassword")),
  });
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <CenteredContainer direction="column" align="center">
        <Formik
          validateOnChange
          initialValues={{ email: "", password: "", passwordConfirmation: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(signUp(values));
            if (!isLoading) setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete="off" className="auth__form">
              {error && <h2 style={{ color: "red" }}>{error}</h2>}
              <FormikLabel text={t("auth:enterFIO")} fontSize={2} />
              <FormikTextField type="text" name="name" />
              <FormikLabel text={t("auth:enterEmail")} fontSize={2} />
              <FormikTextField type="text" name="email" />
              <FormikLabel text={t("auth:enterPassword")} fontSize={2} />
              <FormikTextField type="password" name="password" />
              <FormikLabel text={t("auth:repeatPassword")} fontSize={2} />
              <FormikTextField type="password" name="passwordConfirmation" />
              <FormikSubmitButton
                text={t("auth:registerLink")}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <ProviderButtons />
        <LanguageSwitcher />
      </CenteredContainer>
    </motion.div>
  );
}
