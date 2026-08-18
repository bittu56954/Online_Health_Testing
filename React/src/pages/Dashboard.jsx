import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { medicineService, historyService, reminderService, authService, faceScanService } from '../services/api';
import FaceHealthScanner from '../components/dashboard/FaceHealthScanner';
import {
  Pill,
  ScanLine,
  PackageCheck,
  AlertTriangle,
  Clock,
  Bell,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  Trash2,
  Calendar,
  Sparkles,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Edit3,
  Heart,
  Shield,
  Save,
  X,
  FileText,
  BadgeCheck,
  UserCheck,
  Stethoscope,
  Activity,
  ShieldAlert,
  ChevronRight,
  Scan,
  Eye,
  HeartPulse
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [medicines, setMedicines] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // AI Face Scanner State
  const [showFaceScannerModal, setShowFaceScannerModal] = useState(false);
  const [faceScanHistory, setFaceScanHistory] = useState([]);

  // Edit Profile Modal state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    medicalNotes: user?.medicalNotes || ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    setFaceScanHistory(faceScanService.getFaceScans());
  }, []);

  const handleFaceScanCompleted = () => {
    setFaceScanHistory(faceScanService.getFaceScans());
  };

  const handleDeleteFaceScan = (id) => {
    faceScanService.deleteFaceScan(id);
    setFaceScanHistory(faceScanService.getFaceScans());
    if (showToast) showToast('Face scan report removed from history.', 'info');
  };

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        medicalNotes: user.medicalNotes || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [medRes, histRes, remRes] = await Promise.all([
          medicineService.getUserMedicines(),
          historyService.getScanHistory(),
          reminderService.getReminders()
        ]);

        if (medRes.data.success) setMedicines(medRes.data.medicines || []);
        if (histRes.data.success) setHistoryItems(histRes.data.history || []);
        if (remRes.data.success) setReminders(remRes.data.reminders || []);
      } catch (err) {
        console.warn('[MEDISCAN DASHBOARD] Failed to load statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await authService.updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
        medicalNotes: profileForm.medicalNotes
      });

      if (res.data.success) {
        updateUserProfile(res.data.user);
        setIsEditingProfile(false);
        if (showToast) showToast('Profile and personal details updated successfully!', 'success');
      }
    } catch (err) {
      if (showToast) showToast(err.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const totalMedicines = medicines.length;
  const recentlyScannedCount = historyItems.filter((h) => {
    const scanDate = new Date(h.scanDate);
    const now = new Date();
    const diffTime = Math.abs(now - scanDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

  const expiringSoonCount = medicines.filter((m) => m.expiryStatus === 'expiring_soon').length;
  const expiredCount = medicines.filter((m) => m.expiryStatus === 'expired').length;

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Welcome Header Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 60%, #0284c7 100%)', borderRadius: '24px', padding: '2.5rem', color: '#ffffff', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(13, 148, 136, 0.25)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, color: '#5eead4', marginBottom: '0.75rem' }}>
              <Sparkles size={16} /> Personal Health & Profile Dashboard
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px', color: '#ffffff' }}>
              Welcome back, {user?.name ? user.name : 'User'}! 👋
            </h1>
            <p style={{ margin: '0.4rem 0 0 0', color: '#e0f2fe', fontSize: '1.05rem', maxWidth: '600px' }}>
              Manage your personal patient profile, track home medicines, and monitor expiration alerts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowFaceScannerModal(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#0f172a', color: '#38bdf8', fontWeight: 800, padding: '0.9rem 1.6rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.4)', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
            >
              <Scan size={20} color="#38bdf8" /> AI Face Health & Disease Scan
            </button>
            <Link
              to="/scan"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#ffffff', color: '#0f172a', fontWeight: 800, padding: '0.9rem 1.6rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
            >
              <ScanLine size={20} color="#0d9488" /> Quick Scan Medicine
            </Link>
          </div>
        </div>

        {/* USER PROFILE & PERSONAL DETAILS CARD */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 54, height: 54, borderRadius: '16px', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)' }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {user?.name || 'Registered Patient'}
                  </h2>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'var(--success-bg)', color: 'var(--success-text)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                    <BadgeCheck size={14} /> {user?.isVerified ? 'Verified Member' : 'Pending OTP'}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  {user?.role === 'admin' ? 'Administrator' : 'Standard Resident / Patient Account'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--success-bg)', color: '#0d9488', border: '1px solid var(--success-border)', padding: '0.55rem 1.1rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <Edit3 size={16} /> Edit Personal Details
            </button>
          </div>

          {/* Profile Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={15} color="#0284c7" /> Email Address
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'block', wordBreak: 'break-all' }}>
                {user?.email || 'N/A'}
              </strong>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={15} color="#0d9488" /> Contact Phone
              </span>
              <strong style={{ fontSize: '1rem', color: user?.phone ? 'var(--text-main)' : 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                {user?.phone || 'Not specified'}
              </strong>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} color="#d97706" /> Member Since
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '0.35rem', display: 'block' }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently Joined'}
              </strong>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Heart size={15} color="#dc2626" /> Medical & Health Notes
              </span>
              <strong style={{ fontSize: '0.92rem', color: user?.medicalNotes ? 'var(--text-main)' : 'var(--text-muted)', marginTop: '0.35rem', display: 'block', lineHeight: 1.4 }}>
                {user?.medicalNotes || 'No medical notes or allergies added.'}
              </strong>
            </div>

          </div>
        </div>

        {/* EDIT PROFILE MODAL */}
        {isEditingProfile && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', maxWidth: '520px', width: '100%', padding: '2rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserCheck size={22} color="#0d9488" /> Edit Profile Details
                </h3>
                <button onClick={() => setIsEditingProfile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleProfileSave}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Medical & Allergy Notes</label>
                  <textarea
                    rows="3"
                    value={profileForm.medicalNotes}
                    onChange={(e) => setProfileForm({ ...profileForm, medicalNotes: e.target.value })}
                    placeholder="e.g. Penicillin Allergy, Blood Group O+, Emergency Contact: +1 (555) 999-0000"
                    style={{ width: '100%', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    style={{ padding: '0.7rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    style={{ padding: '0.7rem 1.5rem', borderRadius: '10px', border: 'none', background: '#0d9488', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Save size={16} /> {savingProfile ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI FACE HEALTH & DISEASE SCANNER CARD */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)',
            borderRadius: '24px',
            padding: '2.25rem',
            color: '#ffffff',
            boxShadow: '0 10px 30px rgba(2, 132, 199, 0.25)',
            marginBottom: '2.5rem',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ maxWidth: '720px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(56, 189, 248, 0.15)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '1rem'
                }}
              >
                <Scan size={16} /> AI Biometric Doctor Face Scanner
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
                Scan Your Face for AI Disease Indications & Health Status
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#e0f2fe', lineHeight: 1.6, margin: 0 }}>
                Uses real-time webcam micro-vascular facial biometrics and visual landmark detection to scan for anemia, ocular jaundice, facial erythema, edema fluid retention, fatigue syndrome, or 100% healthy fit status.
              </p>
            </div>

            <button
              onClick={() => setShowFaceScannerModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '1rem 1.85rem',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.05rem',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              <Scan size={22} /> Scan Face Now
            </button>
          </div>

          {/* RECENT FACE SCAN REPORTS LIST (If any) */}
          {faceScanHistory.length > 0 && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={16} /> Patient Face Health Diagnosis History ({faceScanHistory.length} Scans)
                </h4>
                <button
                  onClick={() => setShowFaceScannerModal(true)}
                  style={{ background: 'none', border: 'none', color: '#5eead4', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  + New Scan
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                {faceScanHistory.slice(0, 3).map((scan) => (
                  <div
                    key={scan._id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      border: `1px solid ${scan.isCompletelyHealthy ? '#059669' : 'rgba(217, 119, 6, 0.5)'}`,
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: scan.isCompletelyHealthy ? 'rgba(5, 150, 105, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                          color: scan.isCompletelyHealthy ? '#34d399' : '#fbbf24',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          border: `1px solid ${scan.isCompletelyHealthy ? '#059669' : '#d97706'}`
                        }}
                      >
                        {scan.isCompletelyHealthy ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />} {scan.statusTitle}
                      </span>
                      <button
                        onClick={() => handleDeleteFaceScan(scan._id)}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 2 }}
                        title="Delete report"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 0.75rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {scan.doctorSummary}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.5rem' }}>
                      <span>Score: <strong style={{ color: '#ffffff' }}>{scan.healthScore}%</strong></span>
                      <span>{new Date(scan.scanDate).toLocaleDateString()} at {new Date(scan.scanDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 100 PRE-DOCTOR CLINICAL CHECKERS HERO WIDGET */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1.5px solid rgba(2, 132, 199, 0.25)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ maxWidth: '750px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-surface)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: '#0284c7',
                  border: '1px solid var(--border-light)',
                  marginBottom: '0.85rem'
                }}
              >
                <Stethoscope size={16} /> 100 Pre-Doctor Health & Medicine Checkers
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
                Check Medical Symptoms & Drug Safety Before Your Doctor Visit
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Evaluate 100 clinical features across 10 medical domains including symptom triage, drug-drug interactions, chronic disease controls, red flags, lab test readiness, and tailored questions to present to your doctor.
              </p>
            </div>

            <Link
              to="/pre-doctor-checker"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                color: '#ffffff',
                fontWeight: 800,
                padding: '0.9rem 1.75rem',
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              Explore All 100 Features <ChevronRight size={20} />
            </Link>
          </div>

          {/* Quick-Access Domains Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <Link
              to="/pre-doctor-checker"
              style={{
                background: 'var(--bg-surface)',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>Symptom Triage</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>10 Features</span>
              </div>
            </Link>

            <Link
              to="/pre-doctor-checker"
              style={{
                background: 'var(--bg-surface)',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pill size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>Drug & Med Safety</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>10 Features</span>
              </div>
            </Link>

            <Link
              to="/pre-doctor-checker"
              style={{
                background: 'var(--bg-surface)',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>Emergency Red Flags</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>10 Features</span>
              </div>
            </Link>

            <Link
              to="/pre-doctor-checker"
              style={{
                background: 'var(--bg-surface)',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(13, 148, 136, 0.1)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>Doctor Prep & Labs</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>20 Features</span>
              </div>
            </Link>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Medicines</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>{totalMedicines}</div>
              <span style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 600 }}>Saved in collection</span>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'var(--info-bg)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PackageCheck size={26} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recently Scanned</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>{recentlyScannedCount}</div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>In last 7 days</span>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'var(--success-bg)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={26} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expiring Soon</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: '0.2rem' }}>{expiringSoonCount}</div>
              <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600 }}>Expires in 30 days</span>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'var(--warning-bg)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={26} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', borderRadius: '18px', padding: '1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expired Medicines</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginTop: '0.2rem' }}>{expiredCount}</div>
              <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600 }}>Do not consume!</span>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'var(--danger-bg)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pill size={26} />
            </div>
          </div>

        </div>

        {/* 2 Main Content Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

          {/* Left Column: Recent Scan History */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="#0284c7" /> Recent Scan History
              </h3>
              <Link to="/history" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284c7', textDecoration: 'none' }}>
                View All &rarr;
              </Link>
            </div>

            {loading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading recent scans...</p>
            ) : historyItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'var(--bg-main)', borderRadius: '14px', border: '1px dashed var(--border-light)' }}>
                <ScanLine size={36} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>No Medicine Scans Yet</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Upload a medicine image to see extracted details here.</p>
                <Link to="/scan" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', background: '#0d9488', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                  <ScanLine size={16} /> Scan Medicine
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {historyItems.slice(0, 5).map((item) => (
                  <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '10px', background: item.status === 'identified' ? 'var(--info-bg)' : 'var(--danger-bg)', color: item.status === 'identified' ? '#0284c7' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        <Pill size={20} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>{item.medicineName}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {new Date(item.scanDate).toLocaleDateString()} at {new Date(item.scanDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', background: item.status === 'identified' ? 'var(--success-bg)' : 'var(--danger-bg)', color: item.status === 'identified' ? 'var(--success-text)' : 'var(--danger-text)' }}>
                      {item.status === 'identified' ? 'Identified' : 'Unidentified'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Expiry & Reminders Summary */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} color="#0d9488" /> Active Expiry Reminders
              </h3>
              <Link to="/reminders" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0d9488', textDecoration: 'none' }}>
                Manage All &rarr;
              </Link>
            </div>

            {loading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading reminders...</p>
            ) : reminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'var(--bg-main)', borderRadius: '14px', border: '1px dashed var(--border-light)' }}>
                <Bell size={36} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>No Active Reminders</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Set reminder dates to get alerted before your medicines expire.</p>
                <Link to="/reminders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', background: '#0284c7', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                  <PlusCircle size={16} /> Add Reminder
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {reminders.slice(0, 5).map((rem) => (
                  <div key={rem._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--warning-bg)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bell size={20} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>{rem.medicineName}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Reminder: {new Date(rem.reminderDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', background: rem.status === 'completed' ? 'var(--success-bg)' : 'var(--warning-bg)', color: rem.status === 'completed' ? 'var(--success-text)' : 'var(--warning-text)' }}>
                      {rem.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* AI FACE HEALTH SCANNER MODAL */}
      {showFaceScannerModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2500, padding: '1.5rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <FaceHealthScanner
              onClose={() => setShowFaceScannerModal(false)}
              onScanComplete={handleFaceScanCompleted}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
