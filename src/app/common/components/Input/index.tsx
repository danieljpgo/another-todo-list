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
      autoComplete="off"
      className="block w-full text-gray-400 placeholder-gray-400 px-5 py-2.5 transition-all duration-200 border-none rounded-md shadow-md outline-none focus:outline-none focus:ring focus:ring-blue-200"
      onChange={onChange}
    />
  );
};

export default Input;
