import * as React from 'react';
import { motion } from 'framer-motion';
import Text from '../Text';

type ListProps = {
  message: string;
  'aria-label': string;
  children: React.ReactNode[];
};

export default function List(props: ListProps) {
  const { message, 'aria-label': ariaLabel, children } = props;

  return (
    <motion.div
      layout
      className={`${children.length || message ? 'py-7' : 'py-0'} px-5 bg-white rounded-lg shadow-md max-h-80`}
    >
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
          {!children.length && (
            <li className="text-center">
              <Text variant="sub">{message}</Text>
            </li>
          )}
        </motion.ul>
      </div>
    </motion.div>
  );
}
