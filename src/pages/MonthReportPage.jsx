import React, { useRef } from "react";
import { Bar, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";
import GenericTemplate from "../components/genericTemplate";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { Title } from "./Title";
import { incomeCategoryItems, spendCategoryItems } from "./CategoryItems";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  BarController,
  BarElement
);

export const MonthReportPage = () => {
  const barOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
    },
    title: {
      display: true,
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: false,
    },
    title: {
      display: true,
    },
  };
  const incomeBarGraphData = {
    labels: incomeCategoryItems,
    datasets: [
      {
        data: [
          { name: "給料", category: { money: 1, link: "/category_report" } },
          { name: "副業", category: { money: 2, link: "/category_report" } },
          {
            name: "お小遣い",
            category: { money: 3, link: "/category_report" },
          },
          { name: "投資", category: { money: 4, link: "/category_report" } },
          { name: "賞与", category: { money: 5, link: "/category_report" } },
          {
            name: "臨時収入",
            category: { money: 6, link: "/category_report" },
          },
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        parsing: {
          yAxisKey: "name",
          xAxisKey: "category.money",
        },
      },
    ],
  };
  const incomePieGraphData = {
    type: "pie",
    labels: incomeCategoryItems,
    datasets: [
      {
        data: [
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
    parsing: {
      key: "value",
    },
  };
  // グラフをクリックしたら飛ぶ
  const spendBarGraphData = {
    labels: spendCategoryItems,
    datasets: [
      {
        labels: "Month report",
        data: [
          { name: "住居費", money: 1, link: "/category_report" },
          { name: "保険料", money: 2, link: "/category_report" },
          { name: "a", money: 3, link: "/category_report" },
          { name: "b", money: 4, link: "/category_report" },
          { name: "c", money: 5, link: "/category_report" },
          { name: "d", money: 6, link: "/category_report" },
          { name: "e", money: 7, link: "/category_report" },
          { name: "f", money: 8, link: "/category_report" },
          { name: "g", money: 9, link: "/category_report" },
          { name: "h", money: 10, link: "/category_report" },
          { name: "i", money: 11, link: "/category_report" },
          { name: "j", money: 12, link: "/category_report" },
          { name: "k", money: 13, link: "/category_report" },
          { name: "l", money: 14, link: "/category_report" },
          { name: "m", money: 15, link: "/category_report" },
          { name: "n", money: 16, link: "/category_report" },
          { name: "aa", money: 17, link: "/category_report" },
          { name: "bb", money: 18, link: "/category_report" },
          { name: "v", money: 19, link: "/category_report" },
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        parsing: {
          yAxisKey: "name",
          xAxisKey: "money",
        },
      },
    ],
  };
  const spendPieGraphData = {
    labels: spendCategoryItems,
    datasets: [
      {
        data: [
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
          { value: 500, link: "/category_report" },
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        parsing: {
          key: "value",
        },
      },
    ],
  };

  const navigate = useNavigate();
  const incomeBarChartRef = useRef();
  const incomePieChartRef = useRef();
  const spendBarChartRef = useRef();
  const spendPieChartRef = useRef();

  const handleIncomePieReport = (event) => {
    const { current: chart } = incomePieChartRef;
    if (!chart) return;
    const elements = getElementAtEvent(chart, event);
    const datasets = getDatasetAtEvent(chart, event);
    if (elements.length === 0) return;
    const index = elements[0].index;
    navigate(datasets[index].element.$context.raw.link);
  };
  const handleSpendPieReport = (event) => {
    const { current: chart } = spendPieChartRef;
    if (!chart) return;
    const elements = getElementAtEvent(chart, event);
    const datasets = getDatasetAtEvent(chart, event);
    if (elements.length === 0) return;
    const index = elements[0].index;
    navigate(datasets[index].element.$context.raw.link);
  };
  const handleIncomeBarReport = (event) => {
    const { current: chart } = incomeBarChartRef;
    if (!chart) return;
    const elements = getElementAtEvent(chart, event);
    const datasets = getDatasetAtEvent(chart, event);
    if (elements.length === 0) return;
    const index = elements[0].index;
    navigate(datasets[index].element.$context.raw.category.link);
  };
  const handleSpendBarReport = (event) => {
    const { current: chart } = spendBarChartRef;
    if (!chart) return;
    const elements = getElementAtEvent(chart, event);
    const datasets = getDatasetAtEvent(chart, event);
    if (elements.length === 0) return;
    const index = elements[0].index;
    navigate(datasets[index].element.$context.raw.link);
  };

  return (
    <GenericTemplate title="今月のレポート">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} xl={8}>
          <Paper sx={{ p: 2 }}>
            <Title>収入のレポート</Title>
            <Bar
              ref={incomeBarChartRef}
              data={incomeBarGraphData}
              options={barOptions}
              onClick={handleIncomeBarReport}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Paper sx={{ p: 2 }}>
            <Title>収入のレポート</Title>
            <Pie
              ref={incomePieChartRef}
              data={incomePieGraphData}
              options={pieOptions}
              onClick={handleIncomePieReport}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} xl={8}>
          <Paper sx={{ p: 2 }}>
            <Title>支出のレポート</Title>
            <Bar
              ref={spendBarChartRef}
              data={spendBarGraphData}
              options={barOptions}
              onClick={handleSpendBarReport}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Paper sx={{ p: 2 }}>
            <Title>支出のレポート</Title>
            <Pie
              ref={spendPieChartRef}
              data={spendPieGraphData}
              options={pieOptions}
              onClick={handleSpendPieReport}
            />
          </Paper>
        </Grid>
      </Grid>
    </GenericTemplate>
  );
};
