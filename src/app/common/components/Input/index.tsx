import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const {
    id,
    name,
    type,
    value,
    placeholder,
    onChange,
  } = props;

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className="block w-full border-none rounded-md shadow-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      onChange={onChange}
    />
  );
};

export default Input;
