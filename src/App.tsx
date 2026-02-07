import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/landing';
import MultiTrackingPage from './pages/multitracking';
import SingleTrackingPage from './pages/singletracking';

/** App router: / = landing, /singletracking, /multitracking = AR pages. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/singletracking" element={<SingleTrackingPage />} />
        <Route path="/multitracking" element={<MultiTrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
