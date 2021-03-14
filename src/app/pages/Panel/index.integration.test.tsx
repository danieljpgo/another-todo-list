import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from '../../common/context/TaskContext';
import App from '../..';

function renderWithProvider(children: React.ReactNode) {
  render(<TaskProvider>{children}</TaskProvider>);
}

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

test('undone a finish task', async () => {
  renderWithProvider(<App />);

  userEvent.type(screen.getByPlaceholderText(/new task/i), 'make dinner');
  userEvent.type(screen.getByPlaceholderText(/new task/i), '{enter}');

  const todo = screen.getByRole('list', { name: /todo tasks/i });
  const done = screen.getByRole('list', { name: /done tasks/i });

  userEvent.click(screen.getByRole('button', { name: /complete task make dinner/i }));
  userEvent.click(screen.getByRole('button', { name: /undone task make dinner/i }));

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
