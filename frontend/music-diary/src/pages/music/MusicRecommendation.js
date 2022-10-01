import MainNote from "../mainpages/MainNote"
import './MusicRecommendation.css'

import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

const MusicRecommendation = () => {

    const storeUserName = useSelector((state)=>{
        return state.user.username
      })

    return(
    <>
    <div className="music-recommendation">
        <div className="recommendation">
            <h2 className="recommedation-title">{storeUserName}님이 좋아하실 것 같아요!</h2>
            
            <div className="recommendation-content">
                <div>
                    content-test
                </div>

            </div>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>
    </>
    )
}

export default MusicRecommendation