import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Leadership } from './pages/Leadership';
import { Expertise } from './pages/Expertise';
import { ExpertiseDetail } from './pages/ExpertiseDetail';
import { Journal } from './pages/Journal';
import { ArticleDetail } from './pages/ArticleDetail';
import { GlobalPresence } from './pages/GlobalPresence';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminArticles } from './pages/admin/Articles';
import { AdminLeadership } from './pages/admin/Leadership';
import { AdminInquiries } from './pages/admin/Inquiries';
import { AdminSettings } from './pages/admin/Settings';
import { AdminLogin } from './pages/admin/Login';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/expertise/:id" element={<ExpertiseDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<ArticleDetail />} />
            <Route path="/global-presence" element={<GlobalPresence />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/leadership" element={<AdminLeadership />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
