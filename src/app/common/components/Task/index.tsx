import { Children } from '../../types/children';
import Text from '../Text';

interface TaskProps extends Children {
  description: string;
}

const Task = ({ description, children }: TaskProps) => (
  <li className="flex items-center w-full gap-2">
    <div className="w-full px-4 py-2 bg-white rounded-md shadow-md">
      <Text>{description}</Text>
    </div>
    {children}
  </li>
);

export default Task;
