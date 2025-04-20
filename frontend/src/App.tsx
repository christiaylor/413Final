// import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import Fingerprint from './Fingerprint';
import ProjectsPage from './pages/ProjectsPage';
// import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
// import AdminProjectsPage from './pages/AdminEntertainersPage';
import LandingPage from './pages/LandingPage';
import EntertainersPage from './pages/EntertainersPage';
import DetailPage from './pages/DetailPage';
// import AdminEntertainersPage from './pages/AdminEntertainersPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/entertainers" element={<EntertainersPage />} />
            <Route path="/:projectId" element={<DetailPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
