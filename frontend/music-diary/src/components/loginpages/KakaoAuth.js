import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function KakaoAuth() {

    const REST_API_KEY = "f742e07d1059ec8cd0050f305986a8a4"
    const REDIRECT_URI = "http://j7d204.p.ssafy.io/kakao/login/callback";
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;   
    // const CLIENT_SECRET = "upBn6BfX6M7ycktPVn59NpwPBqccaIhU"
    
    // 인가코드 요청받기를 통해 얻은 인가코드
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();

  const getToken = async () => {
    // 토큰 요청에 있어서 Parameter
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      // client_secret: CLIENT_SECRET, // 필수는 아닌 Parameter
    });
      await axios.post(
        "http://j7d204.p.ssafy.io:8080/rest/accounts/kakao/callback2/", payload
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

export default KakaoAuth
