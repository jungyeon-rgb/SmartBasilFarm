import { useRecoilState, useRecoilValue } from "recoil";
import { colorCode } from "@store/constValue";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "@emotion/styled";
import { dayAndNightSelector } from "@store/selector";
import { maxBy, minBy } from "lodash";
import { scaleLinear } from "d3-scale";

const DayAndNightTempChart = () => {
  const dayAndNight = useRecoilValue(dayAndNightSelector);

  const chartData = dayAndNight.map((item) => ({
    date: item.date,
    dayLight: parseInt(item.dayAvg.light),
    nightLight: parseInt(item.nightAvg.light),
    dayTemp: parseFloat(item.dayAvg.temp),
    nightTemp: parseFloat(item.nightAvg.temp),
    dayMoisture: parseInt(item.dayAvg.moisture),
    nightMoisture: parseInt(item.nightAvg.moisture),
    dayHumidity: parseInt(item.dayAvg.humidity),
    nightHumidity: parseInt(item.nightAvg.humidity),
  }));

  console.log(dayAndNight);

  const dayMax = maxBy(chartData, "dayTemp");
  const nightMax = maxBy(chartData, "nightTemp");
  const dayMin = minBy(chartData, "dayTemp");
  const nightMin = minBy(chartData, "nightTemp");

  const maxVal = dayMax.dayTemp > nightMax.nightTemp ? dayMax.dayTemp : nightMax.nightTemp;
  const minVal = dayMin.dayTemp < nightMin.nightTemp ? dayMin.dayTemp : nightMin.nightTemp;
  const yScale = scaleLinear()
    .domain([minVal - 1, maxVal + 1])
    .nice();
  console.log(maxVal, minVal);
  return (
    <Main>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[minVal - 0.3, maxVal + 0.3]} />
          <Tooltip />
          <Bar dataKey="dayTemp" fill={colorCode.yellow} />
          <Bar dataKey="nightTemp" fill={colorCode.palelavender} />
        </BarChart>
      </ResponsiveContainer>
    </Main>
  );
};

export default DayAndNightTempChart;

const Main = styled.div`
  width: 100%;
  height: 67%;
`;
