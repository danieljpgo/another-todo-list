import * as React from 'react';
import { useLocalStorageState } from '../../../../common/utils/hooks';
import Input from '../../../../common/components/Input';

function generatePlaceholder(counter: number) {
  if (counter > 9) return "i don't even care anymore";
  if (counter > 6) return 'ok, keep going ...';
  if (counter > 4) return 'are you sure ?';
  if (counter > 2) return 'more task ?';
  return 'ok, add some tasks here';
}

type FormProps = {
  counter: number;
  onSubmit: (description: string) => void;
};

export default function Form(props: FormProps) {
  const { onSubmit, counter } = props;
  const [input, setInput] = useLocalStorageState('another-todo-list:input', '');
  const placeholder = generatePlaceholder(counter);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, description: string) {
    event.preventDefault();
    onSubmit(description);
    setInput('');
  }

  function handleInputChange(description: string) {
    setInput(description);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, input)}>
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
