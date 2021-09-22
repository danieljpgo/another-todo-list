import { TaskProvider } from './common/context/taskContext';
import Panel from './pages/Panel/Panel';

export default function App() {
  return (
    <main className="grid h-screen place-items-center">
      <TaskProvider>
        <Panel />
      </TaskProvider>
    </main>
  );
}
