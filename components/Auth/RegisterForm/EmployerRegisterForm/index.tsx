import "./style.scss";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { TFunction } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import CenteredContainer from "../../../../Layout elements/CenteredContainer";
import ProviderButtons from "../../ProvidersButtons";
import FormikTextField from "../../../../Components/FormsComponents/FormikTextField";
import FormikSubmitButton from "../../../../Components/FormsComponents/FormikSubmitButton";
import LanguageSwitcher from "../../../../Components/LanguageSwitcher";
import FormikLabel from "../../../../Components/FormsComponents/FormikLabel";

export default function EmployerRegisterForm({ t }: { readonly t: TFunction }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <CenteredContainer direction="column" align="center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={() => ({})}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off" className="auth__form">
              <FormikLabel text={t("auth:enterFIO")} fontSize={2} />
              <FormikTextField type="text" name="email" />

              <FormikLabel text={t("auth:enterCompanyName")} fontSize={2} />
              <FormikTextField type="text" name="email" />

              <FormikLabel text={t("auth:enterCompanyWebsite")} fontSize={2} />
              <FormikTextField type="text" name="email" />

              <FormikLabel text={t("auth:enterEmail")} fontSize={2} />
              <FormikTextField type="email" name="email" />

              <FormikLabel text={t("auth:enterPassword")} fontSize={2} />
              <FormikTextField type="password" name="password" />

              <FormikLabel text={t("auth:repeatPassword")} fontSize={2} />
              <FormikTextField type="password" name="password" />

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
