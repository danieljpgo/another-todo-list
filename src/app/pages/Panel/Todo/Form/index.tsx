import * as React from 'react';
import Input from '../../../../common/components/Input';

interface FormProps {
  onSubmit: (description: string) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const [input, setInput] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, description: string) {
    e.preventDefault();
    onSubmit(description);
    setInput('');
  }

  function handleInputChange(description: string) {
    setInput(description);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, input)}>
      <Input
        id="newTask"
        name="newTask"
        type="text"
        value={input}
        placeholder="New task"
        onChange={(e) => handleInputChange(e.currentTarget.value)}
      />
    </form>
  );
};

export default Form;
