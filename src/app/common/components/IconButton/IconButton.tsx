import * as React from 'react';

type IconButtonProps = {
  children: React.ReactNode
  title: string,
  'aria-label': string,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

export default function IconButton(props: IconButtonProps) {
  const {
    title,
    children,
    'aria-label': ariaLabel,
    onClick,
  } = props;

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      className="w-7 p-1.5 transition-all duration-200 transform scale-100 border-none rounded-md shadow-md outline-none focus:outline-none focus:ring-blue-200 focus:ring active:shadow active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
