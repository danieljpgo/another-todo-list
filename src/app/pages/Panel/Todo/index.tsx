import * as React from 'react';
import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import { useTodoTask } from '../../../common/context/TaskContext';

const Todo = () => {
  const [input, setInput] = React.useState('');
  const [{ list, status }, dispatch] = useTodoTask();

  function handleDoneTask(id: string) {
    dispatch({ type: 'done', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>, description: string) {
    e.preventDefault();
    dispatch({ type: 'add', description });
    setInput('');
  }

  return (
    <div>
      <ul aria-label="todo tasks">
        {list.map((task) => (
          <li key={task.id}>
            <p>{task.description}</p>
            <button
              type="button"
              title="complete task"
              aria-label={`complete task ${task.description}`}
              className="w-2"
              onClick={() => handleDoneTask(task.id)}
            >
              <DoneIcon />
            </button>
            <button
              type="button"
              title="delete task"
              aria-label={`delete task ${task.description}`}
              className="w-2"
              onClick={() => handleDeleteTask(task.id)}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
      {!list.length && <p>{status}</p>}
      <div>
        <form onSubmit={(e) => handleSubmit(e, input)}>
          <label htmlFor="new_task">a</label>
          <input
            id="new_task"
            name="new_task"
            type="text"
            value={input}
            placeholder="new task"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Todo;
