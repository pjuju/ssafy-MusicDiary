import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
import Button from "../Common/Button";
import styled from "styled-components";

import axios from "axios";

// redux
import { useSelector } from "react-redux";
import { setDepressedChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

// patch User Info API
import { patchUserInfoApi } from "../../api/userApi";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function FourthQuestion() {
  const [fourthAnswer, setFourthAnswer] = useState();
  const [emotionAnswer, setEmotionAnswer] = useState();
  const [happy, setHappy] = useState(false);
  const [sad, setSad] = useState(false);
  const [normal, setNormal] = useState(false);
  const [energytic, setEnergytic] = useState(false);

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

  const storePassword = useSelector((state) => {
    return state.user.password;
  });

  const storePassword2 = useSelector((state) => {
    return state.user.password2;
  });

  const storeUserName = useSelector((state) => {
    return state.user.username;
  });

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveBack = () => {
    navigate("/signup/question/three");
  };

  const onClickSad = () => {
    setSad(!sad);
    if (!sad) {
      setFourthAnswer("슬픈");
      dispatch(setDepressedChoiceValue(1));
    } else {
      setFourthAnswer("   ");
    }
  };

  const onClickHappy = () => {
    setHappy(!happy);
    if (!happy) {
      setFourthAnswer("기쁜");
      dispatch(setDepressedChoiceValue(2));
    } else {
      setFourthAnswer("   ");
    }
  };

  const onClickEnergy = () => {
    setEnergytic(!energytic);
    if (!energytic) {
      setFourthAnswer("에너지틱한");
      dispatch(setDepressedChoiceValue(3));
    } else {
      setFourthAnswer("   ");
    }
  };

  const onClickNormal = () => {
    setNormal(!normal);
    if (!normal) {
      setFourthAnswer("평온한");
      dispatch(setDepressedChoiceValue(4));
    } else {
      setFourthAnswer("   ");
    }
  };

  // 회원가입 완료
  const onSignUpBtn = () => {
    // username이 null이라면, ( redux store에 username state를 업데이트 한 적 없으면, 초기상태인 'null'임)
    if (storeUserName === "null") {
      // 설문조사한 감정정보 redux store에서 모으기 : normal, sad, angry, depressed,
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

  return (
    <>
      <div className="signup-info-wrapper">
        {/* <div id="closedcontainer"> */}
        <SignupInfoBookcontainer>
          <div className="closed-book">
            <div className="first paper">
              <div className="page front contents">
                <div className="intro">
                  <h1>당신의 음악취향은?</h1>
                  <h2>4. 나는 우울할 때 "{fourthAnswer}" 노래를 듣는다 </h2>
                  <h3>
                    store확인용도 : {storeNormal}, {storeSad}, {storeAngry},{" "}
                    {storeDepressed}
                  </h3>

                  <div className="first-row">
                    <div
                      className={sad ? "selected-box" : "question-box"}
                      onClick={onClickSad}
                    >
                      슬픈
                    </div>
                    <div
                      className={happy ? "selected-box" : "question-box"}
                      onClick={onClickHappy}
                    >
                      기쁜
                    </div>
                  </div>

                  <div className="second-row">
                    <div
                      className={energytic ? "selected-box" : "question-box"}
                      onClick={onClickEnergy}
                    >
                      에너지틱한
                    </div>
                    <div
                      className={normal ? "selected-box" : "question-box"}
                      onClick={onClickNormal}
                    >
                      평온한
                    </div>
                  </div>

                  <div className="next-btn">
                    <Button
                      name="<- 이전"
                      color="#AC5050"
                      size="lg"
                      onClick={onMoveBack}
                    />
                    <Button
                      name="가입완료!"
                      color="#AC5050"
                      size="lg"
                      onClick={onSignUpBtn}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>
        </SignupInfoBookcontainer>
        {/* </div> */}
      </div>
    </>
  );
}

export default FourthQuestion;