import './App.css';
import AssignmentsGrid from './components/AssignmentsGrid';
import DriversGrid from './components/DriversGrid';

function App() {
  return (
    <div className="App">
      <DriversGrid />
      <AssignmentsGrid />
    </div>
  );
}

export default App;
