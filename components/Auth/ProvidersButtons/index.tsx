import "./style.scss";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { Props } from "framer-motion/types/types";
import { signIn } from "../../../../redux/actions/authAction";
import GoogleImg from "./google.svg";
import FacebookImg from "./facebook.svg";

const ProviderButtons: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const responseGoogle = async (response) => {
    console.log(response);
    await dispatch(
      signIn({
        isAuthenticated: true,
        userName: response.tt.Ad,
        userAvatar: response.tt.OJ,
        lastSearchKey: "Pidaras",
      })
    );
    router.push("/");
  };
  const responseFacebook = async (response) => {
    await dispatch({
      type: "AUTH_SIGN_IN",
      payload: {
        isAuthenticated: true,
        userName: response.name,
        userAvatar: response.picture.data.url,
        lastSearchKey: "Pidaras kto",
      },
    });
  };
  return (
    <div className="provider__buttons__container">
      <div className="divider" />
      <GoogleLogin
        clientId={process.env.GOOGLE_ID}
        buttonText="Login"
        render={(renderProps) => (
          // eslint-disable-next-line no-use-before-define
          <GoogleBtn
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
      <FacebookLogin
        appId={process.env.FACEBOOK_ID}
        fields="name,email,picture"
        render={(renderProps) => (
          // eslint-disable-next-line no-use-before-define
          <FacebookBtn
            onClick={renderProps.onClick}
            disabled={renderProps.isDisabled}
          />
        )}
        callback={responseFacebook}
      />
    </div>
  );
};
export default ProviderButtons;

const GoogleBtn: FunctionComponent<Props> = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      type="button"
      className="provider__btn"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="provider__logo">
        <GoogleImg />
      </div>
      <span>Google</span>
    </button>
  );
};
const FacebookBtn: FunctionComponent<Props> = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      type="button"
      className="provider__btn"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="provider__logo">
        <FacebookImg />
      </div>
      <span>Facebook</span>
    </button>
  );
};
