import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_southKoreaLow from "@amcharts/amcharts5-geodata/southKoreaLow";
import { useLayoutEffect, useRef } from "react";
import type { ChartDataPoint } from "@/types/dashboard_result";

interface MapChartProps {
  data: ChartDataPoint[];
  title?: string;
  reasoning?: string | null;
}

export default function MapChartComponent({
  data,
  title,
  reasoning,
}: MapChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // Create polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_southKoreaLow,
        valueField: "value",
        calculateAggregates: true,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}",
      interactive: true,
      fill: am5.color(0xf5f4fe),
      strokeWidth: 0.5,
      stroke: am5.color(0xffffff),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x8569e4),
    });

    // Set up heat rules
    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xedebfc),
        max: am5.color(0x764ed9),
        key: "fill",
      },
    ]);

    // Prepare data with region IDs
    const chartData = data.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
    }));

    polygonSeries.data.setAll(chartData);

    // Add zoom control
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {title && (
        <h3 className="mb-2 text-center text-gray-950 text-h5">{title}</h3>
      )}
      {reasoning && (
        <p className="mb-4 max-w-[90%] text-center text-caption text-gray-600">
          {reasoning}
        </p>
      )}
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
