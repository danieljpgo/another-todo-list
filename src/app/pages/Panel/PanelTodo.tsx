import { motion } from 'framer-motion';
import { useTodoTask } from '../../common/context/taskContext';
import {
  Text, Stack, Task, IconButton, DeleteIcon,
} from '../../common/components';
import PanelTodoForm from './PanelTodoForm';

export default function PanelTodo() {
  const [todo, dispatch] = useTodoTask();

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
      <motion.div
        layout
        className={`${todo.tasks.length || todo.status ? 'py-7' : 'py-0'} px-5 bg-white rounded-lg shadow-md max-h-80`}
      >
        <Stack aria-label="todo tasks">
          {todo.tasks.map((task) => (
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
          {todo.tasks.length === 0 && (
            <li className="text-center">
              <Text variant="sub">{todo.status}</Text>
            </li>
          )}
        </Stack>
      </motion.div>
      <PanelTodoForm onSubmit={handleAddTask} />
    </div>
  );
}
