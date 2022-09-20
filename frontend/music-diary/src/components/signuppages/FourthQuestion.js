import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css"
import Button from "../Common/Button";

import styled from "styled-components";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function FourthQuestion() {
    const [fourthAnswer, setFourthAnswer] = useState()
    const [emotionAnswer, setEmotionAnswer] = useState()
    const [dance, setDance] = useState(false)
    const [sad, setSad] = useState(false)
    const [normal, setNormal] = useState(false)
    const [energytic, setEnergytic] = useState(false)

    const navigate = useNavigate()

    const onClickDance = () => {
      setDance(!dance)
      if(!dance){
        setFourthAnswer("신나는")
      }else{
        setFourthAnswer("   ")
      }
    }

    const onClickSad = () => {
      setSad(!sad)
      if(!sad){
        setFourthAnswer("슬픈")
      }else{
        setFourthAnswer("   ")
      }
    }

    const onClickNormal = () => {
      setNormal(!normal)
      if(!normal){
        setFourthAnswer("평온한")
      }else{
        setFourthAnswer("   ")
      }
    }

    const onClickEnergy = () => {
      setEnergytic(!energytic)
      if(!energytic){
        setFourthAnswer("에너지틱한")
      }else{
        setFourthAnswer("   ")
      }
    }

    // 회원가입 완료
    const onRegsiterBtn = () => {
      
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
                  <h2>나는 평소에 "{fourthAnswer}" 노래를 듣는다 </h2>
                  
                  <div className="first-row">
                    <div className={dance ? "selected-box" : "question-box"} onClick={onClickDance} >
                      신나는 노래
                    </div>
                    <div className={sad ? "selected-box" : "question-box"} onClick={onClickSad} >
                      슬픈노래
                    </div>
                  </div>
                  <div className="second-row">
                    <div className={normal ? "selected-box" : "question-box"} onClick={onClickNormal}>
                      평온한 노래
                    </div>
                    <div className={energytic ? "selected-box" : "question-box"} onClick={onClickEnergy}>
                      에너지틱한 노래
                    </div>
                    </div>
                    <div className="next-btn">
                     <Button name="가입완료!" color="#AC5050" size="lg"  />
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