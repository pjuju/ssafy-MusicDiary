import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css"
// import Button from '../Common/Button'

import styled from 'styled-components'
import { signUpApi } from "../../api/userApi";

import axios from 'axios'
// redux store 
import { useSelector } from "react-redux";
import { setUserEmail, setUserPassword, setUserPassword2, setUserName} from '../../store/store'
import { useDispatch } from "react-redux";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`

function SignupInfo() {
  

  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  
  const onUsernameHandler = (e) => {
    setUsername(e.target.value)
  }
  
  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  
  const onPassword2Handler = (e) => {
    setPassword2(e.target.value)
  }

  // 다음 설문조사로 이동
  const moveQuestionOne = () => {

    dispatch(setUserEmail(email))
    dispatch(setUserName(username))
    dispatch(setUserPassword(password))
    dispatch(setUserPassword2(password2))
    
    navigate('/signup/question/one')
  }

  const onSignUpBtn = () => {
    const userInfo = {
      email, 
      password,
      password2,
      username,
      sad:1,
      angry:1,
      depressed:1,
      normal:1,
      point:1,
      image_url:"null"
    }

    axios
    .post("http://j7d204.p.ssafy.io:8080/rest/accounts/signup/", userInfo)
    .then((res)=>{
      console.log(JSON.stringify(res.data))

      alert("회원가입 성공! 로그인페이지로 이동합니다")

      navigate('/')
    })
    .catch((err)=>{
      console.log(err.data)
    })
  }

  return (
    <>  
      <div style={{position:'relative'}}>
          <div style={{position:'absolute',width:'45vw',height:'70vh',marginTop:'20vh',marginLeft:'30vw'}}>
            
            <div style={{marginTop:'5vh'}}>
              <h5 style={{color:'#3D3D3D',marginLeft:'-14vw'}}>이메일 주소</h5>
              <input 
              placeholder="Email address"
              name='email'
              type='email'
              onChange={onEmailHandler}
              style={{width:'20vw',borderRadius:'5px',height:'5vh',fontSize:'1.1vw',border:'1px solid lightgrey',marginTop:'-1vh'}}
            />
            </div>

            <div>
              <h5 style={{color:'#3D3D3D',marginLeft:'-16vw',marginTop:'2vh'}}>닉네임</h5>
              <input 
                placeholder="Nickname"
                name='username'
                type='text'
                onChange={onUsernameHandler}
                style={{width:'20vw',borderRadius:'5px',height:'5vh',border:'1px solid lightgrey',marginTop:"-1vh",fontSize:'1.1vw'}}
              />
            </div>

          <div>
            <h5 style={{color:'#3D3D3D',marginLeft:'-15.5vw',marginTop:'2vh'}}>비밀번호</h5>
            <input 
              placeholder="Password"
              name='password'
              type='password'
              onChange={onPasswordHandler}
              style={{width:'20vw',borderRadius:'5px',height:'5vh',border:'1px solid lightgrey',marginTop:"-1vh",fontSize:'1.1vw'}}
            />
          </div>

          <div>

          </div>
            <h5 style={{color:'#3D3D3D',marginLeft:'-13vw',marginTop:'2vh'}}>비밀번호 확인</h5>
            <input 
              placeholder="Confirm Password"
              name='password2'
              type='password'
              onChange={onPassword2Handler}
              style={{width:'20vw',borderRadius:'5px',height:'5vh',border:'1px solid lightgrey',marginTop:"-1vh",fontSize:'1.1vw'}}
            />
          </div>


          <button 
            onClick={moveQuestionOne}
            style={{position:'absolute',marginTop:'70vh',width:"20vw",height:'5vh',border:"none",marginLeft:'-7.5vw'
          ,backgroundColor:'#C0D2C1',borderRadius:"5px",fontSize:'1.3vw'}}
          >다음으로 넘어가기</button>
          </div>

        <img src="/assets/img/signup.png" style={{width:'100vw',height:'100vh'}}></img>
    </>
  )
}

export default SignupInfo