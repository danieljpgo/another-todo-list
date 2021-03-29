import Done from './Done';
import Todo from './Todo';

const Panel = () => (
  <div className="grid content-end w-full h-full max-w-4xl grid-cols-2 gap-8 max-h-96">
    <Todo />
    <Done />
  </div>
);

export default Panel;
