import { ButtonHTMLAttributes } from 'react';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const IconButton = (props: IconButtonProps) => {
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
      className="w-6 transition-all duration-200 transform scale-100 border-none rounded-full shadow-md outline-none focus:outline-none focus:ring-blue-200 focus:ring-4 focus:shadow-lg focus:scale-105 active:shadow active:scale-95 hover:shadow-lg hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
