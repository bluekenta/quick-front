import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {eChart} from "./ChartData";

import { Row, Select, Col } from "antd";
import * as Styled from "./Style/Dashboard.styled";
import { ChartConfig } from "./ChartData";

/**
 * value type of chart props
 * @options
 */
interface ChartProps {
  eChart: ChartConfig
}

/**
 * 
 * @param props 
 * @returns Chart Component
 */
const EChart: React.FC = () => {
  const options: ApexOptions = eChart.options;
  return (
    <>
      <Row justify="space-between" align={"middle"}>
        <Col className="w-100">
          <Styled.ChartHeading>Analytics</Styled.ChartHeading>
        </Col>
        <Styled.SelectCol>
          <Styled.ChartSubjectSelect
            defaultValue="profits"
            options={[
              { value: "profits", label: "Profits" },
              { value: "credits", label: "Credits" },
              { value: "rewards", label: "Rewards" },
            ]}
          />
          <Styled.ChartDateSelect
            defaultValue="day"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </Styled.SelectCol>
      </Row>
      <div className="chart-container">
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
};

export default EChart;
