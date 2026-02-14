import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/common/Home';
import About from './pages/common/About';
import Careers from './pages/common/Careers';
import Services from './pages/common/Services';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import UserProfile from './pages/common/UserProfile';
import Contact from './pages/common/Contact';
import Support from './pages/common/Support';
import EndUserDashboard from './pages/user/EndUserDashboard';
import VerifierDashboard from './pages/organization/VerifierDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard/user" element={<EndUserDashboard />} />
          <Route path="/dashboard/verifier" element={<VerifierDashboard />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
