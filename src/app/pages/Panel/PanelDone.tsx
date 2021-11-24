import { motion } from 'framer-motion';
import { useDoneTask } from '../../common/context/taskContext';
import {
  Task, Text, Stack, Button, IconButton, DeleteIcon,
} from '../../common/components';

export default function PanelDone() {
  const [done, dispatch] = useDoneTask();

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
      <motion.div
        layout
        className={`${done.tasks.length || done.status ? 'py-7' : 'py-0'} px-5 bg-white rounded-lg shadow-md max-h-80`}
      >
        <Stack aria-label="done tasks">
          {done.tasks.map((task) => (
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
          {done.tasks.length === 0 && (
            <li className="text-center">
              <Text variant="sub">{done.status}</Text>
            </li>
          )}
        </Stack>
      </motion.div>
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
}
