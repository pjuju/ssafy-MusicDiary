import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function GoogleAuth() {

  // const scope = "https://www.googleapis.com/auth/userinfo.email"
  const GOOGLE_CLIENT_ID = "421385414738-hlk6fqfkbur8k03nuh1ftjftukoo8umd.apps.googleusercontent.com"
  // const GOOGLE_SECRET_KEY = "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"
  const GOOGLE_CALLBACK_URI = 'http://j7d204.p.ssafy.io/google/login/callback/'
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${GOOGLE_CALLBACK_URI}&scope=${scope}`
    
    // 인가코드 요청받기를 통해 얻은 인가코드
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

  const getToken = async () => {
    // 토큰 요청에 있어서 Parameter
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_CALLBACK_URI,
      code: code,
      // client_secret: CLIENT_SECRET, // 필수는 아닌 Parameter
    });
      await axios.post(
        "http://j7d204.p.ssafy.io:8080/rest/accounts/google/callback2/", payload
      )
      .then((res) => {
        console.log(JSON.stringify(res.data));
        navigate("/calender");

        // 이메일을 입력 -> 이메일로 회원정보 GET -> 
        // -> 회원정보에서 감정 라벨링상태 판단 
        // => 안되어있으면 ->, 바로 설문이동
        // 되어있으면 -> 바로 로그인,,,
        // 

        
        // access 토큰, refresh 토큰, user id 정보 담기
          sessionStorage.setItem("accessToken", res.data.data.token.access_token)
          sessionStorage.setItem("refreshToken", res.data.data.token.refresh_token)
          // sessionStorage.setItem("user_id", res.data.data.pk)

      })
      .catch((err) => {
        console.log(err.data);
      });

      
      
      // // Kakao Javascript SDK 초기화
      // if(!window.Kakao.isInitialized()){
      //   window.Kakao.init(REST_API_KEY);
      //   console.log(window.Kakao.isInitialized()) 
      // }
      // // access token 설정
      // window.Kakao.Auth.setAccessToken(res.data.access_token);
     };

  
  useEffect(() => {
    getToken();
  }, []);


  return (
    <div>
   
    </div>
  )
}

export default GoogleAuth