// import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";

// export default function LineCharts({ summedSales, dates }) {
//   return (
//     <LineChart
//       width={420}
//       height={300}
//       series={[{ data: summedSales, yAxisKey: "leftAxisId" }]} // Use totalSaleAmounts as data
//       xAxis={[{ scaleType: "point", data: dates }]} // Use dates as data
//       yAxis={[{ id: "leftAxisId" }]}
//     />
//   );
// }
import React from "react";
import Chart from "react-apexcharts";

export default function LineCharts({ summedSales, dates }) {
  const options = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dates,
      labels: {
        style: {
          colors: "rgba(203, 204, 210, 0.5)",
        },
      },
    },
    grid: {
      show: true, // Dividers ko show karein
      borderColor: "#e0e0e0", // Divider ka color customize karein
      strokeDashArray: 4, // Divider ki dash style customize karein
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2, // Line ki thickness customize karein
      curve: "smooth", // Line ki curve ko customize karein
    },
    yaxis: {
      labels: {
        style: {
          colors: "rgba(203, 204, 210, 0.5)", // Change this to your desired label color
        },
      },
    },
  };

  const series = [
    {
      name: "Total Sales",
      data: summedSales,
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width={420}
        height={250}
      />
    </div>
  );
}
