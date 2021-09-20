import DynamicChartClient from './demo/DynamicChartClient';
import { DynamicChart } from './lib';
import ChartDemo from './lib/components/ChartDemo';
import { data } from './tmp/data';

function App() {
  return (
    <DynamicChart data={data} />
    // <ChartDemo />
  );
}

export default App;
