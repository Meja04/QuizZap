import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { getAllScores } from "../../services/score.service";
import { getCategories } from "../../services/quiz.service";
import "./Chart.css";

const min = 0;
const max = 1000;
const step = 100;

function generateScoreRanges(min: number, max: number, step: number): string[] {
  const ranges: string[] = [];
  for (let i = min; i < max; i += step) {
    ranges.push(`${i}-${i + step}`);
  }
  return ranges;
}

function getCSSColors(): string[] {
  const colors: string[] = [];
  for (let i = 0; i < 6; i++) {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(`--category-color-${i}`)
      .trim();
    colors.push(color);
  }
  return colors;
}

export default function Chart() {
  const [barData, setBarData] = useState<any[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getAllScores().then(setScores);
  }, []);

  useEffect(() => {
    if (categories.length === 0 || scores.length === 0) return;

    const scoreRanges = generateScoreRanges(min, max, step);
    setLabels(scoreRanges);

    const dataPerCategory: Record<string, number[]> = {};
    categories.forEach((cat: any) => {
      dataPerCategory[cat.name] = new Array((max - min) / step).fill(0);
    });

    scores.forEach((score: any) => {
      const rangeIndex = Math.floor(score.score / step);
      const index = Math.min(rangeIndex, (max - min) / step - 1);
      if (dataPerCategory[score.category]) {
        dataPerCategory[score.category][index]++;
      }
    });

    const colors = getCSSColors();

    const datasets = categories.map((cat: any, i: number) => ({
      label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
      data: dataPerCategory[cat.name],
      color: colors[i % colors.length],
    }));

    setBarData(datasets);
  }, [categories, scores]);

  const chartSetting = {
    yAxis: [
      {
        label: "Number of players",
      },
    ],
    width: 1000,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
      <BarChart
        {...chartSetting}
        series={barData.map(ds => ({
          data: ds.data,
          label: ds.label,
          color: ds.color,
        }))}
        xAxis={[{ data: labels, label: "Score ranges" }]}
      />
  );
}
