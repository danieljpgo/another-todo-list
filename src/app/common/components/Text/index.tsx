const variants = {
  sub: 'text-gray-500 text-sm',
  base: 'text-gray-500 text-base',
  title: 'text-gray-500 text-xl font-bold',
} as const;

interface TextProps {
  variant?: keyof typeof variants;
  children: string;
}

const Text = (props: TextProps) => {
  const { children, variant = 'base' } = props;

  return <p className={`${variants[variant]}`}>{children}</p>;
};

export default Text;
