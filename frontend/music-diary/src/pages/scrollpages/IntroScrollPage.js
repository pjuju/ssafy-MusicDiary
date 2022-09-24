import React, {useEffect} from 'react'
import './IntroScrollPage.css'

import IntroClosedBook from './IntroClosedBook';

function IntroScrollPage() {

    useEffect(() => {
        function reveal() {
          var reveals = document.querySelectorAll(".reveal");
    
          for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
    
            if (elementTop < windowHeight - elementVisible) {
              reveals[i].classList.add("active");
            } else {
              reveals[i].classList.remove("active");
            }
          }
        }
        window.addEventListener("scroll", reveal);
      });



  return (
    <>
      <div className="scroll-test-wrapper">
        <section>
          <div>
            <h1 className="logo-title-Alsong z-index-2">Alsong</h1>
          </div>
          <div>
            <h1 className="logo-title-Dalsong z-index-2">Dalsong</h1>
          </div>
          <div className="test-closed-book-wrapper z-index-2">
            <IntroClosedBook />
          </div>
        </section>
        {/* 첫 번째 section */}
        <section id="intro-first-section">
          <img
            alt="#"
            src="/assets/img/intro-bg-middle-img.png"
            className="z-index-1"
          >

          </img>

        </section>

        {/* 두 번째 section */}
        <section id="intro-second-section">
          <div className="container reveal">
   
            <div className="text-container">
              
              <div className="left-box">
                <h3>스티커로 나의 일기를 더욱 다채롭게</h3>
                <p>
                당신의 기분이 그 날의 음악으로 
                당신의 기분이 그 날의 음악으로
                당신의 기분이 그 날의 음악
                당신의 기분이 그 날의 음악으로
                당신의 기분이 그 날의 음악으로  
                당신의 기분이 그 날의 음악으 
                </p>
              </div>
             
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 세 번째 section */}
        <section id="intro-third-section">
          <div className="container reveal">
            <h2>Caption 3</h2>
            <div className="text-container">
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 네 번째 section */}
        <section id="intro-fourth-section">
          <div className="container reveal">
            <h2>Caption 4</h2>
            <div className="text-container">
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div className="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div> 
    </>
  )
}

export default IntroScrollPage