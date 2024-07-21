import { Column } from "@ant-design/plots";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chart(props) {
  const [data1, setData1] = useState([]);
  const [sales, setSales] = useState([]);

  const GetStatisticData = async () => {
    // event.preventDefault();
    await axios
      .get(process.env.REACT_APP_SERVER_HOST + "statistic/" + props.year)
      .then((result) => {
        let arr = [];
        setData1(result.data.collumChart);
        result.data.collumChart.map((item) => arr.push(item.sales));
        setSales(arr);
      });
  };
  // fetching data
  useEffect(() => {
    GetStatisticData();
    // console.log(data1);
  }, [props.year]);

  var data = [
    { month: "1", sales: sales[0] },
    { month: "2", sales: sales[1] },
    { month: "3", sales: sales[2] },
    { month: "4", sales: sales[3] },
    { month: "5", sales: sales[4] },
    { month: "6", sales: sales[5] },
    { month: "7", sales: sales[6] },
    { month: "8", sales: sales[7] },
    { month: "9", sales: sales[8] },
    { month: "10", sales: sales[9] },
    { month: "11", sales: sales[10] },
    { month: "12", sales: sales[11] },
  ];  

  const config = {
    data,
    xField: "month",
    yField: "sales",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "month",
      },
      sales: {
        alias: "sales",
      },
    },
    minColumnWidth: 0,
    maxColumnWidth: 20,
  };

  return <Column {...config} />;
}
