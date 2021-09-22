import * as React from 'react';
import Text from '../Text/Text';

type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  title: string;
  children: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Button(props: ButtonProps) {
  const {
    title,
    type = 'button',
    children,
    disabled,
    onClick,
  } = props;

  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      className="transition-all transform scale-100 duration-200 px-10 py-2.5 lowercase bg-white rounded-lg shadow-md outline-none focus:outline-none focus:ring focus:ring-blue-200 active:shadow active:scale-95"
      onClick={onClick}
    >
      <Text>
        {children}
      </Text>
    </button>
  );
}
