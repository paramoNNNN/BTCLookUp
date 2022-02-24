import React from 'react';
import classNames from 'classnames';
import { LoadingIcon } from '../Loading';
import styles from './Button.module.css';

type IconType =
  | string
  | React.FunctionComponent<{
      'className': string;
      'aria-hidden': boolean;
    }>
  | React.ComponentClass<{
      'className': string;
      'aria-hidden': boolean;
    }>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Defines if the button is disabled */
  disabled?: boolean;
  /** The size of the button */
  size?: 'large' | 'regular' | 'small';
  /** Shows only one icon inside the button */
  icon?: IconType;
  /** Shows tooltip for Button */
  tooltip?: string;
  /** The style of the button */
  layout?: 'primary' | 'transparent' | 'outline';
  /** Shows the button as a block (full width) */
  block?: boolean;
  /** The element that should be rendered as a button */
  tag?: 'button';
  /** The native HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** enable the loading state of the button */
  loading?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
  const {
    tag = 'button',
    type = tag === 'button' ? 'button' : undefined,
    disabled = false,
    size = 'regular',
    layout = 'primary',
    block = false,
    loading = false,
    icon,
    className,
    children,
    ...other
  } = props;
  const isButtonDisabled = disabled || loading;

  const classes = classNames(
    styles.button,
    styles[size],
    styles[layout],
    {
      [styles.block]: block,
      [styles.active]: !isButtonDisabled,
      [styles.disabled]: isButtonDisabled,
    },
    className
  );

  const LoadingComponent = <LoadingIcon className="w-7" />;

  const iconStyles = classNames(styles[size], { [styles.icon]: !!children });

  return React.createElement(
    tag,
    { className: classes, disabled: isButtonDisabled, type, ...other },
    icon
      ? React.createElement(icon, {
          'className': iconStyles,
          'aria-hidden': true,
        })
      : null,
    loading ? LoadingComponent : children
  );
};

export default Button;
