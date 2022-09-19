import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/intropages/OpenIntroPage.css";

import Button from '../../components/Common/Button'

function OpenIntroPageTwo() {

  const navigate = useNavigate()

  const moveIntroPageFour = () =>{
    navigate('/intro/open/four')
  }


  return (
    <>
      <div id="wrapper">
        <div id="container">
          <section className="open-book">
            <header>
              <h1>D204</h1>
              <h6>Project</h6>
            </header>
            <article>
              <h2 className="chapter-title">알쏭달쏭</h2>
              <div className="hidden-area-left-1"></div>
              <dl>
                <dt>
                  <strong>&bull;o&bull; 알쏭달쏭 사용법</strong>
                </dt>
              </dl>

              <div className="hidden-area-left-2"></div>

              <div className="hidden-area-right-1"></div>

              <div className="intro-ment-1">일기장에는 소중한 하루를 담아주세요</div>
              <div className="hidden-area-right-2"></div>
            </article>
            <footer>
              <ol id="page-numbers">
                <li>5</li>
                <li>6</li>
              </ol>
            </footer>
          </section>
        </div>
        <div>
      <Button name="다음 페이지" color="#AC5050" size="lg" onClick={moveIntroPageFour}/>
      </div>
      </div>


    </>
  );
}

export default OpenIntroPageTwo;
