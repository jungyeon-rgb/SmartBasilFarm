import styled from "@emotion/styled";
import Image from "next/image";

import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { userAtom, deviceAtom, isLoggedInState } from "@store/atoms";
import { formatAutoConfigSelector } from "@store/selector";

const MainSection1Content = () => {
  const user = useRecoilValue(userAtom);
  const device = useRecoilValue(deviceAtom);
  const autoConfig = useRecoilValue(formatAutoConfigSelector);
  const [islogin, setIslogin] = useRecoilState(isLoggedInState);

  const router = useRouter();

  const handleNavMyPage = () => {
    router.push("/mypage");
  };

  const handleNavLogOut = () => {
    setIslogin((prev) => {
      !prev;
    });
    router.push("/");
  };

  return (
    <Main>
      <ProfileImageWrapper>
        <Profileimage></Profileimage>
      </ProfileImageWrapper>
      <TitleWrapper>
        <UserNameText>{user.fullname}님의</UserNameText>
        <PlantNameText>{device.device_name}</PlantNameText>
      </TitleWrapper>
      <ContentsWrapper>
        <SubTitleText>{`${device.device_macAddress} ${device.device_type}`}</SubTitleText>
        <SubTitleText>현재상태</SubTitleText>
        <SubTitleText>
          {autoConfig.status ? "자동제어가 실행중입니다." : "자동제어가 실행중이 아닙니다."}
        </SubTitleText>
      </ContentsWrapper>
      <NavWrapper>
        <NavText onClick={handleNavMyPage}>마이페이지</NavText>
        <NavText onClick={handleNavLogOut}>로그아웃</NavText>
      </NavWrapper>
    </Main>
  );
};

export default MainSection1Content;

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

//----------------섹션 내부 레이아웃 (Wrapper)
const TitleWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;
const ContentsWrapper = styled.div``;
const RandomMessageWrapper = styled.div`
  padding: 1rem 1.3rem 1rem 1rem;
`;
const ProfileImageWrapper = styled.div`
  position: relative;
  width: 25vw;
  height: 25vw;
  overflow: hidden;
`;
const Profileimage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: -2.3vh 2.3vh 4vh rgba(0, 0, 0, 0.15);
`;
const NavWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: black;
  display: flex;
`;
//----------------------------------

//---------------------텍스트 스타일
const UserNameText = styled.p`
  font-size: 2.5rem;
`;
const PlantNameText = styled.p`
  font-size: 4.5rem;
  font-weight: 600;
`;
const SubTitleText = styled.p`
  font-size: 1.3rem;
`;
const NavText = styled.div`
  padding: 1rem;
  width: 50%;
  text-align: center;
`;
//----------------------------------
