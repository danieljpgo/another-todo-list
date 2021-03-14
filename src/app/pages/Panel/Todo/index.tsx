import * as React from 'react';
import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import IconButton from '../../../common/components/IconButton';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';
import Form from './Form';
import { useTodoTask } from '../../../common/context/TaskContext';

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
    <div className="grid gap-4">
      <List
        message={status}
        aria-label="todo tasks"
      >
        {list.map((task) => (
          <Task
            key={task.id}
            description={task.description}
          >
            <IconButton
              title="complete task"
              aria-label={`complete task ${task.description}`}
              onClick={() => handleDoneTask(task.id)}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              title="delete task"
              aria-label={`delete task ${task.description}`}
              onClick={() => handleDeleteTask(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Task>
        ))}
      </List>
      <div className="px-2">
        <Form onSubmit={(description) => handleAddTask(description)} />
      </div>
    </div>
  );
};

export default Todo;
