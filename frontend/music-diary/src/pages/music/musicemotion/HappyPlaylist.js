import MainPlaylist from "../../mainpages/MainPlaylist";
import './HappyPlaylist.css';
import { emotionMusic, makeLike } from "../../../api/musicApi";
import { useState } from "react";

const HappyPlaylist = () => {

    const [musicBtn, setMusicBtn] = useState(false);
    const [musics, setMusics] = useState([]);
    const [youtube, setYoutube] = useState("");

    emotionMusic(1)
    .then((res) => {
        var list = [];
        let video = "";
        for (let i in [...Array(res.data.length).keys()]) {
          let test = {
            id: res.data[i].id,
            like: res.data[i].like,
            name: res.data[i].track_name,
            artist: res.data[i].artist_name,
            // heart: heart,
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
    return(<div className="happy-playlist">
        <div className="work-area">
            <h2>당신이 행복했을 때 들었던 음악</h2>
            <div style={{display:"flex", marginLeft:"3vw"}}>
              <iframe className="youtube" width="560" height="315" src={youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style={{width:"90vh", height:"50vh", marginTop:"5vh"}}></iframe>
              <div style={{marginLeft:"2vw", marginTop:'5.5vh'}}>
          { musicBtn
          ? (
            <>
            {
              musics.map((ele, i)=>{
                var idName = "heart"+i;
                return (
                  <>
                    <div style={{display:"flex", marginTop:"-1.3vh"}}>
                      <div className="list">
                      <div id={idName} style={{zIndex:"9999999999999999999999", cursor: "pointer", color:"red"}} onClick = {(e)=>likeMusic(ele.id, i)}>♥</div>
                      <p>{ele.name}</p><br></br>
                      <p>{ele.artist}</p>
                      </div>
                    </div>
                  </>
                )
              })
            }
            </>
          )
          : (
            <>
            <div>아직 음악없음</div>
            </>
          )
        }
        </div>
            </div>
        </div>
        <MainPlaylist className="main-playlist"></MainPlaylist>
    </div>)
}

export default HappyPlaylist