import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTodoTask } from '../../../common/context/TaskContext';
import IconButton from '../../../common/components/IconButton';
import DeleteIcon from '../../../common/components/DeleteIcon';
import Task from '../../../common/components/Task';
import List from '../../../common/components/List';
import Form from './Form';

const Todo = () => {
  const [{ list, status }, dispatch] = useTodoTask();

  function handleDoneTask(id: string) {
    dispatch({ type: 'done', id });
  }

  function handleAddTask(description: string) {
    dispatch({ type: 'add', description });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  return (
    <div className="grid content-end gap-4 auto-rows-min">
      <AnimatePresence>
        <List
          message={status}
          aria-label="todo tasks"
        >
          {list.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              checked={task.completed}
              onCheckedChange={() => handleDoneTask(task.id)}
            >
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
      </AnimatePresence>
      <div>
        <Form onSubmit={(description) => handleAddTask(description)} />
      </div>
    </div>
  );
};

export default Todo;
