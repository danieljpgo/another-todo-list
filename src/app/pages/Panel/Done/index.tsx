import { AnimatePresence } from 'framer-motion';
import { useDoneTask } from '../../../common/context/TaskContext';
import IconButton from '../../../common/components/IconButton';
import DeleteIcon from '../../../common/components/DeleteIcon';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';
import Text from '../../../common/components/Text';

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
        <button
          type="button"
          title="clear finish tasks"
          className="transition-all transform scale-100 duration-200 px-10 py-2.5 uppercase bg-white rounded-lg shadow-md outline-none focus:outline-none focus:ring focus:ring-blue-200 active:shadow active:scale-95"
          onClick={() => handleClearTasks()}
        >
          <Text>
            clear
          </Text>
        </button>
      </div>
    </div>
  );
};

export default Done;
