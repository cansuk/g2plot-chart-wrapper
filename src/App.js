import React, { useEffect, useState } from "react";
import DynamicChartClient from './demo/DynamicChartClient';
import DataProcessor from "./lib/components/DataProcessor";
// import { data } from './tmp/data';

function App() {
  // const refs = useRef({ data: [] })
  // const [data, setData] = useState(null)

  const [data, setData] = useState([]);



  useEffect(() => {
    let mounted = true;


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

    // fetch("./data2.json").then(
    //   function (res) {
    //     return res.json()
    //   }).then((data) => {
    //     if (mounted) {
    //       setData(data);
    //     }
    //   }).catch(
    //     (err) => {
    //       // TODO CANSU burdan anlamlı bi şekilde hata döndür.
    //       console.log(err, ' error')
    //     }
    //   );

    return () => mounted = false;
  }, [])

  return (
    // data && <DynamicChartClient data={data} />
    data.length > 0 && <DynamicChartClient data={data} />

  );
}

export default App;
