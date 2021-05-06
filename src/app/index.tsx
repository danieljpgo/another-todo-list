import { TaskProvider } from './common/context/TaskContext';
import Panel from './pages/Panel';

const App = () => (
  <main className="grid h-screen place-items-center">
    <TaskProvider>
      <Panel />
    </TaskProvider>
  </main>
);

export default App;
