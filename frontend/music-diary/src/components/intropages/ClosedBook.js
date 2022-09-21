import React from "react";
import { useNavigate } from "react-router-dom";

import "../../css/intropages/ClosedBook.css";
import Button from '../Common/Button'
import { CgArrowLongRight } from 'react-icons/cg'

import styled from 'styled-components'

const ClosedBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`



function ClosedBook() {

  const navigate = useNavigate()

  const moveLoginPage = () =>{
    navigate('/login')
  }

  const moveSignupPage = () =>{
    navigate('/signup/info')
  }

  const moveIntroPage = () => {
    navigate('/intro/open/one')
  }

  return (
    <>
    <div className="closed-book-wrapper">
      {/* <div id="closedcontainer"> */}
      <div className="big-text-logo-alsong">
        Alsong
      </div>
      <div className="big-text-logo-dalsong">
        Dalsong
      </div>
      <ClosedBookcontainer>
        <div className="closed-book">
          <div className="first paper">
            <div className="page front contents">
              <div className="intro">
                <h2>DIARY</h2>
                <h1>알쏭달쏭</h1>
                <Button 
                  name="Login"
                  color="#AC5050"
                  size="lg"
                  onClick={moveLoginPage}
                />
                
                <div className="signup-btn-wrapper">
                  Don't You have an account?
                  <Button 
                    name="SignUp"
                    color="#AC5050"
                    size="sm"
                    onClick={moveSignupPage}
                  />
                </div>
                <div className="move-intro-btn-wrapper">
                알쏭달쏭이 처음이라면?  
                <CgArrowLongRight className="antd-CgArrowLongRight" onClick={moveIntroPage} />
              </div>
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
