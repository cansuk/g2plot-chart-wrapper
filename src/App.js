import { useEffect, useState } from "react";
import DynamicChartClient from './lib/components/DynamicChartClient';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {

    fetch("./data2.json").then(
      function (res) {
        return res.json()
      }).then((data) => {
        setData(data);
        console.log("FETCH COMPLETED")
      }).catch(
        (err) => {
          // TODO CANSU burdan anlamlı bi şekilde hata döndür.
          console.log(err, ' error')
        }
      );

  }, [])

  return (
    data.length > 0 && <DynamicChartClient data={data} />

  );
}

export default App;
