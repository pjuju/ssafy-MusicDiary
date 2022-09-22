import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../../css/loginpages/LoginPageBook.css"
import Button from '../Common/Button'

import styled from 'styled-components'

import { loginApi, kakaoLoginApi, googleLoginApi } from "../../api/userApi";
import axios from 'axios';

const LoginInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`

function LoginInfoBook() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  
  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }

  // 일반 로그인 버튼 클릭 후 
  const onLoginBtn = async () => {
    
    console.log("email:", email)
    console.log("password:", password)

    const loginInfo = {
      email,
      password,
    }

    loginApi(loginInfo)
    .then((res)=>{
      console.log(JSON.stringify(res.data))

      // access 토큰, refresh 토큰, user id 정보 담기
      console.log("accessToken:", res.data.data.token.access_token)
      console.log("refreshToken:",res.data.data.token.refresh_token)
      console.log("id:",res.data.data.id)

      sessionStorage.setItem("accessToken", res.data.data.token.access_token)
      sessionStorage.setItem("refreshToken", res.data.data.token.refresh_token)
      sessionStorage.setItem("user_id", res.data.data.id)
    })
    .catch((err)=>{
      console.log(JSON.stringify(err))
    })
  }

  // 카카오로그인 버튼 클릭 후
  const onKakaoLoginBtn = () => {
    // kakaoLoginApi()

    kakaoLoginApi()
    .then((res)=>{
      console.log(JSON.stringify(res.data))
    })
    .catch((err)=>{
      console.log(JSON.stringify(err.data))
    })
  }

  // 구글 로그인 버튼 클릭 후
  const onGoogleLoginBtn = () => {
    // googleLoginApi()

    googleLoginApi()
    .then((res)=>{
      console.log(JSON.stringify(res.data))
    })
    .catch((err)=>{
      console.log(JSON.stringify(err.data))
    })
  }
  

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
                  name='email'
                  type='email'
                  onChange={onEmailHandler}
                />
                <input 
                  placeholder="비밀번호"
                  name='password1'
                  type='password'
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
                <img className="kakao-btn-img" alt="#" src={`${process.env.PUBLIC_URL}/assets/img/kakao-login-btn.png`} onClick={onKakaoLoginBtn} />
                <img className="google-btn-img" alt="#" src={`${process.env.PUBLIC_URL}/assets/img/google-login-btn.png`} onClick={onGoogleLoginBtn} />
              </div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        </LoginInfoBookcontainer>
      {/* </div> */}
      </div>   
    </>
  )
}

export default LoginInfoBook