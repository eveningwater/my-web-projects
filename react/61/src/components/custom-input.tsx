import type { SyntheticEvent } from 'react';
import './custom-input.css';

type LiteralUnion<T extends U, U> = T & (U & object);
interface CustomInputProps {
  type: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
  >;
  value: string;
  onChange(v: string): void;
  placeholder: string;
  className?: string;
}
const CustomInput = (props: Partial<CustomInputProps>) => {
  const { value, onChange, className = '', ...rest } = props;
  const onChangeHandler = (e: SyntheticEvent) => {
    if (onChange) {
      onChange((e.target as HTMLInputElement).value);
    }
  };
  return (
    <input
      value={value}
      onChange={onChangeHandler}
      {...rest}
      className={`base-input${className ? ' ' + className : ''}`}
    />
  );
};

export default CustomInput;
