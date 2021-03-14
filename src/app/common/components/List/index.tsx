import * as React from 'react';

interface ListProps {
  message: string;
  'aria-label': string;
  children: React.ReactNode[];
}

const List = ({ message, 'aria-label': ariaLabel, children }: ListProps) => (
  <>
    <ul
      aria-label={ariaLabel}
      className="grid gap-4 px-2 overflow-auto border-t border-b border-gray-300 auto-rows-min h-72"
    >
      {children}
    </ul>
    {!children.length && <p>{message}</p>}
  </>
);

export default List;
