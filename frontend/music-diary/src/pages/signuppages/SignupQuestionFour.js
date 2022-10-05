import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";

import axios from "axios";
// redux
import { useSelector } from "react-redux";
import { setDepressedChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

// patch User Info API
import { patchUserInfoApi } from "../../api/userApi";

function SingupQuestionFour() {
  const navigate = useNavigate();

  // store의 state 값 확인중
  const storeNormal = useSelector((state) => {
    return state.user.normalChoice;
  });

  const storeSad = useSelector((state) => {
    return state.user.sadChoice;
  });

  const storeAngry = useSelector((state) => {
    return state.user.angryChoice;
  });

  const storeDepressed = useSelector((state) => {
    return state.user.depressedChoice;
  });

  const storeEmail = useSelector((state) => {
    return state.user.email;
  });

  const storeUserName = useSelector((state) => {
    return state.user.username;
  });

  const storePassword = useSelector((state) => {
    return state.user.password;
  });

  const storePassword2 = useSelector((state) => {
    return state.user.password2;
  });

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveBack = () => {
    navigate("/signup/question/three");
  };

  const onClickSad = () => {
    dispatch(setDepressedChoiceValue(1));
  };

  const onClickHappy = () => {
    dispatch(setDepressedChoiceValue(2));
  };

  const onClickEnergy = () => {
    dispatch(setDepressedChoiceValue(3));
  };

  const onClickNormal = () => {
    dispatch(setDepressedChoiceValue(4));
  };

  // 회원가입 완료
  const onSignUpBtn = () => {
    // username이 null이라면, ( redux store에 username state를 업데이트 한 적 없으면, 초기상태인 'null'임)
    if (storeUserName === "null") {
      // 설문조사한 감정정보 redux store에서 모으기 : normal, sad, angry, depressed,
      console.log("카카오유저임")
      
      const kakaoUserInfo = {
        normal: storeNormal,
        sad: storeSad,
        angry: storeAngry,
        depressed: storeDepressed,
      };

      //  -> user patch api

      const kakaoUser_id = sessionStorage.getItem("user_id"); // Kakao : user.pk

      patchUserInfoApi(kakaoUserInfo, kakaoUser_id)
        .then((res) => {
          console.log("카카오 사용자 가입 완료");
          console.log(res.data);
          alert("카카오 사용자 가입완료!");

          navigate("/login");
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
    ////////////////////////////////////////////////
    // username이 null이 아닐 경우, 일반적인 가입
    else {
      const userInfo = {
        email: storeEmail,
        password: storePassword,
        password2: storePassword2,
        username: storeUserName,
        normal: storeNormal,
        sad: storeSad,
        angry: storeAngry,
        depressed: storeDepressed,
        point: 0,
        image_url: "NULL",
      };

      console.log("회원가입 직전:", JSON.stringify(userInfo));

      axios
        .post("http://j7d204.p.ssafy.io:8080/rest/accounts/signup/", userInfo)
        .then((res) => {
          console.log(JSON.stringify(res.data));

          alert("회원가입 성공! 로그인페이지로 이동합니다");

          navigate("/");
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  const answer = () => {
    if (storeDepressed == "1") {
      return "슬픈";
    }
    if (storeDepressed == "2") {
      return "기쁜";
    }
    if (storeDepressed == "3") {
      return "에너지틱한";
    }
    if (storeDepressed == "4") {
      return "평온한";
    }
  };
  console.log(storeDepressed);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            width: "45vw",
            height: "70vh",
            marginTop: "20vh",
            marginLeft: "30vw",
          }}
        >
          <div style={{ color: "black" }}>
            <h3 style={{ marginTop: "5vh" }}>당신의 음악취향은?</h3>
            <h3>
              4. 나는 우울할 때
              <div
                style={{
                  width: "8vw",
                  height: "5vh",
                  marginLeft: "19vw",
                  borderRadius: "5px",
                }}
              >
                {answer()}
              </div>
              노래를 듣는다
            </h3>

            <div className="first-row">
              <div
                style={{ cursor: "pointer" }}
                className={answer() == "슬픈" ? "selected-box" : "question-box"}
                onClick={onClickSad}
              >
                슬픈
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={answer() == "기쁜" ? "selected-box" : "question-box"}
                onClick={onClickHappy}
              >
                기쁜
              </div>
            </div>

            <div className="second-row">
              <div
                style={{ cursor: "pointer" }}
                className={
                  answer() == "에너지틱한" ? "selected-e-box" : "question-e-box"
                }
                onClick={onClickEnergy}
              >
                에너지틱한
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={
                  answer() == "평온한" ? "selected-n-box" : "question-n-box"
                }
                onClick={onClickNormal}
              >
                평온한
              </div>
            </div>

            <div className="next-btn">
              <button onClick={onMoveBack} className="before-button">
                &#60; 이전
              </button>
              <button
                style={{
                  width: "10vw",
                  height: "5vh",
                  backgroundColor: "#EFEC8B",
                  borderRadius: "10px",
                  border: "none",
                }}
                onClick={onSignUpBtn}
              >
                가입완료
              </button>
            </div>
          </div>
          <img
            src="/assets/img/home.png"
            style={{
              width: "2vw",
              marginTop: "4vh",
              marginLeft: "37vw",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          ></img>
        </div>
      </div>

      <img
        src="/assets/img/signup.png"
        style={{ width: "100vw", height: "100vh" }}
      ></img>
    </>
  );
}

export default SingupQuestionFour;
