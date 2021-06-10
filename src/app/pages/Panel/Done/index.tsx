import { useDoneTask } from '../../../common/context/TaskContext';
import IconButton from '../../../common/components/IconButton';
import DeleteIcon from '../../../common/components/DeleteIcon';
import Button from '../../../common/components/Button';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';

const Done = () => {
  const [{ list, status }, dispatch] = useDoneTask();

  function handleUndoTask(id: string) {
    dispatch({ type: 'UNDO', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'DELETE', id });
  }

  function handleClearTasks() {
    dispatch({ type: 'CLEAR' });
  }

  return (
    <div className="grid content-end gap-4 auto-rows-min">
      <List
        message={status}
        aria-label="done tasks"
      >
        {list.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            checked={task.completed}
            description={task.description}
            onCheckedChange={handleUndoTask}
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
      <div className="flex justify-end">
        <Button
          type="button"
          title="clear finish tasks"
          onClick={handleClearTasks}
        >
          clear
        </Button>
      </div>
    </div>
  );
};

export default Done;
