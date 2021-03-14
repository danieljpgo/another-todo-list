import * as React from 'react';
import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import { useTodoTask } from '../../../common/context/TaskContext';
import Form from './Form';

const Todo = () => {
  const [{ list, status }, dispatch] = useTodoTask();

  function handleDoneTask(id: string) {
    dispatch({ type: 'done', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  function handleAddTask(description: string) {
    dispatch({ type: 'add', description });
  }

  return (
    <div className="h-full max-h-96">
      <ul aria-label="todo tasks" className="h-full overflow-auto">
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
        <Form onSubmit={(description) => handleAddTask(description)} />
      </div>
    </div>
  );
};

export default Todo;
