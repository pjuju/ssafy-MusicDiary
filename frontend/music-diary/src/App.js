import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

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

function App() {
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
