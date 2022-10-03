import '../../css/intropages/MainScroll.css'
// import MainBook from './MainBook';

const MainScroll = () => {
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


    return(<div className="main-scroll">
  {/* <MainBook></MainBook> */}
    <section className="first">
        <h1 className='first-title'>ALSONG DALSONG</h1>
    </section>

<section className='second'>
  <div class="container reveal">
    <h2 style={{marginTop:'-5vh'}}>오늘 나의 감정을 추천해드립니다</h2>
    <div class="text-container" style={{marginLeft:'0vw'}}>

      <div class="text-box">
        <div>
            <img src="/assets/img/angry_emoji.png" style={{width:'7vw'}} className="animate__animated animate__bounceIn"></img>
            <img src="/assets/img/happy_emoji.png" style={{width:'7vw'}} className="animate__animated animate__bounceIn"></img>
            <img src="/assets/img/anxious_emoji.png" style={{width:'7vw'}} className="animate__animated animate__bounceIn"></img>
        </div>
        <div>
            <img src="/assets/img/depressed_emoji.png" style={{width:'7vw'}} className="animate__animated animate__bounceIn"></img>
            <img src="/assets/img/sad_emoji.png" style={{width:'7vw'}} className="animate__animated animate__bounceIn"></img>
            <img src="/assets/img/normal_emoji.png" style={{width:'7vw'}}className="animate__animated animate__bounceIn"></img>
        </div>
        <h3>6가지의 귀여운 감정 이모티콘</h3>
        <h5>
          다양한 감정으로 나의 일기를 표현해보세요.
          <br></br>
        하루의 감정을 직접 선택하거나
        일기 내용을 기반으로 감정을 추천해줄 수도 있습니다.
        </h5>
      </div>

      <div class="text-box">
        <h3>나만의 감정 캘린더</h3>
        <img src="/assets/img/calender.jpg" style={{width:'30vw'}}></img>
        <p>
          이달의 감정들을 한 눈에 확인해보세요.
        </p>
      </div>

    </div>
  </div>
</section>

<section>
  <div class="container reveal">
    <h2>Caption</h2>
    <div class="text-container">
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container reveal">
    <h2>Caption</h2>
    <div class="text-container">
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
      <div class="text-box">
        <h3>Section Text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>)
}

export default MainScroll