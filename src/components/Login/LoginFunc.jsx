import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/api/base";
import Link from "next/link";
import { isLoggedInState, tokenState } from "@/store/atoms";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

export default function LoginFunc() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const setToken = useSetRecoilState(tokenState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        router.push("/mypage");
      }, 1500);
    }
  }, [isLoggedIn, router]);

  const handleResponse = (response) => {
    if (response.status === 200) {
      setMsg(id + "님, 로그인 되었습니다! 반가워요 😊");
      setLoggedIn(true);

      const token = response.data.accessToken;
      setToken(token);
    } else if (response.status === 403) {
      setMsg("가입되지 않은 계정입니다.");
    } else if (response.status === 401) {
      setMsg("로그인에 실패하였습니다.");
    } else if (response.status === 405) {
      setMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setMsg("알 수 없는 오류가 발생했습니다." + JSON.stringify(response));
    }
  };

  const LoginFunc = (e) => {
    e.preventDefault();
    if (!id) {
      return alert("ID를 입력하세요.");
    } else if (!password) {
      return alert("Password를 입력하세요.");
    }
    const body = {
      id: id,
      password: password,
    };

    setLoading(true);

    axiosInstance
      .post(`users/sign_in`, body)
      .then((response) => {
        handleResponse(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMsg("API 호출에 실패했습니다.");
        setLoading(false);
      });
  };
  return (
    <LoginPage>
      <LoginPageContents>
        <LoginPageCommentDiv>
          <h1>LOGIN</h1>
          <h2>바질과 무제한 친해지리 🌿</h2>
          <h3>다양한 센서들과 엑츄에이터들로 인생바질을 키워보세요 🌿</h3>
        </LoginPageCommentDiv>
        <LoginPageForm onSubmit={LoginFunc} method="post">
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
        </LoginPageForm>
        <LoginPageSignupDiv>
          <p>아직 가입을 하지 않았다면?</p>
          <LoginPageSignupLink href="/signup">가입하러 가기</LoginPageSignupLink>
        </LoginPageSignupDiv>
        {msg}
      </LoginPageContents>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  position: relative;
  width: 30%;
  height: 70%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
  border-radius: 10px;
`;

const LoginPageContents = styled.div`
  width: 100%;
  height: 80%;
  // border: 2px solid;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginPageCommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  // border: 2px red solid;

  width: 80%;

  & h1 {
    font-size: 70px;
    font-weight: 700;
    color: #97c410;
    text-align: center;
    margin-bottom: 25px;
  }

  & h3 {
    font-weight: 500;
    font-size: 17px;
  }
`;

const LoginPageForm = styled.form`
  border-radius: 20px;

  // border: 2px solid;
  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    width: 100%;
    height: 18%;
    transition: background-color 0.8s;
    border: 1px rgba(228, 228, 228, 0.5) solid;
    border-radius: 13px;
    margin: 15px;

    &:focus {
      border: 0.5px solid;
    }

    &::placeholder {
      padding-left: 20px;
      font-size: 15px;
    }
  }

  & button {
    cursor: pointer;
    width: 100%;
    margin: 20px;
    height: 18%;

    border-radius: 13px;
    border: none;
    transition: background-color 0.2s;

    font-size: 20px;

    &: hover {
      background-color: rgba(0, 168, 107, 0.8);
    }
  }
`;

const LoginPageSignupDiv = styled.div`
  display: flex;
  margin: 20px;
  font-size: 18px;
`;

const LoginPageSignupLink = styled(Link)`
  font-weight: bold;
  margin-left: 10px;
  color: rgba(0, 168, 107, 0.8);
`;
