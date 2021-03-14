import IconButton from '../../../common/components/IconButton';
import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import List from '../../../common/components/List';
import Task from '../../../common/components/Task';
import { useDoneTask } from '../../../common/context/TaskContext';

const Done = () => {
  const [{ list, status }, dispatch] = useDoneTask();

  function handleUndoneTask(id: string) {
    dispatch({ type: 'undone', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  return (
    <div className="">
      <List
        message={status}
        aria-label="done tasks"
      >
        {list.map((task) => (
          <Task
            key={task.id}
            description={task.description}
          >
            <IconButton
              title="undone task"
              aria-label={`undone task ${task.description}`}
              onClick={() => handleUndoneTask(task.id)}
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
    </div>
  );
};

export default Done;
