import MainPlaylist from "../../mainpages/MainPlaylist"
import './NervousPlaylist.css'
import { emotionMusic, makeLike } from "../../../api/musicApi";
import { useState, useEffect } from "react";
import { FcMusic } from 'react-icons/fc';

const NervousPlaylist = () => {
    const [musicBtn, setMusicBtn] = useState(false);
    const [musics, setMusics] = useState([]);
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
      emotionMusic(2)
      .then((res) => {
          var list = [];
          let video = "";
          for (let i in [...Array(res.data.length).keys()]) {
            let test = {
              id: res.data[i].id,
              like: res.data[i].like,
              name: res.data[i].track_name,
              artist: res.data[i].artist_name,
            }
            video += (res.data[i].videoid + ",");
            list.push(test)
          }
          setYoutube("https://www.youtube.com/embed?playlist="+video.slice(0,-1));
          setMusics(list);
          setMusicBtn(true)
        })
        .catch((e) => {
          console.log("err", e);
        });
      }, [])
    
      const likeMusic = (music_id, i) => {
        const txt = document.getElementById("heart"+i);
        if(txt.innerText === "♥"){
          txt.innerText = "♡";
        }else{
          txt.innerText = "♥";
        }
        makeLike(music_id)
        .then((res) => {
          console.log("성공?");
        })
        .catch((e) => {
          console.log("err", e);
        });
    }
    return(<div className="nervous-playlist">
    <div className="work-area">
        <h1 style={{marginTop:"10vh"}}>당신이 불안했을 때 듣기 좋아하던 음악</h1>
        <h5 style={{fontSize:"18pt"}}>얼마 안 남았다</h5>
        {youtube==="https://www.youtube.com/embed?playlist="?
        (<>
          <div className="no-video">
            <h4>재생할 동영상이 없어요!</h4>
            <p>불안했던 날의 추천 음악에 하트를 눌러 플레이리스트에 추가해보세요.</p>
          </div>
          <div className="no-music">
            <h5>재생할 음악이 없어요!</h5>
          </div>
        </>):
        (<iframe
          className="playlist-iframe"
          src={youtube}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>)}
        <div className="detail-diary-playlist">
      { musicBtn
      ? (
        <>
          {musics.map((ele, i) => {
            var idName = "heart" + i;
            return (
              <>
                
                  <div className="heart-wrapper" >
                  
                    <>
                      <div  
                        // className="fill-heart"
                        id={idName}
                        style={{
                          cursor: "pointer", color:"red"
                        }}
                        onClick={(e) => likeMusic(ele.id, i)}
                      >
                        ♥
                      </div>
                    </>
                    <div className="music-name-wrapper">
                     {ele.name} 
                    </div>
                  </div>

                  <div className="artist-wrapper">
                    <div>{ele.artist} <FcMusic style={{marginTop:"-0.5vh"}} /></div>
                  </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <div>아직 음악없음</div>
        </>
      )}
    </div>
    </div>
    <MainPlaylist className="main-playlist"></MainPlaylist>
</div>)
}

export default NervousPlaylist