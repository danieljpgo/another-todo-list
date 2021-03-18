import { Children } from '../../types/children';
import Text from '../Text';

interface TaskProps extends Children {
  description: string;
}

const Task = ({ description, children }: TaskProps) => (
  <li className="grid items-center w-full grid-cols-5 gap-2 px-4 py-2 bg-white rounded-md shadow-md">
    <div className="col-start-1 col-end-4">
      <Text>{description}</Text>
    </div>
    <div className="flex justify-between grid-cols-2 col-start-5 col-end-5 gap-2 opacity-0 hover:opacity-100 focus-within:opacity-100">
      {children}
    </div>
  </li>
);

export default Task;
