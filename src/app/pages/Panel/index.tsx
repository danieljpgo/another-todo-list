import Done from './Done';
import Todo from './Todo';

const Panel = () => (
  <div className="grid content-end w-full h-full max-w-screen-md grid-cols-2 gap-8 max-h-72">
    <Todo />
    <Done />
  </div>
);

export default Panel;
