import { Children } from '../../types/children';

const variants = {
  sub: 'text-gray-400 text-xs',
  base: 'text-gray-400 text-base',
  title: 'text-gray-400 text-lg',
} as const;

interface TextProps extends Children{
  variant?: keyof typeof variants;
}

const Text = ({ children, variant = 'base' }: TextProps) => (
  <p className={`${variants[variant]}`}>{children}</p>
);

export default Text;
