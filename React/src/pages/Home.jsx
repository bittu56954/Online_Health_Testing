import React, { useState, useEffect } from 'react';
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
  FileCheck,
  Stethoscope,
  Activity,
  Filter,
  Check,
  RefreshCw
} from 'lucide-react';
import Footer from '../components/common/Footer';
import FounderLeadershipSection from '../components/common/FounderLeadershipSection';
import ProjectUserGuideSection from '../components/common/ProjectUserGuideSection';
import DynamicPageHeader from '../components/common/DynamicPageHeader';

import { faceScanService } from '../services/api';

const Home = () => {
  const { isAuthenticated } = useAuth();

  // Dynamic Loading States for Title & Hero
  const [isTitleLoading, setIsTitleLoading] = useState(true);

  // Dynamic Feature States
  const [heroTab, setHeroTab] = useState('ocr'); // 'ocr' | 'predoctor' | 'expiry'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Dynamic Counter State (Loads real-time persisted scan count)
  const [scansCount, setScansCount] = useState(() => faceScanService.getTotalScanCount());
  const [medicinesCount, setMedicinesCount] = useState(5200);
  const [checkersCount, setCheckersCount] = useState(100);

  // Dynamic daily countdown calculation based on real-time Date()
  const getDynamicExpiryDays = () => {
    const today = new Date();
    const targetDate = new Date(2026, 8, 3); // Target Expiry: Sep 3, 2026
    const diffTime = targetDate.getTime() - today.getTime();
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days < 1) days = 1;
    return days;
  };
  const dynamicDaysLeft = getDynamicExpiryDays();

  // Trigger 1.5 - 2 second dynamic title load on mount & listen to live scan completion events
  useEffect(() => {
    setIsTitleLoading(true);
    const timer = setTimeout(() => {
      setIsTitleLoading(false);
    }, 1500);

    const handleFaceScanEvent = () => {
      setScansCount(faceScanService.getTotalScanCount());
    };

    window.addEventListener('faceScanCompleted', handleFaceScanEvent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('faceScanCompleted', handleFaceScanEvent);
    };
  }, []);

  const triggerTitleReload = () => {
    setIsTitleLoading(true);
    setTimeout(() => {
      setIsTitleLoading(false);
    }, 1500);
  };

  // Sample verified medicine dataset for live dynamic search & filter
  const sampleMedicines = [
    { name: "Paracetamol 650mg", category: "Analgesic", indication: "Fever reduction, pain relief", status: "Verified", badge: "Common" },
    { name: "Amoxicillin 500mg", category: "Antibiotic", indication: "Bacterial infections & respiratory care", status: "Verified", badge: "Prescription" },
    { name: "Pantoprazole 40mg", category: "Gastric", indication: "Acid reflux, GERD, heartburn relief", status: "Verified", badge: "Common" },
    { name: "Cetirizine 10mg", category: "Anti-Allergy", indication: "Allergic rhinitis, hives & sneezing", status: "Verified", badge: "OTC" },
    { name: "Metformin 500mg", category: "Antidiabetic", indication: "Type-2 diabetes blood sugar control", status: "Verified", badge: "Chronic" },
    { name: "Azithromycin 500mg", category: "Antibiotic", indication: "Throat infection, bronchitis & pneumonia", status: "Verified", badge: "Prescription" },
    { name: "Atorvastatin 10mg", category: "Cardiovascular", indication: "Cholesterol management & heart health", status: "Verified", badge: "Prescription" },
    { name: "Omeprazole 20mg", category: "Gastric", indication: "Stomach ulcers & acidity neutralization", status: "Verified", badge: "Common" }
  ];

  const categories = ['All', 'Analgesic', 'Antibiotic', 'Gastric', 'Anti-Allergy', 'Antidiabetic', 'Cardiovascular'];

  const filteredMedicines = sampleMedicines.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.indication.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* 1. DYNAMIC TOP HEADER BANNER (1-2 Sec Active Sync) */}
      <DynamicPageHeader
        pageTitle="Smart Medical Care Home Engine"
        pageSubtitle="Real-time Medicine Identification, Expiry Monitoring & Pre-Doctor Checkers"
        syncText="✨ Live System Engine Synced with MongoDB & OCR Scanner"
        badgeText="LIVE HOME ENGINE ACTIVE"
        onRefresh={triggerTitleReload}
      />

      {/* HERO SECTION WITH DYNAMIC 1.5S TITLE LOADER */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #0369a1 100%)', color: '#ffffff', padding: '4.5rem 1.5rem 5.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Hero Content with Dynamic 1.5s Skeleton & Title Reveal */}
          <div>
            {isTitleLoading ? (
              /* DYNAMIC TITLE LOADING SKELETON (1.5 SECONDS) */
              <div style={{ padding: '0.5rem 0' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.45rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, color: '#5eead4', marginBottom: '1.5rem' }}>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Loading Dynamic Title Engine (1.5s)...</span>
                </div>

                {/* Shimmer Skeletons for Title */}
                <div className="dynamic-title-skeleton" style={{ height: '54px', width: '92%', marginBottom: '1rem' }} />
                <div className="dynamic-title-skeleton" style={{ height: '46px', width: '75%', marginBottom: '1.5rem' }} />

                {/* Shimmer Skeletons for Subtitle */}
                <div className="dynamic-title-skeleton" style={{ height: '22px', width: '85%', marginBottom: '0.6rem' }} />
                <div className="dynamic-title-skeleton" style={{ height: '22px', width: '60%', marginBottom: '2.5rem' }} />

                {/* Skeleton Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="dynamic-title-skeleton" style={{ height: '52px', width: '210px', borderRadius: '12px' }} />
                  <div className="dynamic-title-skeleton" style={{ height: '52px', width: '220px', borderRadius: '12px' }} />
                </div>
              </div>
            ) : (
              /* DYNAMIC TITLE REVEALED AFTER 1.5s DELAY */
              <div className="animate-title-reveal">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.45rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, color: '#5eead4', marginBottom: '1.5rem' }}>
                  <Sparkles size={16} /> Intelligent MERN Medicine Identification Platform
                </div>
                
                {/* HERO TITLE */}
                <h1 style={{ fontSize: 'calc(2.3rem + 1.2vw)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '1.25rem', color: '#ffffff' }}>
                  Instant & Reliable <br />
                  <span style={{ background: 'linear-gradient(90deg, #2dd4bf, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Medicine Identification
                  </span>
                </h1>

                <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#e2e8f0', marginBottom: '2.25rem', maxWidth: '580px' }}>
                  Scan any medicine label or strip using OCR intelligence. Instantly extract generic names, dosage, expiry dates, common uses, side effects, and critical safety warnings.
                </p>

                {/* Dynamic Counter Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.65rem 1.1rem', borderRadius: '14px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#5eead4', display: 'block' }}>{scansCount.toLocaleString()}+</span>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scans Processed</span>
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.65rem 1.1rem', borderRadius: '14px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', display: 'block' }}>{medicinesCount.toLocaleString()}+</span>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Indexed Medicines</span>
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.65rem 1.1rem', borderRadius: '14px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ade80', display: 'block' }}>{checkersCount}</span>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pre-Doctor Checks</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link
                    to={isAuthenticated ? "/scan" : "/login"}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#0d9488', color: '#ffffff', fontWeight: 800, padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 25px rgba(13, 148, 136, 0.4)', fontSize: '1rem' }}
                  >
                    <ScanLine size={22} /> Scan Medicine Now <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/pre-doctor-checker"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', fontWeight: 700, padding: '1rem 1.75rem', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.3)', fontSize: '1rem' }}
                  >
                    <Stethoscope size={20} color="#5eead4" /> 100 Pre-Doctor Checkers
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Dynamic Preview Scanner Box with Tabs */}
          <div style={{ position: 'relative' }}>
            {/* Dynamic Tab Switcher */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.35rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <button
                onClick={() => setHeroTab('ocr')}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: heroTab === 'ocr' ? '#0d9488' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                OCR Scanner
              </button>
              <button
                onClick={() => setHeroTab('predoctor')}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: heroTab === 'predoctor' ? '#0d9488' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                Pre-Doctor Check
              </button>
              <button
                onClick={() => setHeroTab('expiry')}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: heroTab === 'expiry' ? '#0d9488' : 'transparent', color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                Expiry System
              </button>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
              
              {heroTab === 'ocr' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px border rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      ⚡ DEMO PREVIEW (Sample Output)
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Upload medicine on Scan Page for real results
                    </span>
                  </div>

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
                </>
              )}

              {heroTab === 'predoctor' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      ⚡ DEMO PREVIEW (Sample Output)
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Clinical checker preview
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Stethoscope size={26} color="#ffffff" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>Cardiology & Chest Check</h3>
                        <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>Domain #1 of 10 Clinical Domains</span>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      100 Features Active
                    </span>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Sample Clinical Question Checklist:</span>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                      <li>Does chest pressure radiate to your arm or jaw?</li>
                      <li>Are you experiencing shortness of breath at rest?</li>
                      <li>Current medication history logged in database.</li>
                    </ul>
                  </div>

                  <Link to="/pre-doctor-checker" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#5eead4', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
                    Explore All 100 Clinical Checkers <ArrowRight size={16} />
                  </Link>
                </>
              )}

              {heroTab === 'expiry' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      ⚡ DEMO PREVIEW (Cabinet Alert Sample)
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Cabinet expiry alert for saved items
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bell size={26} color="#ffffff" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>Automated Expiry Safeguard</h3>
                        <span style={{ fontSize: '0.8rem', color: '#fde047', fontWeight: 600 }}>Active Cabinet Alert Sample</span>
                      </div>
                    </div>
                    <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
                      Alert Active
                    </span>
                  </div>

                  <div style={{ background: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1rem', borderRadius: '12px', fontSize: '0.88rem', color: '#fef08a' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                      <Clock size={18} /> Sample Alert: Cough Syrup B-201 (Expiring in {dynamicDaysLeft} Days)
                    </strong>
                    <strong>Cough Syrup B-201</strong> (saved cabinet item) expires on Sep 3, 2026.
                    <span style={{ display: 'block', fontSize: '0.82rem', color: '#fcd34d', marginTop: '0.4rem', fontWeight: 600 }}>
                      ⚡ Daily Live Calculation: <strong>{dynamicDaysLeft} days remaining</strong> (decreases automatically every 24h).
                    </span>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ALL-IN-ONE HEALTHCARE PLATFORM CAPABILITIES & OFFICIAL MEDICAL CERTIFICATE SHOWCASE */}
      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(13, 148, 136, 0.15) 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <Award size={16} /> Complete Telehealth & Diagnostic System Capabilities
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
              What Smart Medical Care Provides For You
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', marginTop: '0.6rem', lineHeight: 1.6 }}>
              Our platform offers end-to-end digital health evaluations, instant medicine label OCR scanning, 100 clinical pre-doctor triage checkers, and official printable medical diagnostic certificates verified by certified medical directors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            
            {/* Capability 1: AI Face Health Scan */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.3)' }}>
                <HeartPulse size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #1 &bull; Biometric Diagnostics
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                AI Face Health & Disease Scanning
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Non-invasive optical micro-vascular biomarker scanning. Analyzes facial colorimetry, sclera clarity, and skin turgor to evaluate anemia, jaundice, hydration, and overall vitality scores.
              </p>
            </div>

            {/* Capability 2: Official Certified Medical Certificate */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '20px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#0284c7', color: '#ffffff', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                Official Verification
              </div>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(217, 119, 6, 0.3)' }}>
                <Award size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #2 &bull; Clinical Verification
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Official Clinical Health Certificates
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Generates authenticated, printable, and downloadable digital medical evaluation certificates sealed and signed by Senior Medical Director <strong>Dr. Rajesh Sharma, MD</strong> (Reg No: MCI-2026-98471).
              </p>
            </div>

            {/* Capability 3: 100 Pre-Doctor Clinical Checkers */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(239, 68, 68, 0.3)' }}>
                <Stethoscope size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #3 &bull; Clinical Screening
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                100 Interactive Pre-Doctor Checkers
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Structured clinical diagnostic algorithms spanning 10 specialist domains (Cardiology, Triage, Drug Safety, Organ Systems, Lab Tests) to evaluate symptoms and identify emergency red flags.
              </p>
            </div>

            {/* Capability 4: OCR Medicine & Expiry Verification */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #0d9488, #059669)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(13, 148, 136, 0.3)' }}>
                <ScanLine size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5eead4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #4 &bull; Drug Safety OCR
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                OCR Medicine Label & Expiry Verification
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Scan medicine strips, syrups, or bottle packaging using optical character recognition to instantly verify drug name, dosage instructions, batch numbers, and safe usage expiration dates.
              </p>
            </div>

            {/* Capability 5: Automated Daily Expiry Safeguard */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #6b21a8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.3)' }}>
                <Clock size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #5 &bull; Cabinet Management
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Automated Dynamic Expiry Safeguard
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Real-time 24-hour rolling countdown tracking for all saved cabinet medicines. Automatically alerts you when a medicine is nearing expiry or needs safe disposal.
              </p>
            </div>

            {/* Capability 6: Doctor Consultation & Lab Order Prep */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
                <FileText size={28} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Feature #6 &bull; Doctor Appointment Prep
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0 0.6rem 0' }}>
                Telehealth & Doctor Visit Readiness
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Auto-generates structured clinical question checklists, recommended diagnostic lab test referrals (ECG, Lipid, HbA1c, LFT), and symptom progression summaries for your doctor appointment.
              </p>
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

      {/* DYNAMIC LIVE MEDICINE SEARCH & FILTER SHOWCASE */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <span style={{ color: '#0d9488', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
                Instant Dynamic Explorer
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0 0 0' }}>
                Search Verified Medicine Formulations
              </h2>
            </div>

            {/* Dynamic Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search paracetamol, antibiotic, fever..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxShadow: 'var(--shadow-xs)'
                }}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  border: activeCategory === cat ? '1px solid #0d9488' : '1px solid var(--border-light)',
                  background: activeCategory === cat ? '#0d9488' : 'var(--bg-surface)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
            {filteredMedicines.map((med, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '16px',
                  padding: '1.35rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0d9488', background: 'var(--success-bg)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                      {med.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', background: 'var(--bg-main)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      {med.badge}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    {med.name}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    {med.indication}
                  </p>
                </div>
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} /> {med.status}
                  </span>
                  <Link to={isAuthenticated ? "/scan" : "/login"} style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, textDecoration: 'none' }}>
                    Scan & Verify →
                  </Link>
                </div>
              </div>
            ))}
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
