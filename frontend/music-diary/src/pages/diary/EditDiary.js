import MainNote from '../mainpages/MainNote'
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import DiaryEditor from "../../components/editor/DiaryEditor";
import './EditDiary.css'

const EditDiary =() =>{
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
  
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
      }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
        const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
        );

        if (targetDiary) {
            setOriginData(targetDiary);
        } else {
            alert("없는 일기입니다.");
            navigate("/", { replace: true });
        }
        }
    }, [id, diaryList]); 

    console.log(originData)

    return(<div className="edit-diary">
        <div className='edit'>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default EditDiary