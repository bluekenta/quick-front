import { ApexOptions } from "apexcharts";
import { useState } from "react";

// redux
import { useGetAnalyticsDataQuery } from "../../Redux/slice";

interface ChartSeries {
  name: string;
  data: number[];
  color: string;
}

/*
 **  value type of chart's  configuration
 */
export interface ChartConfig {
  series: ChartSeries[];
  options: ApexOptions;
}

export const eChart: ChartConfig = {
  series: [
    {
      name: "Sales",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
      color: "#7e7e7e",
    },
  ],

  options: {
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["#121212"],
        stops: [10, 100],
      },
    },
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "23.5%",
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
  },
};

/*
 ** interface of user dashboard
 */
export function useChartData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    loading: isLoading,
  };
}
