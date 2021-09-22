import { TaskProvider } from './common/context/TaskContext';
import Panel from './pages/Panel';

export default function App() {
  return (
    <main className="grid h-screen place-items-center">
      <TaskProvider>
        <Panel />
      </TaskProvider>
    </main>
  );
}
