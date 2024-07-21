import { Bar } from "@ant-design/plots";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chart(props) {
  const [data1, setData1] = useState([]);
  const [sales, setSales] = useState([]);
  const [category, setCategory] = useState([]);
  const GetStatisticData = async () => {
    // event.preventDefault();
    await axios
      .get(process.env.REACT_APP_SERVER_HOST + "statistic/" + props.year)
      .then((result) => {
        let arrSales = [];
        let arrCategory = [];
        setData1(result.data.barChart);
        result.data.barChart.map((item) => arrSales.push(item.sales));
        result.data.barChart.map((item) => arrCategory.push(item.category));
        setSales(arrSales);
        setCategory(arrCategory);
      });
  };

  // fetching data
  useEffect(() => {
    GetStatisticData();
  }, [props.year]);

  var data = [
    { category: category[0], sales: sales[0] },
    { category: category[1], sales: sales[1] },
    { category: category[2], sales: sales[2] },
    { category: category[3], sales: sales[3] },
  ];

  const config = {
    data,
    xField: "sales",
    yField: "category",
    seriesField: "category",
    legend: {
      position: "top-left",
    },
  };
  return <Bar {...config} />;
}
