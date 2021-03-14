import * as React from 'react';
import { Children } from '../../types/children';

type Task = {
  id: string;
  description: string;
  completed: boolean;
};

const initialState: Task[] = [];

type TaskActions =
  | { type: 'add'; description: string }
  | { type: 'done'; id: string }
  | { type: 'undone'; id: string }
  | { type: 'delete'; id: string };

function taskReducer(state: typeof initialState = initialState, action: TaskActions) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: `${Math.random().toString(36).substr(2, 9)}`,
          description: action.description,
          completed: false,
        },
      ];

    case 'done':
      return state.map((task) => (task.id === action.id ? { ...task, completed: true } : task));

    case 'undone':
      return state.map((task) => (task.id === action.id ? { ...task, completed: false } : task));

    case 'delete':
      return state.filter((task) => task.id !== action.id);

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

// @TODO olhar o undefined depois
type TaskContextType = [Task[], React.Dispatch<TaskActions>] | undefined;
const TaskContext = React.createContext<TaskContextType>(undefined);

type TaskProviderProps = Children;
const TaskProvider = (props: TaskProviderProps) => {
  const { children } = props;
  const [tasks, dispatch] = React.useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={[tasks, dispatch]}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => {
  const context = React.useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider.');
  }
  return context;
};

type TodoTaskActions = Exclude<TaskActions, { type: 'undone' }>;
const useTodoTask = () => {
  const [tasks, dispatch] = useTasks();
  const todo = tasks.filter((task) => !task.completed);
  const done = tasks.filter((task) => task.completed);

  const status = done.length > 3 ? 'go have fun' : "let's do some tasks";

  function todoDispatch(actions: TodoTaskActions) {
    return dispatch(actions);
  }

  return [{ status, list: todo }, todoDispatch] as const;
};

type DoneTaskActions = Exclude<TaskActions, { type: 'add' } | { type: 'done' }>;
const useDoneTask = () => {
  const [tasks, dispatch] = useTasks();
  const done = tasks.filter((task) => task.completed);
  const todo = tasks.filter((task) => !task.completed);

  const status = todo.length > 3 ? "you're completing some task, right?" : 'there must be a task somewhere';

  function doneDispatch(actions: DoneTaskActions) {
    return dispatch(actions);
  }
  return [{ status, list: done }, doneDispatch] as const;
};

export { TaskProvider, useTodoTask, useDoneTask };
