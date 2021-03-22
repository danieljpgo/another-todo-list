import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTodoTask } from '../../../common/context/TaskContext';
import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import IconButton from '../../../common/components/IconButton';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';
import Form from './Form';
// import Text from '../../../common/components/Text';

const Todo = () => {
  const [{ list, status }, dispatch] = useTodoTask();

  function handleAddTask(description: string) {
    dispatch({ type: 'add', description });
  }

  function handleDoneTask(id: string) {
    dispatch({ type: 'done', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  return (
    <div className="grid content-end gap-4 auto-rows-min">
      {/* <Text variant="title">To Do</Text> */}
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
      </AnimatePresence>
      <div>
        <Form onSubmit={(description) => handleAddTask(description)} />
      </div>
    </div>
  );
};

export default Todo;
