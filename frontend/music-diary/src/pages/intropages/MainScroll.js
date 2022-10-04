import { useNavigate } from 'react-router-dom';
import '../../css/intropages/MainScroll.css'
import IntroClosedBook from '../scrollpages/IntroClosedBook.js'

import Lottie from 'lottie-react';
import MusicPlaying from '../../store/lottie/music-playing.json'

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


    const navigate = useNavigate()

    return(<div className="main-scroll">

    <section className="first">
      <>
        <h1 style={{fontSize:'7vw',marginTop:'-50vh',color:'black',marginLeft:'-0vw'}}>ALSONG</h1>
        <h1 style={{fontSize:'7vw',marginTop:'-30vh',color:'black',marginLeft:'-15vw'}}>DALSONG</h1>
      </>
      <>
        {/* <h5 style={{color:'black',marginLeft:'-20vw'}}>다이어리의 표지를 넘겨보세요</h5> */}
      </>
        <button class="btn-hover color-1" 
        onClick={()=>{navigate('/login')}}>로그인</button>
        <button onClick={()=> {navigate('/signup/info')}}>회원가입</button>
        <IntroClosedBook style={{marginTop:'-10vh'}}></IntroClosedBook>
    </section>

<section className='second'>
  <div class="container reveal">
    <div class="text-container" style={{marginLeft:'8vw'}}>
      <div class="text-box">
        <div style={{marginTop:'10vh'}}>
            <img src="/assets/img/angry_emoji.png" style={{width:'6vw'}} className="angry"></img>
            <img src="/assets/img/happy_emoji.png" style={{width:'6vw'}} className="happy"></img>
            <img src="/assets/img/anxious_emoji.png" style={{width:'6vw'}} className="anxious"></img>
        </div>
        <div>
            <img src="/assets/img/depressed_emoji.png" style={{width:'6vw'}} className="depressed"></img>
            <img src="/assets/img/sad_emoji.png" style={{width:'6vw'}} className="sad"></img>
            <img src="/assets/img/normal_emoji.png" style={{width:'6vw'}}className="normal"></img>
        </div>
        <h2 style={{marginTop:'0vh'}}>오늘 당신의 감정을 <br></br>추천해드립니다</h2>
        <h5>
          6가지 귀여운 이모티콘과 함께 다양한 감정으로 나의 일기를 표현해보세요
          <br></br>
        하루의 감정을 직접 선택하거나 <br></br>
        일기 내용을 기반으로 알쏭달쏭이 감정을 추천해줄 수도 있습니다.
        </h5>
      </div>

      <div class="text-box" style={{backgroundColor:'#ffffff',borderRadius:'15px',boxShadow:'10px 10px #dcdca2'}}>
        <h3>나만의 감정 캘린더</h3>
        <h5>
          이달의 감정들을 한 눈에 확인해보세요.
        </h5>
        <img src="/assets/img/calender.jpg" style={{width:'30vw'}}></img>
      </div>

    </div>
  </div>
</section>

<section className="third">
  <div class="container reveal">
  <Lottie animationData={MusicPlaying} className="lottie-music-playing" />
    <h1 style={{marginLeft:'5vw'}}>오늘의 기분에 따른 음악도 <br></br>추천해드립니다</h1>  
    <div class="text-container">
      <div class="text-box">
        <div style={{marginLeft:'3vw'}}>
          <img src="/assets/img/playlist.jpg" 
          style={{width:'25vw',backgroundColor:'#ffffff',borderRadius:'15px',boxShadow:'10px 10px #dcdca2'}}></img>
          <h5 style={{marginTop:'3vh'}}>감정에 따라 다른 플레이리스트가 준비되어 있습니다 <br></br>
          순간순간마다 다른 음악을 즐겨보세요</h5>
        </div>
      </div>
      <div class="text-box" style={{marginLeft:'2vw'}}>
        <h5>
          매일 같은 노래만 듣는게 <br></br>어느 순간 지겨워진 당신
          <br></br>
          그런 당신을 위해 준비했습니다
        </h5>
      </div>
      <div class="text-box">
      <img src="/assets/img/pli.jpg" 
          style={{width:'25vw',backgroundColor:'#ffffff',borderRadius:'15px',boxShadow:'10px 10px #dcdca2'}}></img>
      <h5 style={{marginTop:'3vh'}}>최신 음악부터 올드팝까지, <br></br>
      좋아하는 음악만 선택하여 들어보세요</h5>
      </div>
    </div>
  </div>
</section>

<section className='fourth'>
  <div class="container reveal">
    <h2>스티커로 당신의 일기를 더욱 다채롭게</h2>
    <div class="text-container" style={{marginLeft:'7vw'}}>
      <div class="text-box">
        <img src="/assets/img/sticker.png" 
        style={{width:'30vw',backgroundColor:'#ffffff',borderRadius:'15px',boxShadow:'10px 10px #dcdca2'}}></img>
        <h5 style={{marginTop:'3vh'}}>
          다양한 스티커로 일기를 취향대로 꾸며보세요
        </h5>
      </div>
      <div class="text-box">
        <img src="/assets/img/stickerstore.png" 
        style={{width:'30vw',backgroundColor:'#ffffff',borderRadius:'15px',boxShadow:'10px 10px #dcdca2'}}></img>
        <h5 style={{marginTop:'3vh'}}>
          스티커 상점에서 마음에 드는 스티커를 구입할 수도 있습니다
        </h5>
      </div>

    </div>
  </div>
</section>
    </div>)
}

export default MainScroll