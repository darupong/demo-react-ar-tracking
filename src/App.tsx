import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/landing';
import MultiTrackingPage from './pages/multitracking';
import SingleTrackingPage from './pages/singletracking';
import SingleTrackingVideoPage from './pages/singletracking-video';

/** App router: / = landing; /singletracking, /singletracking-video, /multitracking = AR pages. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/singletracking" element={<SingleTrackingPage />} />
        <Route path="/singletracking-video" element={<SingleTrackingVideoPage />} />
        <Route path="/multitracking" element={<MultiTrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
