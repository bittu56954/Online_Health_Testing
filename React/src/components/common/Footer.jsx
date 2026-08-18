import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Pill, 
  ShieldAlert, 
  Activity, 
  Camera, 
  Bell, 
  ArrowUp, 
  PhoneCall, 
  CheckCircle2, 
  HeartPulse, 
  FileText, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

import bittuKumarImg from '../../assets/bittu_kumar.jpg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-v2">
      {/* Top Banner Callout */}
      <div className="footer-top-banner">
        <div className="footer-banner-content">
          <div className="banner-badge">
            <Sparkles size={16} /> Instant AI Medicine Scanner
          </div>
          <h3>Scan any medicine label to get instant safety & dosage info</h3>
          <p>Protect yourself and your family with verified pharmaceutical data & expiry notifications.</p>
        </div>
        <div className="footer-banner-actions">
          <Link to="/scan" className="footer-cta-btn primary">
            <Camera size={18} /> Scan Medicine Now
          </Link>
          <Link to="/reminders" className="footer-cta-btn secondary">
            <Bell size={18} /> Set Expiry Alert
          </Link>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="footer-main-container">
        {/* Col 1: Brand & Overview */}
        <div className="footer-col brand-col">
          <div className="footer-brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-wrap" style={{ width: 42, height: 42, borderRadius: '12px', overflow: 'hidden', border: '2px solid #0d9488', background: '#0f172a' }}>
              <img src={bittuKumarImg} alt="Smart Medical Care Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <span className="logo-text">Smart Medical Care</span>
          </div>
          <p className="brand-desc">
            Smart Medical Care is a full-stack MERN medicine information scanner powered by optical character recognition (OCR) and verified pharmaceutical registries.
          </p>

          <div className="brand-trust-badges">
            <div className="trust-pill">
              <ShieldCheck size={14} color="#38bdf8" /> 100% Free Access
            </div>
            <div className="trust-pill">
              <HeartPulse size={14} color="#10b981" /> Verified Data
            </div>
            <div className="trust-pill">
              <CheckCircle2 size={14} color="#06b6d4" /> HIPAA Compliant
            </div>
          </div>
        </div>

        {/* Col 2: Quick Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-header">
            <Activity size={18} color="#38bdf8" /> Quick Navigation
          </h4>
          <ul className="footer-nav-list">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
            <li><Link to="/scan">Scan Medicine Label</Link></li>
            <li><Link to="/my-medicines">My Cabinet / Inventory</Link></li>
            <li><Link to="/history">Scan Activity Log</Link></li>
            <li><Link to="/reminders">Dose & Expiry Alerts</Link></li>
            <li><Link to="/about">About Smart Medical Care</Link></li>
          </ul>
        </div>

        {/* Col 3: Medical Services & Features */}
        <div className="footer-col">
          <h4 className="footer-col-header">
            <FileText size={18} color="#10b981" /> Features & Tools
          </h4>
          <ul className="footer-nav-list">
            <li><Link to="/scan">OCR Label Recognition</Link></li>
            <li><Link to="/my-medicines">Pill & Tablet Analyzer</Link></li>
            <li><Link to="/reminders">Smart Expiry Reminders</Link></li>
            <li><Link to="/contact">Emergency Support</Link></li>
            <li><Link to="/admin">Admin Management</Link></li>
            <li><Link to="/profile">Security Settings</Link></li>
          </ul>
        </div>

        {/* Col 4: Medical Safety Disclaimer & Emergency Hotline */}
        <div className="footer-col">
          <h4 className="footer-col-header">
            <ShieldAlert size={18} color="#f43f5e" /> Safety Disclaimer
          </h4>
          <div className="footer-disclaimer-card">
            <p>
              This platform provides informational OCR search results. Always consult a licensed doctor or pharmacist for medical treatment.
            </p>
            <div className="emergency-contact">
              <PhoneCall size={14} color="#f43f5e" />
              <span>Emergency Health Line: <strong>108 / 112</strong></span>
            </div>
          </div>

          <div className="system-status-indicator">
            <span className="status-dot"></span>
            <span>All AI Scanner Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} <strong>Smart Medical Care</strong>. All rights reserved. Built with MERN Stack.
          </p>

          <div className="footer-legal-links">
            <Link to="/about">Terms</Link>
            <span className="dot">•</span>
            <Link to="/about">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link to="/contact">Contact Support</Link>
          </div>

          <button onClick={scrollToTop} className="scroll-to-top-btn" title="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
