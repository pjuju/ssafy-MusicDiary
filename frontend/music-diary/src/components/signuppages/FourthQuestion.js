import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
import Button from "../Common/Button";

import styled from "styled-components";

// redux
import { useSelector } from "react-redux";
import { setDepressedChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

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
  const onRegsiterBtn = () => {};

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
                  <h3>store확인용도 : {storeNormal}, {storeSad}, {storeAngry}, {storeDepressed}</h3>

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
                    <Button name="가입완료!" color="#AC5050" size="lg" />
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
