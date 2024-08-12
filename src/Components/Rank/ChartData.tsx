import { ApexOptions } from "apexcharts";

interface ChartSeries {
  name: string;
  data: number[];
  color: string;
}

const eChart: {
  series: ChartSeries[];
  options: ApexOptions;
} = {
  series: [
    {
      name: "Sales",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
      color: "var(--color-text)",
    },
  ],

  options: {
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: ["#7e7e7e"],
        stops: [100, 0],
      },
    },
    chart: {
      type: "area",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "27.5%",
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
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

export default eChart;
