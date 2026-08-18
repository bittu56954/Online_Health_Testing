import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/api';
import { User, Mail, Lock, Shield, Phone, FileText, Save, KeyRound, LogOut, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Footer from '../components/common/Footer';

const Profile = () => {
  const { user, updateUserProfile, logoutUser } = useAuth();
  const { showToast } = useToast();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    medicalNotes: user?.medicalNotes || ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await authService.updateProfile(profileData);
      if (res.data.success) {
        updateUserProfile(res.data.user);
        showToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      if (res.data.success) {
        showToast('Password changed successfully!', 'success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password.', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>
            Account & Profile Settings
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
            Manage your personal profile details, medical notes, and account security credentials.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Personal Information Form */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={22} color="#0284c7" /> Personal Information
            </h2>

            <form onSubmit={handleProfileSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Email Address (Read-Only)
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    style={{ width: '100%', paddingLeft: '2.6rem', background: 'var(--bg-main)', cursor: 'not-allowed', color: 'var(--text-muted)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    placeholder="Enter Your Number"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Personal Medical & Allergy Notes
                </label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '14px', top: '16px', color: 'var(--text-muted)' }} />
                  <textarea
                    rows="3"
                    placeholder="Enter Your Blood group"
                    value={profileData.medicalNotes}
                    onChange={(e) => setProfileData({ ...profileData, medicalNotes: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem', resize: 'vertical' }}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingProfile}
                style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', cursor: updatingProfile ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}
              >
                {updatingProfile ? <span className="spinner"></span> : <><Save size={18} /> Update Profile Info</>}
              </button>
            </form>
          </div>

          {/* Right Column: Security & Change Password */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyRound size={22} color="#0d9488" /> Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Your Password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  New Password (min 6 characters)
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Your Password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter Your Confirm Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    style={{ width: '100%', paddingLeft: '2.6rem', paddingRight: '2.6rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingPassword}
                style={{ width: '100%', padding: '0.85rem', background: '#0d9488', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', cursor: updatingPassword ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)' }}
              >
                {updatingPassword ? <span className="spinner"></span> : <><KeyRound size={18} /> Update Password</>}
              </button>
            </form>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              <button
                onClick={logoutUser}
                style={{ width: '100%', padding: '0.85rem', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: '#ef4444', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <LogOut size={18} /> Sign Out of All Sessions
              </button>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
