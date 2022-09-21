import MainNote from "../mainpages/MainNote";
import {useNavigate} from 'react-router-dom'

import './NewDiary.css'
import DiaryEditor from "../../components/editor/DiaryEditor";


const NewDiary =() => {

    return(
    <div className="new">
        <DiaryEditor className="diary-editor"></DiaryEditor>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default NewDiary;