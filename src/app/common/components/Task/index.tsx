import { motion } from 'framer-motion';
import { Children } from '../../types/children';
import CheckboxField from '../CheckboxField';

const undo = 'undo task';
const complete = 'complete task';

interface TaskProps extends Children {
  id: string;
  checked: boolean;
  description: string;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Task = (props: TaskProps) => {
  const {
    id,
    checked,
    children,
    description,
    onCheckedChange,
  } = props;

  const label = checked ? undo : complete;

  return (
    <motion.li
      layoutId={id}
      style={{ gridTemplateColumns: 'auto min-content' }}
      className="group grid items-center w-full gap-2 px-3 py-2.5 bg-white "
    >
      <CheckboxField
        id={id}
        name="checkbox"
        title={label}
        checked={checked}
        aria-label={`${label} ${description}`}
        onChange={(event) => onCheckedChange(event)}
      >
        {description}
      </CheckboxField>
      <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-within:opacity-100">
        {children}
      </div>
    </motion.li>
  );
};

export default Task;
