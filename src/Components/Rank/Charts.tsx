import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import eChart from "./ChartData";
import { Row, Select, Col } from "antd";

const RankChart: React.FC = () => {
  const options: ApexOptions = eChart.options;

  return (
    <>
      <Row justify="space-between" align={"middle"}>
        <Col className="w-100">
          <h2 style={{ paddingBottom: "15px" }}>Sales Analytics</h2>
        </Col>
        <Col>
          <Select
            defaultValue="day"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </Col>
      </Row>
      <ReactApexChart
        options={options}
        series={eChart.series}
        type="area"
        height={220}
      />
    </>
  );
};

export default RankChart;
