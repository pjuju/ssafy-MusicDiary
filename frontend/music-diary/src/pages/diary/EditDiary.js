import MainNote from '../mainpages/MainNote'
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import DiaryEditor from "../../components/editor/DiaryEditor";
import { writeDiaryListApi, modifyDiary,getMonthDiary } from '../../api/diaryApi';
import './EditDiary.css'

const EditDiary =() =>{
    // api 연결
    const [noticeMonthData, setNoticeMonthData] = useState([])

    useEffect(()=> {
        getMonthDiary(new Date().getMonth() + 1, new Date().getFullYear())
      .then((res)=> {
        setNoticeMonthData(res.data)
        console.log('과!연',res.data)
        // console.log('이달의 전체 일기 일단 모으기',noticeMonthData)
      })
      .catch((e)=> {
        console.log('err',e)
      });
    },[])

    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
  
    const diaryList = useContext(DiaryStateContext);
    const targetDiary = noticeMonthData.find(
        (it) => parseInt(it.id) === parseInt(id)
    );
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
      }, []);

    useEffect(() => {
        if (noticeMonthData.length >= 1) {
            if (targetDiary) {
                console.log(targetDiary)
            } else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
        }
    }
}, [id, targetDiary]); 

    return(<div className="edit-diary">
        <div className='edit'>
            {targetDiary && <DiaryEditor isEdit={true} originData={targetDiary} />}
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default EditDiary