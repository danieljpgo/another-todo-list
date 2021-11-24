import * as React from 'react';
import { motion } from 'framer-motion';

type StackProps = {
  'aria-label': string;
  children: React.ReactNode[];
};

export default function Stack(props: StackProps) {
  const { 'aria-label': ariaLabel, children } = props;

  return (
    <div className={`h-full px-2 overflow-y-auto ${children.length > 5 && 'border-t border-b border-gray-200'}`}>
      <motion.ul
        className="grid divide-y divide-gray-200"
        aria-label={ariaLabel}
        variants={{
          show: {
            transition: {
              when: 'beforeChildren',
              staggerChildren: 0.1,
            },
          },
          out: {
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1,
              when: 'afterChildren',
            },
          },
        }}
        initial="hidden"
        animate="show"
        exit="out"
      >
        {children}
      </motion.ul>
    </div>
  );
}
