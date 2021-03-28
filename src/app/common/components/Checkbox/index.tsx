import * as React from 'react';

export interface CheckboxProps {
  id: string;
  name: string,
  title: string;
  checked: boolean;
  'aria-label': string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    id,
    name,
    title,
    checked,
    'aria-label': ariaLabel,
    onChange,
  } = props;

  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      title={title}
      checked={checked}
      aria-label={ariaLabel}
      className="text-blue-200 transition-all duration-200 border-gray-400 rounded outline-none border-1 focus:ring-offset-1 focus:outline-none hover:text-blue-100 focus:ring focus:ring-blue-200 "
      onChange={onChange}
    />

  );
};

export default Checkbox;
