import { axiosInstance } from "@/api/base";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import { tokenState, userAtom } from "@/store/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

export default function MyPageUser() {
  const token = useRecoilValue(tokenState);
  const [user_info, setUserInfo] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //My Page 불러오는 useEffect
    const fetchMyPageInfo = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`user/sign_in/my_page`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { id, email, phone, fullname } = response.data;

        setUserInfo({
          id: response.data[0].id,
          fullname: response.data[0].fullname,
          phone: response.data[0].phone,
          email: response.data[0].email,
          picture: response.data[0].picture,
          device_id: response.data[0].device_id,
          created_at: response.data[0].created_at,
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        console.log("유저목록 : API 호출에 실패했습니다.");
        setLoading(false);
      }
    };

    fetchMyPageInfo();
  }, [token, setUserInfo]);

  return (
    <>
      <MyPageUserMain>
        <MyPageTitle>👋 {user_info.fullname}님, 반가워요!</MyPageTitle>
        <MyPageDiv>
          <MyPageInfoList>
            <MyPageInfoItem>💝 아이디 : {user_info.id}</MyPageInfoItem>
            <MyPageInfoItem>✉️ 이메일 : {user_info.email}</MyPageInfoItem>
            <MyPageInfoItem>📱 휴대폰번호 : {user_info.phone}</MyPageInfoItem>
          </MyPageInfoList>
        </MyPageDiv>
      </MyPageUserMain>
    </>
  );
}

const MyPageUserMain = styled.main`
  width: 75%;

  border-radius: 20px;
  background-color: rgba(217, 217, 217, 0.3);

  text-align: center;

  @media screen and (max-width: 428px) {
    width: 100%;
    border-radius: 0;
  }
`;

const MyPageTitle = styled.h1`
  font-size: 50px;
  font-weight: 400;

  margin: 20px;
  @media screen and (max-width: 428px) {
    font-size: 30px;
  }
`;

const MyPageDiv = styled.div`
  margin-top: 35px;
  margin-bottom: 20px;
  @media screen and (max-width: 428px) {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const MyPageInfoList = styled.ul``;

const MyPageInfoItem = styled.li`
  font-size: 21px;
  margin: 10px;

  @media screen and (max-width: 428px) {
    font-size: 16px;
    margin: 5px;
  }
`;
