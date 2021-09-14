import styles from './providerBtn.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { Props } from 'framer-motion/types/types';
import GoogleImg from './google.svg';
import FacebookImg from './facebook.svg';

const ProviderButtons: FunctionComponent<Props> = () => {
  return (
    <div className={styles.provider__buttons__container}>
      <div className={styles.divider} />
      <GoogleBtn onClick={() => {}} disabled={false} />
      <FacebookBtn onClick={() => {}} disabled={false} />
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
      type='button'
      className={styles.provider__btn}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.provider__logo}>
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
      type='button'
      className={styles.provider__btn}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.provider__logo}>
        <FacebookImg />
      </div>
      <span>Facebook</span>
    </button>
  );
};
