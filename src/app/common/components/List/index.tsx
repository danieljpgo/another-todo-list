import * as React from 'react';
import Text from '../Text';

interface ListProps {
  message: string;
  'aria-label': string;
  children: React.ReactNode[];
}

const List = ({ message, 'aria-label': ariaLabel, children }: ListProps) => (
  <>
    <div className="px-3 py-5 bg-white rounded-md shadow-md max-h-72">
      <ul
        aria-label={ariaLabel}
        className={`grid h-full gap-4 px-2 overflow-y-auto ${children.length > 4 && 'border-t border-b border-gray-100'}`}
      >
        {children}
        {!children.length && (
        <div className="text-center">
          <Text variant="sub">{message}</Text>
        </div>
        )}
      </ul>
    </div>
  </>
);

export default List;
