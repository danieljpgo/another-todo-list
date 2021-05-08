import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '.';

beforeEach(() => {
  window.localStorage.clear();
});

test('add, delete and finish new task', () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/new task/i), 'make dinner');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'clean the house');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');

  const todo = screen.getByRole('list', { name: /todo task/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('button', { name: /delete task clean the house/i }));
  expect(within(todo).queryByText(/clean the house/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/clean the house/i)).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('checkbox', { name: /make dinner/i }));
  expect(within(todo).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(done).getByText(/make dinner/i)).toBeInTheDocument();
});

test('undo and delete a finish a task', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'make dinner');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'clean the house');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('checkbox', { name: /complete task make dinner/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task clean the house/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('checkbox', { name: /undo task make dinner/i }));
  expect(within(todo).getByText(/make dinner/i)).toBeInTheDocument();
  expect(within(done).queryByText(/make dinner/i)).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /delete task clean the house/i }));
  expect(within(todo).queryByText(/clean the house/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/clean the house/i)).not.toBeInTheDocument();
});

test('cleaning all finish tasks', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'make dinner');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'clean the house');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'walk the dog');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('checkbox', { name: /complete task make dinner/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task clean the house/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task walk the dog/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('button', { name: /clear/i }));

  expect(within(todo).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(todo).queryByText(/clean the house/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/clean the house/i)).not.toBeInTheDocument();
  expect(within(todo).queryByText(/walk the dog/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/walk the dog/i)).not.toBeInTheDocument();
});

test('tasks, actions and input is saved even when reloading the page', () => {
  const { rerender } = render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), 'make dinner');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'clean the house');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), 'walk the dog');
  userEvent.click(screen.getByRole('checkbox', { name: /complete task make dinner/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  expect(within(todo).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(todo).getByText(/clean the house/i)).toBeInTheDocument();
  expect(within(done).getByText(/make dinner/i)).toBeInTheDocument();

  rerender(<App key="reload_page" />);

  const todoReloaded = screen.getByRole('list', { name: /todo tasks/i });
  const doneReloaded = screen.getByRole('list', { name: /done tasks/i });

  expect(screen.getByLabelText(/new task/i)).toHaveValue('walk the dog');
  expect(within(todoReloaded).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(todoReloaded).getByText(/clean the house/i)).toBeInTheDocument();
  expect(within(doneReloaded).getByText(/make dinner/i)).toBeInTheDocument();
});

test('displays all messages in the new task field placeholder', () => {
  render(<App />);

  expect(screen.getByPlaceholderText(/ok, add some tasks here/i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '1o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '2o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '3o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.getByPlaceholderText(/more task ?/i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '4o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '5o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.getByPlaceholderText(/are you sure ?/i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '6o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '7o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.getByPlaceholderText(/ok, keep going .../i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '8o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '9o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '10o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.getByPlaceholderText(/i don't even care anymore/i)).toBeInTheDocument();
});

test('different message for empty tasks and done tasks', () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/new task/i), '1o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '2o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '3o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.getByText(/you're going to complete some tasks, right?/i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '4o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '5o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '6o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '7o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.queryByText(/you're going to complete some tasks, right?/i)).not.toBeInTheDocument();
  expect(screen.getByText(/hey, give me some done tasks, I'm alone here/i)).toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/new task/i), '8o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '9o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  userEvent.type(screen.getByLabelText(/new task/i), '10o test');
  userEvent.type(screen.getByLabelText(/new task/i), '{enter}');
  expect(screen.queryByText(/hey, give me some done tasks, I'm alone here/i)).not.toBeInTheDocument();
  expect(screen.getByText(/I will be alone here, I see .../i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('checkbox', { name: /complete task 1o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 2o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 3o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 4o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 5o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 6o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 7o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 8o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 9o test/i }));
  userEvent.click(screen.getByRole('checkbox', { name: /complete task 10o test/i }));

  expect(screen.getByText(/I'm kind of alone here, add new tasks for me/i)).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /delete task 10o test/i }));
  userEvent.click(screen.getByRole('button', { name: /delete task 9o test/i }));
  userEvent.click(screen.getByRole('button', { name: /delete task 8o test/i }));
  userEvent.click(screen.getByRole('button', { name: /delete task 7o test/i }));
  userEvent.click(screen.getByRole('button', { name: /delete task 6o test/i }));

  expect(screen.queryByText(/I'm kind of alone here, add new tasks for me/i)).not.toBeInTheDocument();
  expect(screen.getByText(/impressive, did you finish this many tasks?/i)).toBeInTheDocument();
});
