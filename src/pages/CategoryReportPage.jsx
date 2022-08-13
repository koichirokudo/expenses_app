import React from "react";
import { Bar } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import GenericTemplate from "../components/GenericTemplate";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { Title } from "./Title";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  BarController,
  BarElement
);

export const CategoryReportPage = (props) => {
  console.log(props);
  const barOptions = {
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    title: {
      display: true,
    },
  };
  const graphData1 = {
    labels: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        backgroundColor: ["#666"],
        borderColor: ["#666"],
      },
    ],
  };

  return (
    <GenericTemplate title="カテゴリ別のレポート">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2 }}>
            <Title>住居費のレポート</Title>
            <Bar options={barOptions} data={graphData1} />
          </Paper>
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};
