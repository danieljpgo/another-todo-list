import { motion } from 'framer-motion';
import { Children } from '../../types/children';
import Text from '../Text';

const undo = 'undo task';
const complete = 'complete task';

interface TaskProps extends Children {
  id: string;
  description: string;
  checked: boolean;
  onCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Task = (props: TaskProps) => {
  const {
    id,
    description,
    children,
    checked,
    onCheckedChange,
  } = props;

  return (
    <motion.li
      layoutId={id}
      className="flex items-center w-full gap-2 px-4 py-2 bg-white rounded-md "
    >
      <input
        id={id}
        type="checkbox"
        title={checked ? undo : complete}
        checked={checked}
        aria-label={`${checked ? undo : complete} ${description}`}
        className="text-blue-200 transition-all duration-200 border-gray-100 rounded outline-none focus:ring-offset-1 focus:outline-none hover:text-blue-100 focus:ring focus:ring-blue-200 "
        onChange={(event) => onCheckedChange(event)}
      />
      <label htmlFor={id}>
        <div className="col-start-1 col-end-4">
          <Text>{description}</Text>
        </div>
      </label>
      <div className="flex self-end justify-between grid-cols-2 col-start-5 col-end-5 gap-2 opacity-0 hover:opacity-100 focus-within:opacity-100">
        {children}
      </div>
    </motion.li>
  );
};

export default Task;
// shadow-md
