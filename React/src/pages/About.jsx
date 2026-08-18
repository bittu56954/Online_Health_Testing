import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  ShieldAlert,
  ShieldCheck,
  ScanLine,
  Database,
  Lock,
  HeartPulse,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  BookOpen,
  Award,
  Users,
  Building2,
  Clock,
  Cpu,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  HelpCircle,
  Stethoscope,
  Globe,
  Terminal,
  Zap,
  Server,
  Key,
  Flame,
  Check,
  Mail,
  PhoneCall
} from 'lucide-react';
import Footer from '../components/common/Footer';
import FounderLeadershipSection from '../components/common/FounderLeadershipSection';
import ProjectUserGuideSection from '../components/common/ProjectUserGuideSection';

const About = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "How does Smart Medical Care recognize medicine text from a photo?",
      a: "Smart Medical Care utilizes advanced Optical Character Recognition (OCR) algorithms to parse text strings from photos uploaded by the user. The extracted text is then matched against an indexed database of verified generic and brand pharmaceutical formulations."
    },
    {
      q: "Can Smart Medical Care tell me if a medicine is safe for my condition?",
      a: "No. Smart Medical Care provides educational reference details regarding generic indications, standard side effects, and manufacturer storage instructions. It does not assess individual medical compatibility or issue prescriptions."
    },
    {
      q: "Is my personal scan history private and secure?",
      a: "Yes. All scan logs, saved medicines, and personal patient profile notes are stored securely using MongoDB encryption and protected by JWT authentication tokens accessible only to your account."
    },
    {
      q: "What should I do if a medicine cannot be identified?",
      a: "If the OCR scanner encounters low lighting or damaged packaging text, you can select one of the verified sample presets or consult a pharmacist to manually enter the medicine details into your cabinet."
    }
  ];

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* 1. HERO HEADER BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 55%, #0284c7 100%)', color: '#ffffff', padding: '5rem 1.5rem 6rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.45rem 1.25rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 700, color: '#5eead4', marginBottom: '1.5rem' }}>
            <Sparkles size={18} /> Empowering Global Pharmaceutical Literacy & Safety
          </div>
          <h1 style={{ fontSize: 'calc(2.4rem + 1.2vw)', fontWeight: 800, margin: 0, letterSpacing: '-1px', lineHeight: 1.15, color: '#ffffff' }}>
            About Smart Medical Care Platform
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#e0f2fe', marginTop: '1rem', lineHeight: 1.7, maxWidth: '850px', margin: '1rem auto 0 auto' }}>
            Smart Medical Care is an advanced MERN-stack pharmaceutical recognition, expiration monitoring, and patient safety portal. We bridge the gap between complex prescription packaging and clear, actionable digital health intelligence.
          </p>

          {/* Stat Badges Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginTop: '3.5rem', textAlign: 'left' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#5eead4' }}>100</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pre-Doctor Checkers</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>99.2%</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>OCR Accuracy</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a7f3d0' }}>10 Domains</div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clinical Pre-Checks</div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY DISCLAIMER */}
      <section style={{ maxWidth: '1200px', margin: '-2.5rem auto 3rem auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--danger-bg)', border: '2px solid var(--danger-border)', borderRadius: '24px', padding: '2rem 2.5rem', boxShadow: 'var(--shadow-md)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={42} color="#ef4444" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--danger-text)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Mandatory Regulatory & Clinical Safety Disclaimer
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--danger-text)', marginTop: '0.6rem', lineHeight: 1.7 }}>
              <strong>Smart Medical Care is strictly designed as an informational reference tool for home medicine cabinet management.</strong> It is not a substitute for clinical judgment, professional medical diagnosis, doctor consultations, or official pharmacy dispenser instructions. Always verify scanned drug names, strengths, active components, and expiration dates directly on physical medicine packaging. If you suspect an adverse drug reaction or medical emergency, consult a licensed doctor or emergency healthcare provider immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER & TECHNICAL ARCHITECT SECTION (BITTU KUMAR) */}
      <FounderLeadershipSection />

      {/* MAIN BODY CONTAINER */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '3rem auto 0 auto', padding: '0 1.5rem 5rem 1.5rem' }}>
        
        {/* MISSION & VISION */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '1px' }}>Foundational Philosophy</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Our Mission & Health Safety Vision
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--info-bg)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <HeartPulse size={30} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem' }}>The Healthcare Problem</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Patients often visit doctors without knowing which red flag symptoms to report, how their daily medicines interact, or what exact clinical questions to ask. Unintentional drug-drug interactions and uncommunicated side effects impair patient outcomes.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--success-bg)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem' }}>The 100 Pre-Doctor Features Solution</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Smart Medical Care provides 100 evidence-based interactive checkers across 10 clinical domains. Patients enter their symptoms, vitals, or pill schedules to receive doctor-grade triage analysis, red flag warnings, lab test readiness guides, and printable consultation reports.
              </p>
            </div>

          </div>
        </section>

        {/* 100 PRE-DOCTOR FEATURES SHOWCASE SECTION */}
        <section style={{ marginBottom: '4.5rem', background: 'var(--bg-surface)', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Architecture</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              100 Pre-Doctor Health & Disease Domains
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0.5rem auto 0 auto', fontSize: '1rem' }}>
              Our 100 pre-consultation features are structured into 10 clinical domains, aligned with ACC/AHA, ADA, GINA, and FDA medical practice guidelines:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#ef4444', marginBottom: '0.3rem', fontSize: '1.05rem' }}>1. Symptom & Triage Checkers</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features assessing chest pain, dyspnea, thunderclap headache, RLQ abdominal pain, sepsis, and vertigo.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.3rem', fontSize: '1.05rem' }}>2. Drug & Medicine Safety</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features checking polypharmacy, renal eGFR dosing, hepatotoxicity, NSAID ulcer risks, and QT prolongation.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#059669', marginBottom: '0.3rem', fontSize: '1.05rem' }}>3. Chronic Disease Pre-Checks</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features evaluating hypertension trends, HbA1c control, asthma GINA scores, thyroid TSH timing, and gout flares.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#d97706', marginBottom: '0.3rem', fontSize: '1.05rem' }}>4. Specialized Organ Systems</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features covering ASCVD 10-year risk, melanoma ABCDE mole alerts, IBD bowel changes, and glaucoma red eye.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#2563eb', marginBottom: '0.3rem', fontSize: '1.05rem' }}>5. Lab & Diagnostic Readiness</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features guiding fasting sugar protocols, LFT interpretation, CBC differentials, and Biotin thyroid interference.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', marginBottom: '0.3rem', fontSize: '1.05rem' }}>6. Food & Drug Interactions</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features screening Grapefruit CYP3A4 inhibition, Metronidazole alcohol flushing, and Calcium antibiotic chelation.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#ec4899', marginBottom: '0.3rem', fontSize: '1.05rem' }}>7. Age & Special Population</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 features covering Geriatric Beers criteria, pediatric weight-based dosing, pregnancy teratogens, and preeclampsia.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#dc2626', marginBottom: '0.3rem', fontSize: '1.05rem' }}>8. Emergency Red Flags</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 critical checkers for FAST Stroke alerts, ACS Heart Attack signs, Anaphylaxis, Sepsis qSOFA, and DVT/PE Wells score.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#0d9488', marginBottom: '0.3rem', fontSize: '1.05rem' }}>9. Doctor Consultation Prep</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 tools including clinical question generators, symptom timeline logs, allergy summary cards, and second opinion checklists.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, color: '#ca8a04', marginBottom: '0.3rem', fontSize: '1.05rem' }}>10. Side Effects & Compatibility</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>10 checkers for Lisinopril dry cough, Statin myalgia, Amlodipine ankle swelling, and diuretic hypokalemia.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/pre-doctor-checker"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)'
              }}
            >
              Launch Interactive 100 Pre-Doctor Suite <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* DETAILED PROJECT & USER GUIDE SECTION */}
        <ProjectUserGuideSection />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>Support & Information</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--text-main)'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={20} color="#0284c7" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>

                {openFaq === index && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
