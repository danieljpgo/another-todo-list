import { useTodoTask } from '../../common/context/taskContext';
import IconButton from '../../common/components/IconButton/IconButton';
import DeleteIcon from '../../common/components/DeleteIcon/DeleteIcon';
import Task from '../../common/components/Task/Task';
import List from '../../common/components/List/List';
import PanelTodoForm from './PanelTodoForm';

export default function PanelTodo() {
  const [{ list, status }, dispatch] = useTodoTask();

  function handleDoneTask(id: string) {
    dispatch({ type: 'DONE', id });
  }

  function handleAddTask(description: string) {
    dispatch({ type: 'ADD', description });
  }

  function handleDeleteTask(id: string) {
    dispatch({ type: 'DELETE', id });
  }

  return (
    <div className="grid content-end gap-4 auto-rows-min">
      <List
        message={status}
        aria-label="todo tasks"
      >
        {list.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            checked={task.completed}
            description={task.description}
            onCheckedChange={handleDoneTask}
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
      <div>
        <PanelTodoForm
          counter={list.length}
          onSubmit={handleAddTask}
        />
      </div>
    </div>
  );
}
