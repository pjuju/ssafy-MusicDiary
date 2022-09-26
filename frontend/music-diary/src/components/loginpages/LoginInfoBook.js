import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';

import "../../css/loginpages/LoginPageBook.css";
import Button from "../Common/Button";

import styled from "styled-components";

import { loginApi, kakaoLoginApi, googleLoginApi } from "../../api/userApi";
import axios from "axios";

// import { useSelector } from "react-redux";

const LoginInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function LoginInfoBook() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  // const test = useSelector((state) => {
  //   return state.user;
  // });

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  // 일반 로그인 버튼 클릭 후
  const onLoginBtn = async () => {
    console.log("email:", email);
    console.log("password:", password);

    const loginInfo = {
      email,
      password,
    };

// 로그인 버튼 클릭
  // id, 비번 확인하는 **API를 호출**
    // id랑 비밀번호 일치하는 경우
      // 첫 로그인 확인하는 **API 호출**
        // -> 첫 로그인 판별값 

          // 첫 로그인이면 -> 프론트쪽에서 설문으로..

          //두번째로그인이라면
            // 토큰, 등등 정보 받기위해.. accounts/login 을 다시 호출.. 
    // id가 없거나, 비밀번호랑 일치하지 않는다면
      // alert, 다시 로그인 페이지 

    axios
      .post("http://j7d204.p.ssafy.io:8080/rest/accounts/login/", loginInfo)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        // 이메일을 입력 -> 이메일로 회원정보 GET -> 
        // -> 회원정보에서 감정 라벨링상태 판단 
        // => 안되어있으면 ->, 바로 설문이동
        // 되어있으면 -> 바로 로그인,,,
        // 

        
        // access 토큰, refresh 토큰, user id 정보 담기
          sessionStorage.setItem("accessToken", res.data.data.token.access_token)
          sessionStorage.setItem("refreshToken", res.data.data.token.refresh_token)
          sessionStorage.setItem("user_id", res.data.data.id)
          // 설문 띄워주고, 클릭 완료 x -> 껐어 , url쳐서 들어가버리면,, 
            // 로그인은 된 상태 / 설문은 안한 상태에서 추천이 가능,,,

        // user_id로 유저 정보 api호출
        
          // 호출 후, res.data에서 감정정보 값 확인

          // if) 
          //

        navigate("/calender");
      })
      .catch((err) => {
        console.log(err.data);
      });

    // loginApi(loginInfo)
    // .then((res)=>{
    //   console.log(JSON.stringify(res.data))

    // })
    // .catch((err)=>{
    //   console.log(JSON.stringify(err))
    // })
  };


  // 카카오로그인 버튼 클릭 후
  // const onKakaoLoginBtn = () => {
  //   // kakaoLoginApi()


  //   const code = new URL(window.location.href).searchParams.get("code");

  //     axios
  //       .post("http://localhost:8000/rest/accounts/kakao/callback2/", code)
  //       console.log(code)
  //       .then((res) => {
  //         console.log(JSON.stringify(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(err.data);
  //       });

  //   // useEffect(() =>{
  //   //   postCode();
  //   // }, []);

  //   // axios
  //   // .post("http://j7d204.p.ssafy.io:8080/rest/accounts/kakao/login/")
  //   // .then((res)=>{
  //   //   console.log(JSON.stringify(res.data))
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(err.data)
  //   // })

  //   // kakaoLoginApi()
  //   // .then((res)=>{
  //   //   console.log(JSON.stringify(res.data))
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(JSON.stringify(err.data))
  //   // })
  // };

  // 구글 로그인 버튼 클릭 후
  const onGoogleLoginBtn = () => {
    // googleLoginApi()

    googleLoginApi()
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  };
  
  const REST_API_KEY = "f742e07d1059ec8cd0050f305986a8a4"
  const REDIRECT_URI = "http://localhost:3000/kakao/login/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;   

  return (
    <>
      <div className="login-info-wrapper">
        {/* <div id="closedcontainer"> */}
        <LoginInfoBookcontainer>
          <div className="closed-book">
            <div className="first paper">
              <div className="page front contents">
                <div className="intro">
                  <h1>Login</h1>
                  <div className="login-form-wrapper">
                    <input
                      placeholder="이메일"
                      name="email"
                      type="email"
                      onChange={onEmailHandler}
                    />
                    <input
                      placeholder="비밀번호"
                      name="password1"
                      type="password"
                      onChange={onPasswordHandler}
                    />
                  </div>
                  <div className="next-btn">
                    <Button
                      name="Login"
                      color="#AC5050"
                      size="lg"
                      onClick={onLoginBtn}
                    />
                  </div>
                  {/* social login */}
                  <hr />
                  <a href={KAKAO_AUTH_URL}>
                  <img
                    className="kakao-btn-img"
                    alt="#"
                    src={`${process.env.PUBLIC_URL}/assets/img/kakao-login-btn.png`}
                    // onClick={onKakaoLoginBtn}
                  />
                  </a>
                  {/* <a href="https://kauth.kakao.com/oauth/authorize?client_id=f742e07d1059ec8cd0050f305986a8a4&redirect_uri=http://j7d204.p.ssafy.io:8080/rest/accounts/kakao/callback/&response_type=code"> */}
                  {/* <img className="kakao-btn-img" alt="#" src={`${process.env.PUBLIC_URL}/assets/img/kakao-login-btn.png`}  /> */}
                  {/* </a> */}

                  <img
                    className="google-btn-img"
                    alt="#"
                    src={`${process.env.PUBLIC_URL}/assets/img/google-login-btn.png`}
                    onClick={onGoogleLoginBtn}
                  />
                </div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>
        </LoginInfoBookcontainer>
        {/* </div> */}
      </div>
    </>
  );
}

export default LoginInfoBook;