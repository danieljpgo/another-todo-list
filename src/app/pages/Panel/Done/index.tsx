import DeleteIcon from '../../../common/components/DeleteIcon';
import DoneIcon from '../../../common/components/DoneIcon';
import { useDoneTask } from '../../../common/context/TaskContext';

const Done = () => {
  const [done, dispatch] = useDoneTask();

  function handleUndoneTask(id: string) {
    dispatch({ type: 'undone', id });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'delete', id });
  }

  return (
    <div>
      <div>
        <ul aria-label="done tasks">
          {done.map((task) => (
            <li key={task.id}>
              <p>
                {task.description}
              </p>
              <button
                type="button"
                aria-label={`undone task ${task.description}`}
                onClick={() => handleUndoneTask(task.id)}
              >
                <DoneIcon />
              </button>
              <button
                type="button"
                aria-label={`delete task ${task.description}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Done;
