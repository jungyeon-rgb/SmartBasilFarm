import styled from "@emotion/styled";
import React, { useState, useEffect, useCallback } from "react";
import DeviceModal from "./DeviceModal";
import { axiosInstance } from "@/api/base";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenState, userAtom, deviceAtom } from "@/store/atoms";

export default function MyPageBailsList() {
  const [user, setUser] = useRecoilState(userAtom);
  const [device, setDevice] = useRecoilState(deviceAtom);
  const device_id = user.device_id;

  const router = useRouter();

  useEffect(() => {
    const fetchDefaultDeviceId = async () => {
      try {
        const response = await axiosInstance.get(`devices/:${device_id}`);
        response.data[0] && setDevice(response.data[0]);
      } catch (error) {
        console.error("디바이스 목록 : 🚀디바이스 목록을 가져오는데 실패했습니다.", error);
      }
    };

    fetchDefaultDeviceId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDeviceClick = () => {
    router.push({
      pathname: "./dashboard",
      query: { user_id: user.id, device_id: device.device_id },
    });
  };

  const profileImage = [
    "url(/images/profile/cat.jpeg)",
    "url(/images/profile/dog2.png)",
    "url(/images/profile/samyangbasil.png)",
    "url(/images/profile/freshbasil.png)",
    "url(/images/profile/basilpesto.png)",
  ];

  const dummyhandler = () => {};

  return (
    <BasilsListMain>
      <h2>🌱{user.fullname}님의 바질목록🌱</h2>
      <BasilListDiv>
        <p>새로운 바질이 추가되었나요?</p>
        <button onClick={dummyhandler}> 등록하러 가기</button>
      </BasilListDiv>
      {/*<DeviceModal isOpen={isModalOpen} closeModal={closeModal} addDevice={addDevice} />*/}
      <BasilDeviceLists>
        <li onClick={handleDeviceClick}>
          <div className="device-item">
            <ImageDiv className="device-image" style={{ backgroundImage: profileImage[3] }} />
            <span>싱싱한 바질</span>
          </div>
        </li>
        <li onClick={handleDeviceClick}>
          <div className="device-item">
            <ImageDiv className="device-image" style={{ backgroundImage: profileImage[4] }} />
            <span>바질페스토</span>
          </div>
        </li>
        <li onClick={handleDeviceClick}>
          <div className="device-item">
            <ImageDiv
              className="device-image"
              style={{
                backgroundImage: profileImage[device.device_picture - 1] || profileImage[0],
              }}
            />
            <span>바질맛사료</span>
          </div>
        </li>
        <li onClick={handleDeviceClick}>
          <div className="device-item">
            <ImageDiv className="device-image" style={{ backgroundImage: profileImage[1] }} />
            <span>댕댕</span>
          </div>
        </li>
      </BasilDeviceLists>
    </BasilsListMain>
  );
}

const ImageDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const BasilsListMain = styled.main`
  width: 70%;
  margin: 60px;

  text-align: center;

  & h2 {
    font-size: 40px;
    font-weight: 400;
  }

  @media screen and (max-width: 428px) {
    width: 100%;
    margin: 20px;

    & h2 {
      font-size: 25px;
    }
  }
`;

const BasilListDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;

  margin: 20px;
  font-size: 18px;

  & button {
    margin-left: 10px;
    color: #107d8e;
    font-weight: 700;
    background-color: transparent;
    border: none;
    font-size: 16px;
  }

  @media screen and (max-width: 428px) {
    flex-direction: column;
    align-items: center;
    margin: 30px;

    font-size: 16px;

    & button {
      font-size: 14px;
      margin: 7px;
    }
  }
`;

const BasilDeviceLists = styled.ul`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  .device-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .device-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    margin-bottom: 10px;
    border: 10px solid transparent;
    border-color: rgba(0, 168, 107);
  }

  @media screen and (max-width: 428px) {
    margin: 10px;
  }
`;
