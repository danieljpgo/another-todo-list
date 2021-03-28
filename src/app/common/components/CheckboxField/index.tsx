import * as React from 'react';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Text from '../Text';

interface CheckboxFieldProps extends CheckboxProps {
  children: string;
}

const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    id,
    name,
    title,
    checked,
    children,
    'aria-label': ariaLabel,
    onChange,
  } = props;

  return (
    <div>
      <Checkbox
        id={id}
        name={name}
        title={title}
        checked={checked}
        aria-label={ariaLabel}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <Text>{children}</Text>
      </label>
    </div>
  );
};

export default CheckboxField;
