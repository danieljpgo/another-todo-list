import * as React from 'react';
import { motion } from 'framer-motion';
import Text from '../Text';

type ListProps = {
  message: string;
  'aria-label': string;
  children: React.ReactNode[];
};

const List = (props: ListProps) => {
  const { message, 'aria-label': ariaLabel, children } = props;

  return (
    <motion.div
      layout
      className="px-5 bg-white rounded-lg shadow-md py-7 max-h-80"
    >
      <div className={`h-full px-2 overflow-y-auto ${children.length > 5 && 'border-t border-b border-gray-200'}`}>
        <ul
          aria-label={ariaLabel}
          className="grid divide-y divide-gray-200"
        >
          {children}
          {!children.length && (
          <li className="text-center">
            <Text variant="sub">{message}</Text>
          </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default List;
