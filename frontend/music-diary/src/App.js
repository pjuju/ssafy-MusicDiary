import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import ClosedIntroPage from './components/intro/ClosedBook'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClosedIntroPage />} />
            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
