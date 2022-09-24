import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
import Button from "../Common/Button";

import styled from "styled-components";

// redux
import { useSelector } from "react-redux";
import { setSadChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function SecondQuestion() {
  const [secondAnswer, setSecondAnswer] = useState();
  const [emotionAnswer, setEmotionAnswer] = useState()
  const [happy, setHappy] = useState(false)
  const [sad, setSad] = useState(false)
  const [normal, setNormal] = useState(false)
  const [energytic, setEnergytic] = useState(false)

  const navigate = useNavigate();

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveQuestionTwo = () => {
    navigate("/signup/question/three");
  };

  const onMoveBack = () => {
    navigate("/signup/question/one");
  };

    // 슬픈 / 기쁜 / 에너지틱 / 평온한 노래 선택 -> dispatch
    const onClickSad = () => {
      setSad(!sad)
      if(!sad){
        setSecondAnswer("슬픈")
        dispatch(setSadChoiceValue(1))
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickHappy = () => {
      setHappy(!happy)
      if(!happy){
        setSecondAnswer("기쁜")
        dispatch(setSadChoiceValue(2))
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickEnergy = () => {
      setEnergytic(!energytic)
      if(!energytic){
        setSecondAnswer("에너지틱한")
        dispatch(setSadChoiceValue(3))
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickNormal = () => {
      setNormal(!normal)
      if(!normal){
        setSecondAnswer("평온한")
        dispatch(setSadChoiceValue(4))
      }else{
        setSecondAnswer("   ")
      }
    }

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
                  <h2>2. 나는 슬플 때 "{secondAnswer}" 노래를 듣는다 </h2>
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
                      name="다음->"
                      color="#AC5050"
                      size="lg"
                      onClick={onMoveQuestionTwo}
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

export default SecondQuestion;
