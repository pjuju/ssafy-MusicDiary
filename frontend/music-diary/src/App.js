import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import ClosedIntroPage from './components/intro/ClosedBook'
import MainCalender from './pages/mainpages/MainCalender';
import MainMonth from './pages/mainpages/MainMonth';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClosedIntroPage />} />
          <Route path="/calender" element={<MainCalender />} />
          <Route path="/diarylist" element={<MainMonth />} />
            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
