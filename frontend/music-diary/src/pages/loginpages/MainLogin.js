
import LoginInfoBook from '../../components/loginpages/LoginInfoBook'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi } from 'gapi-script';

import { loginApi, kakaoLoginApi, googleLoginApi } from "../../api/userApi";
import axios from "axios";
import '../../css/loginpages/MainLogin.css'


// redux store
import {

  setUserEmail,
  setUserName
} from "../../store/store";
import { useDispatch } from "react-redux";

function MainLogin() {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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


    axios
      .post("http://j7d204.p.ssafy.io:8080/rest/accounts/login/", loginInfo)
      .then((res) => {
        console.log("로그인한 유저 정보:", JSON.stringify(res.data));



        
        // access 토큰, refresh 토큰, user id 정보 담기
          sessionStorage.setItem("accessToken", res.data.data.token.access_token)
          sessionStorage.setItem("refreshToken", res.data.data.token.refresh_token)
          sessionStorage.setItem("user_id", res.data.data.id)
          dispatch(setUserEmail(res.data.data.email))
          dispatch(setUserName(res.data.data.username))

        navigate("/calender");
      })
      .catch((err) => {
        console.log(err.data);
      });


  };



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
    <div style={{position:'relative'}} className="main-login">
        <div style={{position:'absolute',width:'45vw',height:'70vh'
      ,marginTop:'20vh',marginLeft:'30vw'}}>
          <div style={{marginTop:'5vh'}}>
            <h5 style={{color:'#3D3D3D',marginLeft:'-14vw'}}>이메일 주소</h5>
            <input
              className="login-form-input"
              placeholder="Email address"
              name="email"
              type="email"
              onChange={onEmailHandler}
              style={{width:'20vw',borderRadius:'5px',height:'6vh',fontSize:'1.3vw',border:'none',marginTop:'-1vh'}}
              />
          </div>

          <div >
            <h5 style={{color:'#3D3D3D',marginLeft:'-15.5vw',marginTop:'2vh'}}>비밀번호</h5>
            <input
            className="login-form-input"
              placeholder="Password"
              name="password1"
              type="password"
              onChange={onPasswordHandler}
              style={{width:'20vw',borderRadius:'5px',height:'5vh',border:'none',marginTop:"-1vh"}}
            />
          </div>

<div style={{marginTop:'7vh', marginLeft:''}} >
          <button onClick={onLoginBtn}
          style={{width:'15vw',height:'7vh',backgroundColor:'#C0D2C1',borderRadius:'15px',border:'none',fontSize:'1.3vw'}}
          className="login">로그인</button>
          <br></br>
          <hr style={{color:'black',width:'21vw',marginLeft:'12vw'}}></hr>
          <br></br>
          <a href={KAKAO_AUTH_URL}>
            <img alt="#" src="/assets/img/kakao-login-btn.png" style={{width:'15vw',marginTop:'-2vh',marginLeft:'0vw'}} />
          </a>
          <br></br>
          <img alt="#" src="/assets/img/google-login-btn.png" style={{width:'17vw',marginTop:'1vh'}} />
</div>
          
          
        <h5 style={{color:'darkgrey',marginLeft:'34vw',marginTop:'5vh',cursor:'pointer'}}
        onClick={()=>{navigate('/')}}>돌아가기</h5>
          </div>

        <img src="/assets/img/login.png"
        style={{width:'100vw',height:'100vh'}} ></img>
    </div>
  )
}

export default MainLogin