import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useEffect, useReducer, useRef } from "react";

import {
  ClosedIntroPage,
  OpenIntroPage,
  OpenIntroPageTwo,
  OpenIntroPageThree,
  OpenIntroPageFour,
  PaginationTest,
  Bookmarks,
  MainCalender,
  MainMonth,
  SignupInfo, 
  SignupQuestionOne,
  SignupQuestionTwo,
  SignupQuestionThree,
  SignupQuestionFour,
  MainLogin
} from './pages/index'

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, title,context, emotion,image) => {
    dispatch({
      type:'CREATE',
      data:{
        id:dataId.current,
        date : new Date(date).getTime(),
        title,
        context,
        emotion,
        image
      }
    })
    dataId.current += 1
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type:'REMOVE',targetId})
  }

  // EDIT
  const onEdit = (targetId, date, context, emotion) => {
    dispatch({
      type:'EDIT',
      data:{
        id : targetId,
        date : new Date(date).getTime(),
        context,
        emotion
      }
    })
  }
 
  return (
    <div className='App'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClosedIntroPage />} />
          <Route path="/calender" element={<MainCalender />} />
          <Route path="/diarylist" element={<MainMonth />} />
          <Route path="/intro/open/one" element={<OpenIntroPage />} />
          <Route path="/intro/open/two" element={<OpenIntroPageTwo />} />
          <Route path="/intro/open/three" element={<OpenIntroPageThree />} />
          <Route path="/intro/open/four" element={<OpenIntroPageFour />} />
          <Route path="/bookmarks" element={<Bookmarks />} /> 
          <Route path="/signup/info" element={<SignupInfo />} />
          <Route path="/signup/question/one" element={<SignupQuestionOne />} />
          <Route path="/signup/question/two" element={<SignupQuestionTwo />} />
          <Route path="/signup/question/three" element={<SignupQuestionThree />} />
          <Route path="/signup/question/four" element={<SignupQuestionFour />} />
          <Route path="/login" element={<MainLogin /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
