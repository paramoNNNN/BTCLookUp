import classNames from 'classnames';
import ReactSelect, { Props } from 'react-select';
import styles from './Select.module.css';

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

const Select = ({ className, ...rest }: Props): JSX.Element => {
  return (
    <ReactSelect
      className={classNames(styles.select, className)}
      classNamePrefix="select"
      {...rest}
    />
  );
};

export default Select;
