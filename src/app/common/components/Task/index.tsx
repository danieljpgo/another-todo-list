import { motion } from 'framer-motion';
import { Children } from '../../types/children';
import Text from '../Text';

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

  return (
    <motion.li
      layoutId={id}
      className="flex items-center w-full gap-2 px-3 py-2.5 bg-white "
    >
      <input
        id={id}
        type="checkbox"
        title={checked ? undo : complete}
        checked={checked}
        aria-label={`${checked ? undo : complete} ${description}`}
        className="text-blue-200 transition-all duration-200 border-gray-400 rounded outline-none border-1 focus:ring-offset-1 focus:outline-none hover:text-blue-100 focus:ring focus:ring-blue-200 "
        onChange={(event) => onCheckedChange(event)}
      />
      <label htmlFor={id}>
        <Text>{description}</Text>
      </label>
      <div className="flex self-end justify-between opacity-0 hover:opacity-100 focus-within:opacity-100">
        {children}
      </div>
    </motion.li>
  );
};

export default Task;
