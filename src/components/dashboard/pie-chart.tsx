import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface PieChartProps {
  data: DataPoint[];
  title?: string;
}

const CHART_COLORS = [
  "#ff6063",
  "#ffa453",
  "#ffd633",
  "#5dd27a",
  "#33d3c2",
  "#3dc5f6",
  "#3094eb",
  "#8177f7",
  "#be5def",
  "#ffa2e2",
  "#bd997e",
  "#bebebe",
];

export default function PieChartComponent({ data, title }: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.get("colors")?.set(
      "colors",
      CHART_COLORS.map((color) => am5.color(color))
    );

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
      fontSize: 12,
      fill: am5.color(0x000000),
    });

    series.ticks.template.setAll({
      strokeOpacity: 0.5,
      strokeWidth: 1,
    });

    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
    });

    // Set data
    const chartData = data.map((item) => ({
      category: item.label,
      value: item.value,
    }));

    series.data.setAll(chartData);

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {title && (
        <h3 className="mb-4 text-center text-gray-950 text-h5">{title}</h3>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
