import type { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './InputWrapper.module.css';

type Props = {
  /** Input element */
  children: ReactNode;
  /** Custom className to be set on the wrapper */
  className?: string;
  /** If false be passed, input border becomes red */
  valid?: boolean;
  /** Defines if the input is disabled */
  disabled?: boolean;
  /** Add an icon element before input */
  icon?: ReactElement;
};

const InputWrapper = (props: Props): JSX.Element => {
  const { children, className, valid, disabled, icon } = props;

  const classes = classNames(
    styles.wrapper,
    {
      [styles.active]: valid === undefined && !disabled,
      [styles.disabled]: valid === undefined && disabled,
      [styles.valid]: valid !== undefined && valid,
      [styles.invalid]: valid !== undefined && !valid,
    },
    className
  );

  return (
    <div className={classes}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </div>
  );
};

export default InputWrapper;
