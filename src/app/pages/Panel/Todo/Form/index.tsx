import * as React from 'react';
import Input from '../../../../common/components/Input';

interface FormProps {
  onSubmit: (description: string) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [input, setInput] = React.useState('');

  function handleSubmit(e:React.FormEvent<HTMLFormElement>, description: string) {
    e.preventDefault();
    onSubmit(description);
    setInput('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, input)}>
      <Input
        id="new_task"
        name="new_task"
        type="text"
        value={input}
        placeholder="New task"
        onChange={(e) => setInput(e.currentTarget.value)}
      />
    </form>
  );
};

export default Form;
