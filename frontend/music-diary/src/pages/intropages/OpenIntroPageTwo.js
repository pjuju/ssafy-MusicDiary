import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/intropages/OpenIntroPage.css";

import Button from '../../components/Common/Button'

function OpenIntroPageTwo() {
  const navigate = useNavigate()

  const moveIntroPageThree = () =>{
    navigate('/intro/open/three')
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

              <div className="intro-ment-1">달력에서는 하루하루의 감정을</div>
              <div className="hidden-area-right-2"></div>
            </article>
            <footer>
              <ol id="page-numbers">
                <li>1</li>
                <li>2</li>
              </ol>
            </footer>
          </section>
        </div>
        <div>
        <Button name="다음 페이지" color="#AC5050" size="lg" onClick={moveIntroPageThree} />
      </div>
      </div>


    </>
  );
}

export default OpenIntroPageTwo;
