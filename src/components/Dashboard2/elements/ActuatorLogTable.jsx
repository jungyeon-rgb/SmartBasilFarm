import React from "react";
import { useRecoilValue } from "recoil";
import { actuatorLogSelector } from "@store/selector";

import device000actuator from "../../../data/testingdata/device000actuator";

const ActuatorLogTable = () => {
  const dataAtom = useRecoilValue(actuatorLogSelector);
  const data = dataAtom.length > 0 ? dataAtom : device000actuator;

  console.log(data);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1} / ${date.getDate()}`;
    return formattedDate;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedTime;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th width="28%">날짜</th>
            <th width="32%">시간</th>
            <th width="20%">구분</th>
            <th width="20%">제어값</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row) => (
            <tr key={row.id}>
              <td>{formatDate(row.created_at)}</td>
              <td>{formatTime(row.created_at)}</td>
              <td>LED</td>
              <td>{row.led === 255 ? "ON" : "OFF"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActuatorLogTable;
