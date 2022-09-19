import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import Button from "../Common/Button";

import styled from "styled-components";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function FirstQuestion() {

    const navigate = useNavigate()

    const onMoveQuestionTwo = () =>{
        navigate('/signup/question/two')
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
                  <div className="signup-form-wrapper">
                    <div className="next-btn">
                     <Button name="다음->" color="#AC5050" size="lg" onClick={onMoveQuestionTwo} />
                    </div>
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
