import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from '../../common/context/TaskContext';
import App from '../..';

function renderWithProvider(children: React.ReactNode) {
  render(<TaskProvider>{children}</TaskProvider>);
}

test('fallback messages for empty tasks list', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/let's do some tasks/i)).toBeInTheDocument();
  expect(screen.getByText(/there must be a task somewhere/i)).toBeInTheDocument();
});

test('add new task', () => {
  renderWithProvider(<App />);
  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  const todo = screen.getByRole('list', { name: /todo task/i });

  expect(within(todo).getByText(/make dinner/i)).toBeInTheDocument();
});

test('finish a new task', async () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.click(screen.getByRole('button', { name: /complete task make dinner/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  expect(within(todo).queryByText(/make dinner/i)).not.toBeInTheDocument();
  expect(within(todo).getByText(/clean the house/i)).toBeInTheDocument();

  expect(within(done).getByText(/make dinner/i)).toBeInTheDocument();
});

test('delete a todo tasks', async () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.click(screen.getByRole('button', { name: /delete task clean the house/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  expect(within(todo).getByText(/make dinner/i)).toBeInTheDocument();
  expect(within(todo).queryByText(/clean the house/i)).not.toBeInTheDocument();

  expect(within(done).queryByText(/clean the house/i)).not.toBeInTheDocument();
});

test('undo a finish task', async () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('button', { name: /complete task make dinner/i }));
  userEvent.click(screen.getByRole('button', { name: /undo task make dinner/i }));

  expect(within(todo).getByText(/make dinner/i)).toBeInTheDocument();
  expect(within(done).queryByText(/make dinner/i)).not.toBeInTheDocument();
});

test('delete a finish tasks', async () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.click(screen.getByRole('button', { name: /complete task clean the house/i }));

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('button', { name: /delete task clean the house/i }));

  expect(within(todo).queryByText(/clean the house/i)).not.toBeInTheDocument();
  expect(within(done).queryByText(/clean the house/i)).not.toBeInTheDocument();
});

test('different message for empty task list after completing 3 tasks', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/let's do some tasks/i)).toBeInTheDocument();
  expect(screen.getByText(/there must be a task somewhere/i)).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task make dinner/i }));

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task clean the house/i }));

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'walk the dog');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task walk the dog/i }));

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'wash the clothes');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task wash the clothes/i }));

  expect(screen.getByText(/go have fun/i)).toBeInTheDocument();
  expect(screen.queryByText(/there must be a task somewhere/i)).not.toBeInTheDocument();
});

test('different message for empty finish task list after add new 3 tasks', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/let's do some tasks/i)).toBeInTheDocument();
  expect(screen.getByText(/there must be a task somewhere/i)).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'walk the dog');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'wash the clothes');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  expect(screen.queryByText(/let's do some tasks/i)).not.toBeInTheDocument();
  expect(screen.getByText(/you're completing some task, right?/i)).toBeInTheDocument();
});

test('cleaning all finish tasks', () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task make dinner/i }));

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'clean the house');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task clean the house/i }));

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'walk the dog');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');
  userEvent.click(screen.getByRole('button', { name: /complete task walk the dog/i }));

  const finishedTasks = within(screen.getByRole('list', { name: 'done tasks' })).getAllByRole('listitem');

  expect(finishedTasks.length).toBe(3);

  userEvent.click(screen.getByRole('button', { name: /clear/i }));
  expect(finishedTasks.length).toBe(3);
});
