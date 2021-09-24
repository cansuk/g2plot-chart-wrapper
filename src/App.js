import DynamicChartClient from './demo/DynamicChartClient';
import { data } from './tmp/data';

function App() {

  // fetch("./data.json").then(
  //   function (res) {
  //     return res.json()
  //   }).then(function (data) {
  //     // store Data in State Data Variable
  //     console.log(data);
  //     debugger;
  //     // setData(data)
  //   }).catch(
  //     function (err) {
  //       console.log(err, ' error')
  //     }
  //   )

  return (
    <DynamicChartClient data={data} />
  );
}

export default App;
