import Done from './Done';
import Todo from './Todo';

const Panel = () => (
  <div className="grid grid-cols-2 gap-8">
    <Todo />
    <Done />
  </div>
);

export default Panel;
