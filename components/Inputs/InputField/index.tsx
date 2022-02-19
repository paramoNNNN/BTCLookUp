import { forwardRef, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';
import InputWrapper from '../InputWrapper';

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
	/** If false be passed, input border becomes red */
	valid?: boolean;
	/** Defines if the input is disabled */
	disabled?: boolean;
	/** Add an icon element before input */
	icon?: ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { className, valid, disabled, icon, type = 'text', ...other } = props;

	const classes = classNames(styles.input, {
		[styles.active]: valid === undefined && !disabled,
	});

	return (
		<InputWrapper
			className={className}
			icon={icon}
			valid={valid}
			disabled={disabled}
		>
			<input
				className={classes}
				type={type}
				ref={ref}
				disabled={disabled}
				{...other}
			/>
		</InputWrapper>
	);
});

Input.displayName = 'Input';
export default Input;
