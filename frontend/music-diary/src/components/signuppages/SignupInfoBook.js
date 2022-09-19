import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css"
import Button from '../Common/Button'

import styled from 'styled-components'

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`

function SignupInfoBook() {
  const [email, setEmail] = useState()
  const [nickname, setNickname] = useState()
  const [password1, setPassword1] = useState()
  const [password2, setPassword2] = useState()

  const navigate = useNavigate()

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  
  const onNicknameHandler = (e) => {
    setNickname(e.target.value)
  }
  
  const onPassword1Handler = (e) => {
    setPassword1(e.target.value)
  }
  
  const onPassword2Handler = (e) => {
    setPassword2(e.target.value)
  }

  const moveQuestionOne = () => {
    navigate('/signup/question/one')

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
                <h1>회원가입</h1>
                <div className="signup-form-wrapper">
                <input 
                  placeholder="이메일"
                  name='email'
                  type='email'
                  onChange={onEmailHandler}
                />
                <input 
                  placeholder="닉네임"
                  name='nickname'
                  type='text'
                  onChange={onNicknameHandler}
                />
                <input 
                  placeholder="비밀번호"
                  name='password1'
                  type='password'
                  onChange={onPassword1Handler}
                />
                <input 
                  placeholder="비밀번호 확인"
                  name='password2'
                  type='password'
                  onChange={onPassword2Handler}
                />
                </div>
                <div className="next-btn">
                <Button 
                  name="다음->"
                  color="#AC5050"
                  size="lg"
                  onClick={moveQuestionOne}
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
  )
}

export default SignupInfoBook