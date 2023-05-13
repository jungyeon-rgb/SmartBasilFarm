import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { sensorDataAtom } from "@store/atoms";

const SubSection4Contents = () => {
  const sensorData = useRecoilValue(sensorDataAtom);

  return <Main></Main>;
};

const Main = styled.div`
  width: 75vw;
  height: 100vh;
  display: flex;
  position: relative;
`;

export default SubSection4Contents;
