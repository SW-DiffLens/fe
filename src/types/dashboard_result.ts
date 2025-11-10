export interface DashboardResult {
  result: {
    summary: {
      total_respondents: number;
      average_age: number;
      data_capture_date: string;
      confidence_level: number;
    };
    pie: {
      reason: string;
      title: string;
      xaxis: string;
      yaxis: string;
      chart_id: string;
      chart_type: string;
      x_axis: string;
      y_axis: string;
      data_points: { label: string; value: number }[];
    };
    charts: [
      {
        reason: string;
        title: string;
        xaxis: string;
        yaxis: string;
        chart_id: string;
        chart_type: string;
        x_axis: string;
        y_axis: string;
        data_points: { label: string; value: number }[];
      },
    ];
    applied_filters_summary: { key: string; display_value: string }[];
    search_id: string;
  };
  search_id: string;
  question: string;
}
