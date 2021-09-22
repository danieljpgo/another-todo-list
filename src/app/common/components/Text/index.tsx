const variants = {
  sub: 'text-gray-500 text-sm',
  base: 'text-gray-500 text-base',
  title: 'text-gray-500 text-xl font-bold',
} as const;

type TextProps = {
  variant?: keyof typeof variants;
  children: string;
};

export default function Text(props: TextProps) {
  const { children, variant = 'base' } = props;

  return <p className={`${variants[variant]}`}>{children}</p>;
}
