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
  SignupInfo
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
