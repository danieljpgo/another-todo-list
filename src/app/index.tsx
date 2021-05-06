import { TaskProvider } from './common/context/TaskContext';
import Panel from './pages/Panel';

const App = () => (
  <main className="grid h-screen place-items-center bg-gradient-to-tr from-gray-200 via-gray-200 to-blue-200">
    <TaskProvider>
      <Panel />
    </TaskProvider>
  </main>
);

export default App;
