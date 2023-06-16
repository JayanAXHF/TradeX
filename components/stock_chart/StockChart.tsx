"use client";

import { useAppContext } from "@/context/context";
import AreaChart from "react-apexcharts";

const StockChart = () => {
  const { stockData } = useAppContext();
  const currentStock = stockData[0];
  const options = {
    title: {
      text: currentStock.meta.symbol,
      align: "center" as "center",
      style: {
        fontSize: "30px",
      },
    },
    chart: {
      id: "stock chart",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "dd MMM HH:MM",
      },
    },
  };
  console.log(
    `JSC ~ file: StockChart.tsx:13 ~ StockChart ~ currentStock:`,
    currentStock
  );

  const series = [
    {
      data: currentStock.values.map((item: any) => {
        return { x: new Date(item.datetime).getTime(), y: item.open };
      }),
    },
  ];

  console.log(`JSC ~ file: StockChart.tsx:32 ~ StockChart ~ data:`, series);
  return (
    <AreaChart
      options={options as any}
      series={series}
      type="area"
      width={"100%"}
      height="50%"
    />
  );
};

export default StockChart;
