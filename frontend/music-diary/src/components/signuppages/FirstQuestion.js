import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
import Button from "../Common/Button";

import styled from "styled-components";

// redux 확인중
import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function FirstQuestion() {
  const [firstAnswer, setFirstAnswer] = useState();
  const [emotionAnswer, setEmotionAnswer] = useState();
  const [happy, setHappy] = useState(false);
  const [sad, setSad] = useState(false);
  const [normal, setNormal] = useState(false);
  const [energytic, setEnergytic] = useState(false);

  const navigate = useNavigate();

  // store의 state 값 확인중
  const storeEmail = useSelector((state) => {
    return state.user.normalChoice;
  });

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveQuestionTwo = () => {
    navigate("/signup/question/two");
  };

  // 슬픈 / 기쁜 / 에너지틱 / 평온한 노래 선택 -> dispatch
  const onClickSad = () => {
    setSad(!sad);
    if (!sad) {
      setFirstAnswer("슬픈");
      dispatch(setNormalChoiceValue(1));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickHappy = () => {
    setHappy(!happy);
    if (!happy) {
      setFirstAnswer("기쁜");
      dispatch(setNormalChoiceValue(2));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickEnergy = () => {
    setEnergytic(!energytic);
    if (!energytic) {
      setFirstAnswer("에너지틱한");
      dispatch(setNormalChoiceValue(3));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickNormal = () => {
    setNormal(!normal);
    if (!normal) {
      setFirstAnswer("평온한");
      dispatch(setNormalChoiceValue(4));
    } else {
      setFirstAnswer("   ");
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
                  <h1>당신의 음악취향은? {storeEmail} </h1>
                  <h2>
                    1. 나는 평소에 "<div className="answer">{firstAnswer}</div>"
                    노래를 듣는다{" "}
                  </h2>

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

export default FirstQuestion;
