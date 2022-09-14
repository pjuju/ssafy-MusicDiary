import React from "react";

import "./ClosedBook.css";
import Button from '../Common/Button'

function ClosedBook() {
  return (
    <>
    {/* <div class="v-center"></div> */}
      <div id="closedcontainer">
        <div class="book">
          <div class="first paper">
            <div class="page front contents">
              <div class="intro">
                <h2>DIARY</h2>
                {/* <img alt = "#" src="./assets/service-title-tag.png" /> */}
                <h1>알쏭달쏭</h1>
                <Button 
                  name="로그인"
                  color="#AC5050"
                  size="lg"
                />
                <div>Don't have an account? SignUp</div>
              </div>
            </div>
          </div>
          <div class="shadow"></div>
        </div>
      </div>
    </>
  );
}

export default ClosedBook;
