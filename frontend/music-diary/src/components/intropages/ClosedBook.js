import React from "react";
import { useNavigate } from "react-router-dom";

import "../../css/intropages/ClosedBook.css";
import Button from '../Common/Button'

import styled from 'styled-components'

const ClosedBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`



function ClosedBook() {

  const navigate = useNavigate()

  const moveOpenIntroPage = () =>{
    navigate('/intro/open/one')
  }

  const moveSignupPage = () =>{
    navigate('/signup/info')
  }

  return (
    <>
    <div className="closed-book-wrapper">
      {/* <div id="closedcontainer"> */}
      <ClosedBookcontainer>
        <div className="closed-book">
          <div className="first paper">
            <div className="page front contents">
              <div className="intro">
                <h2>DIARY</h2>
                <h1>알쏭달쏭</h1>
                <Button 
                  name="로그인"
                  color="#AC5050"
                  size="lg"
                  onClick={moveOpenIntroPage}
                />
                <Button 
                  name="회원가입"
                  color="#AC5050"
                  size="lg"
                  onClick={moveSignupPage}
                />
                <div>Don't You have an account? SignUp</div>
              </div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
        </ClosedBookcontainer>
      {/* </div> */}
      </div>
    </>
  );
}

export default ClosedBook;
