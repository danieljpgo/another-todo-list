import { AnimatePresence } from 'framer-motion';
import { useDoneTask } from '../../../common/context/TaskContext';
import IconButton from '../../../common/components/IconButton';
import DeleteIcon from '../../../common/components/DeleteIcon';
import Button from '../../../common/components/Button';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';

const Done = () => {
  const [{ list, status }, dispatch] = useDoneTask();

  function handleUndoTask(id: string) {
    dispatch({ type: 'undo', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  function handleClearTasks() {
    dispatch({ type: 'clear' });
  }

  return (
    <div className="grid content-end gap-4 auto-rows-min">
      <AnimatePresence>
        <List
          message={status}
          aria-label="done tasks"
        >
          {list.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              checked={task.completed}
              onCheckedChange={() => handleUndoTask(task.id)}
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
      <div className="flex justify-end">
        <Button
          type="button"
          title="clear finish tasks"
          onClick={() => handleClearTasks()}
        >
          clear
        </Button>
      </div>
    </div>
  );
};

export default Done;
