import * as React from 'react';
import { motion } from 'framer-motion';
import Text from '../Text';

interface ListProps {
  message: string;
  'aria-label': string;
  children: React.ReactNode[];
}

const List = ({ message, 'aria-label': ariaLabel, children }: ListProps) => (
  <motion.div layout className="px-5 bg-white rounded-lg shadow-md py-7 max-h-80">
    <div className={`h-full px-2 overflow-y-auto ${children.length > 4 && 'border-t border-b border-gray-100'}`}>
      <ul
        aria-label={ariaLabel}
        className="grid gap-4 "
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

export default List;
