import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ScanLine,
  ShieldCheck,
  Zap,
  Bell,
  History,
  Pill,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Database,
  Star,
  Users,
  Clock,
  HeartPulse,
  ChevronRight,
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import Footer from '../components/common/Footer';
import FounderLeadershipSection from '../components/common/FounderLeadershipSection';
import ProjectUserGuideSection from '../components/common/ProjectUserGuideSection';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #0369a1 100%)', color: '#ffffff', padding: '4.5rem 1.5rem 5.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.45rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, color: '#5eead4', marginBottom: '1.5rem' }}>
              <Sparkles size={16} /> Intelligent MERN Medicine Identification Platform
            </div>
            <h1 style={{ fontSize: 'calc(2.3rem + 1.2vw)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '1.25rem', color: '#ffffff' }}>
              Instant & Reliable <br />
              <span style={{ background: 'linear-gradient(90deg, #2dd4bf, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Medicine Identification
              </span>
            </h1>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#e2e8f0', marginBottom: '2.25rem', maxWidth: '580px' }}>
              Scan any medicine label or strip using OCR intelligence. Instantly extract generic names, dosage, expiry dates, common uses, side effects, and critical safety warnings.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                to={isAuthenticated ? "/scan" : "/login"}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#0d9488', color: '#ffffff', fontWeight: 800, padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 25px rgba(13, 148, 136, 0.4)', fontSize: '1rem' }}
              >
                <ScanLine size={22} /> Scan Medicine Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', fontWeight: 600, padding: '1rem 1.75rem', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.25)', fontSize: '1rem' }}
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          {/* Interactive Preview Scanner Box */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Pill size={26} color="#ffffff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>Amoxicillin 500mg</h3>
                    <span style={{ fontSize: '0.8rem', color: '#5eead4', fontWeight: 600 }}>Verified Antibiotic • Batch: AMX-8921</span>
                  </div>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
                  OCR Verified
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.9rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Manufacturing Date</span>
                  <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>10/2024</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.9rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Expiry Status</span>
                  <strong style={{ fontSize: '1rem', color: '#4ade80' }}>10/2026 (Safe)</strong>
                </div>
              </div>

              <div style={{ background: 'rgba(13, 148, 136, 0.2)', border: '1px solid rgba(20, 184, 166, 0.3)', padding: '1rem', borderRadius: '12px', fontSize: '0.88rem', color: '#ccfbf1' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2dd4bf', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={18} /> Primary Indication
                </strong>
                Prescribed for bacterial respiratory infections, sinusitis, bronchitis, and skin soft-tissue infections.
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SAFETY DISCLAIMER BANNER */}
      <section style={{ background: 'var(--danger-bg)', borderBottom: '1px solid var(--danger-border)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--danger-text)' }}>
          <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#ef4444' }} />
          <div style={{ fontSize: '0.92rem', lineHeight: 1.55 }}>
            <strong style={{ fontSize: '0.98rem', display: 'block', marginBottom: '0.15rem' }}>
              Important Medical Safety & Compliance Notice:
            </strong>
            Smart Medical Care is designed strictly for educational reference and household medicine organization. It does not provide medical diagnosis, prescription advice, or direct treatment plans. Always verify scanned results with certified healthcare professionals or official packaging labels before consuming any drug.
          </div>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#0d9488', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Comprehensive Health Management
          </span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
            Why Rely on Smart Medical Care?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.5rem auto 0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Combining state-of-the-art optical character recognition (OCR) with structured MongoDB data models and JWT token security.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--info-bg)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ScanLine size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Optical Image OCR Engine</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Upload photos of medicine strips, bottles, or blister packs. Automated OCR parses text to find verified matches in pharmaceutical databases.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--success-bg)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Verified Medical Database</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Access generic drug names, strength details, side effects, storage guidelines, and precautions sourced from verified clinical guidelines.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--warning-bg)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Bell size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Expiry Alert System</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Never consume expired drugs. Set custom expiry reminders and dosage schedules directly linked to your saved home medicine cabinet.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--bg-main)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <History size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Digital Scan History</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Keep a complete digital archive of every medicine scanned over time with timestamped logs, image thumbnails, and doctor notes.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(147, 51, 234, 0.15)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Full Stack Patient Privacy</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Protected with JWT auth tokens and bcrypt password hashing. Your personal health details stay strictly private to your user account.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--success-bg)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <HeartPulse size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>Family Caregiver Hub</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
              Organize medicines for multiple family members or elderly parents with medical notes, emergency contacts, and blood group tags.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ background: 'var(--bg-surface)', padding: '5rem 1.5rem', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#0284c7', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              Simple 3-Step Process
            </span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              How Smart Medical Care Works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#0284c7', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.3)' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Upload or Snap Photo</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Take a clear picture of the medicine strip, bottle label, or packaging and upload it directly to the scanner.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#0d9488', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(13, 148, 136, 0.3)' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>OCR Text Extraction</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Our engine extracts visible text (name, batch, strength, expiry) and matches verified pharmaceutical data.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Save & Set Reminders</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                View detailed information, save to "My Medicines", and receive automated alerts before the item expires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE RECOGNIZED MEDICINES SHOWCASE */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#0d9488', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Verified Formulations
          </span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
            Indexed Medicine Examples
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Our repository indexes thousands of essential medications across multiple dosage forms.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: '18px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', background: 'var(--info-bg)', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>Antibiotic</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.75rem 0 0.25rem 0' }}>Paracetamol 650mg</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>Analgesic & Antipyretic used for fever reduction and mild body pains.</p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: '18px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488', background: 'var(--success-bg)', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>Gastric Care</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.75rem 0 0.25rem 0' }}>Pantoprazole 40mg</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>Proton pump inhibitor reducing stomach acid secretion for acid reflux relief.</p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: '18px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', background: 'var(--warning-bg)', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>Anti-Allergy</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.75rem 0 0.25rem 0' }}>Cetirizine 10mg</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>Antihistamine providing relief from allergic rhinitis, sneezing, and hives.</p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: '18px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9333ea', background: 'rgba(147, 51, 234, 0.15)', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>Antidiabetic</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.75rem 0 0.25rem 0' }}>Metformin 500mg</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>Biguanide agent improving insulin sensitivity in Type-2 Diabetes control.</p>
          </div>
        </div>
      </section>

      {/* FOUNDER & LEADERSHIP SECTION (BITTU KUMAR) */}
      <FounderLeadershipSection />

      {/* COMPLETE PROJECT ARCHITECTURE & USER GUIDE */}
      <ProjectUserGuideSection />

      {/* CTA SECTION */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0d9488, #0284c7)', color: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px', color: '#ffffff' }}>
            Ready to Organise Your Home Pharmacy?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#e0f2fe', marginBottom: '2.25rem', lineHeight: 1.6 }}>
            Join thousands of users keeping track of their medicine cabinet safely with Smart Medical Care.
          </p>
          <Link
            to={isAuthenticated ? "/scan" : "/register"}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#ffffff', color: '#0f172a', fontWeight: 800, padding: '1.1rem 2.4rem', borderRadius: '12px', textDecoration: 'none', fontSize: '1.05rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
          >
            <ScanLine size={22} color="#0d9488" /> Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
