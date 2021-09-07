import DynamicChart from './lib/components/DynamicChart';
import data from './tmp/data';
function App() {
  return (
    <DynamicChart {...data} />
  );
}

export default App;
