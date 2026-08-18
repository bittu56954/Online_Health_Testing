import React, { useState, useEffect } from 'react';
import { reminderService, medicineService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import Footer from '../components/common/Footer';
import { Bell, Plus, Trash2, Calendar, CheckCircle2, AlertTriangle, Clock, X } from 'lucide-react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New Reminder Modal State
  const [showModal, setShowModal] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderType, setReminderType] = useState('expiry');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [remRes, medRes] = await Promise.all([
        reminderService.getReminders(),
        medicineService.getUserMedicines()
      ]);

      if (remRes.data.success) setReminders(remRes.data.reminders || []);
      if (medRes.data.success) setMedicines(medRes.data.medicines || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reminders.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReminder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!medicineName || !reminderDate) {
      return setError('Please provide medicine name and reminder date.');
    }

    setSubmitting(true);
    try {
      const res = await reminderService.createReminder({
        medicineName,
        reminderDate,
        reminderType,
        notes
      });

      setSubmitting(false);

      if (res.data.success) {
        setSuccess('Reminder scheduled successfully!');
        setReminders((prev) => [...prev, res.data.reminder]);
        setShowModal(false);
        setMedicineName('');
        setReminderDate('');
        setNotes('');
      }
    } catch (err) {
      setSubmitting(false);
      setError(err.response?.data?.message || 'Failed to create reminder.');
    }
  };

  const handleDeleteReminder = async (id) => {
    if (!window.confirm('Delete this reminder schedule?')) return;
    try {
      const res = await reminderService.deleteReminder(id);
      if (res.data.success) {
        setReminders((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      alert('Failed to delete reminder.');
    }
  };

  const handleToggleStatus = async (reminder) => {
    const newStatus = reminder.status === 'completed' ? 'upcoming' : 'completed';
    try {
      const res = await reminderService.updateReminder(reminder._id, { status: newStatus });
      if (res.data.success) {
        setReminders((prev) =>
          prev.map((r) => (r._id === reminder._id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* Title Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>
              Medicine & Expiry Reminders
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
              Schedule automated alerts before medications expire or require dosage refills.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #0284c7, #0d9488)', color: '#ffffff', border: 'none', padding: '0.75rem 1.4rem', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)' }}
          >
            <Plus size={20} /> Add New Reminder
          </button>
        </div>

        {error && <Alert type="danger" message={error} />}
        {success && <Alert type="success" message={success} />}

        {/* Reminders List */}
        {loading ? (
          <LoadingSpinner text="Loading your scheduled alerts..." />
        ) : reminders.length === 0 ? (
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '3.5rem 1.5rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <Bell size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>No Scheduled Reminders</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              Click "Add New Reminder" to set alerts for expiring medicines.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {reminders.map((rem) => (
              <div
                key={rem._id}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '12px', background: rem.status === 'completed' ? 'var(--success-bg)' : 'var(--warning-bg)', color: rem.status === 'completed' ? 'var(--success-text)' : 'var(--warning-text)' }}>
                      {rem.reminderType || 'Expiry Alert'} • {rem.status}
                    </span>
                    <button
                      onClick={() => handleDeleteReminder(rem._id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                      title="Delete reminder"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                    {rem.medicineName}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    <Calendar size={16} color="#0284c7" /> Reminder Date: <strong style={{ color: 'var(--text-main)' }}>{new Date(rem.reminderDate).toLocaleDateString()}</strong>
                  </div>

                  {rem.notes && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic', background: 'var(--bg-main)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                      "{rem.notes}"
                    </p>
                  )}
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleToggleStatus(rem)}
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      background: rem.status === 'completed' ? 'var(--bg-main)' : 'var(--success-bg)',
                      color: rem.status === 'completed' ? 'var(--text-muted)' : 'var(--success-text)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <CheckCircle2 size={15} /> {rem.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Reminder Modal */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', maxWidth: '520px', width: '100%', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bell size={22} color="#0284c7" /> Schedule Expiry Reminder
                </h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleCreateReminder}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Medicine Name</label>
                  {medicines.length > 0 ? (
                    <select
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                      required
                      style={{ width: '100%' }}
                    >
                      <option value="">Select from My Medicines...</option>
                      {medicines.map((m) => (
                        <option key={m._id} value={m.name}>
                          {m.name} ({m.expDate ? `Exp: ${m.expDate}` : 'No Exp'})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      placeholder="Enter Medicine name "
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  )}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Reminder Date</label>
                  <input
                    type="date"
                    required
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Alert Type</label>
                  <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="expiry">Expiration Warning</option>
                    <option value="dosage">Dosage Alert</option>
                    <option value="refill">Cabinet Refill</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Notes / Instructions</label>
                  <input
                    type="text"
                    placeholder="Enter Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ padding: '0.7rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', background: 'var(--bg-main)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ padding: '0.7rem 1.5rem', borderRadius: '10px', border: 'none', background: '#0284c7', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {submitting ? 'Scheduling...' : 'Save Reminder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default Reminders;
