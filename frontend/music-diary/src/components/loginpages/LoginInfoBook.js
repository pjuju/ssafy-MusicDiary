import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';

import '../../css/loginpages/LoginInfoBook.css'

import "../../css/loginpages/LoginPageBook.css";
import Button from "../Common/Button";
import styled from "styled-components";
import { loginApi, kakaoLoginApi, googleLoginApi } from "../../api/userApi";
import axios from "axios";

// redux store
import { useSelector } from "react-redux";
import {
  setNormalChoiceValue,
  setSadChoiceValue,
  setAngryChoiceValue,
  setDepressedChoiceValue,
  setUserEmail
} from "../../store/store";
import { useDispatch } from "react-redux";


import $ from "jquery";
import Vara from "vara";

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
  const dispatch = useDispatch();

  // const test = useSelector((state) => {
  //   return state.user;
  // });

  // useEffect(() => {
  //   var winWidth = $(window).width();
  //   var ratio = winWidth / 1920;
  //   var fontSize = {
  //     small: 12,
  //     medium: 14,
  //   };
  //   var played = [0, 0, 0];
  //   var vara = [];
  //   var bodyFontSize = Math.max(16 * ratio, 10);
  //   var posX = Math.max(80 * ratio, 30);
  //   $("body").css("font-size", bodyFontSize + "px");
  //   fontSize.small = Math.max(fontSize.small * ratio, 7);
  //   fontSize.medium = Math.max(fontSize.medium * ratio, 10);
  //   vara[0] = new Vara(
  //     "#vara-container",
  //     "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",

  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     }
  //   );
  //   vara[1] = new Vara(
  //     "#vara-container2",
  //     "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     }
  //   );
  //   vara[2] = new Vara(
  //     "#vara-container3",
  //     "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",

  //     {
  //       strokeWidth: 2,
  //       fontSize: fontSize.medium,
  //       autoAnimation: false,
  //     }
  //   );
  //   vara[2].ready(function () {
  //     $(".front:not(.last)").click(function () {
  //       var ix = $(this).parent(".paper").index();
  //       $(".book").addClass("open");
  //       $(this).parent(".paper").addClass("open");
  //       if (!played[ix]) {
  //         vara[ix].playAll();
  //         vara[ix].animationEnd(function (i, o) {
  //           played[ix] = 1;
  //           if (i == "link") {
  //             var group = o.container;
  //             var rect = vara[2].createNode("rect", {
  //               x: 0,
  //               y: 0,
  //               width: o.container.getBoundingClientRect().width,
  //               height: o.container.getBoundingClientRect().height,
  //               fill: "transparent",
  //             });
  //             group.appendChild(rect);
  //             $(rect).css("cursor", "pointer");
  //             $(rect).click(function () {
  //               console.log(true);
  //               document.querySelector("#link").click();
  //             });
  //           }
  //         });
  //       }
  //     });
  //     $(".back").click(function () {
  //       if ($(this).parent(".paper").index() == 0)
  //         $(".book").removeClass("open");
  //       $(this).parent(".paper").removeClass("open");
  //     });
  //   });
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
        console.log("로그인한 유저 정보:", JSON.stringify(res.data));

        // 이메일을 입력 -> 이메일로 회원정보 GET -> 
        // -> 회원정보에서 감정 라벨링상태 판단 
        // => 안되어있으면 ->, 바로 설문이동
        // 되어있으면 -> 바로 로그인,,,
        // 

        
        // access 토큰, refresh 토큰, user id 정보 담기
          sessionStorage.setItem("accessToken", res.data.data.token.access_token)
          sessionStorage.setItem("refreshToken", res.data.data.token.refresh_token)
          sessionStorage.setItem("user_id", res.data.data.id)
          dispatch(setUserEmail(res.data.data.email))
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
  const REDIRECT_URI = "http://j7d204.p.ssafy.io/kakao/login/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;   

  const scope = "https://www.googleapis.com/auth/userinfo.email"
  const GOOGLE_CLIENT_ID = "421385414738-hlk6fqfkbur8k03nuh1ftjftukoo8umd.apps.googleusercontent.com"
  // const GOOGLE_SECRET_KEY = "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"
  const GOOGLE_CALLBACK_URI = 'http://j7d204.p.ssafy.io/google/login/callback/'
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_CALLBACK_URI}&scope=${scope}`

  return (
    <>
    <div className="login-closed-book">
      <div class="v-center"></div>
      <div id="container">
        <div class="book">
          <div class="first paper">
            <div class="page front contents">
              <div class="intro">
                <h2></h2>
                <h1>Login</h1>
                <div className="login-form-wrapper">
                    <input
                      className="login-form-input"
                      placeholder="이메일"
                      name="email"
                      type="email"
                      onChange={onEmailHandler}
                    />
                    <input
                    className="login-form-input"
                      placeholder="비밀번호"
                      name="password1"
                      type="password"
                      onChange={onPasswordHandler}
                    />
                  </div>
                <Button name="Login" color="#AC5050" size="lg" onClick={onLoginBtn}/>
              </div>
            </div>

            <div class="page back"></div>

          </div>
          <div class="second paper">
            <div class="page front contents">
              {/* contents 출력 부분 */}
              <div id="vara-container">
                <div>당신의 하루는 어땠나요</div>
              </div>

            </div>
            <div class="page back"></div>
          </div>
          <div class="third paper">
            <div class="page front contents">
              <div id="vara-container2"></div>
            </div>
            <div class="page back"></div>
          </div>
          <div class="fourth paper">
            <div class="page last front contents">
              <div id="vara-container3"></div>
            </div>
            <div class="page back"></div>
          </div>
          <div class="side"></div>
          <div class="bottom"></div>
          <div class="shadow"></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default LoginInfoBook;