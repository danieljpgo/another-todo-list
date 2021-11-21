import * as React from 'react';
import { Input } from '../../common/components';
import { useLocalStorageState } from '../../common/hooks';
import { useDoneTask, useTodoTask } from '../../common/context/taskContext';

function generatePlaceholder(todoCount: number, doneCount: number) {
  if (doneCount > 7 && todoCount === 0) return 'great job';
  if (doneCount > 4 && todoCount < 3) return 'keep it going';
  if (doneCount > 1 && todoCount < 5) return 'can be better';
  if (todoCount > 9) return "i don't even care anymore";
  if (todoCount > 6) return 'ok, keep going ...';
  if (todoCount > 4) return 'are you sure?';
  if (todoCount > 2) return 'more tasks?';
  return 'ok, add some task here';
}

type FormProps = {
  onSubmit: (description: string) => void;
};

export default function PanelTodoForm(props: FormProps) {
  const { onSubmit } = props;
  const [input, setInput] = useLocalStorageState('another-todo-list:input', '');
  const [todo] = useTodoTask();
  const [done] = useDoneTask();

  const placeholder = generatePlaceholder(todo.list.length, done.list.length);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, description: string) {
    event.preventDefault();
    onSubmit(description);
    setInput('');
  }

  function handleInputChange(description: string) {
    setInput(description);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event, input)}>
      <label
        className="sr-only"
        htmlFor="newTask"
      >
        new task
      </label>
      <Input
        id="newTask"
        name="newTask"
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={(event) => handleInputChange(event.currentTarget.value)}
      />
    </form>
  );
}
