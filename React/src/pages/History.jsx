import React, { useState, useEffect } from 'react';
import { historyService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import Footer from '../components/common/Footer';
import { History as HistoryIcon, Trash2, Eye, Calendar, AlertTriangle, CheckCircle2, X } from 'lucide-react';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedScan, setSelectedScan] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await historyService.getScanHistory();
      if (res.data.success) {
        setHistoryItems(res.data.history || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch scan history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this scan entry from your history?')) return;
    try {
      const res = await historyService.deleteHistoryItem(id);
      if (res.data.success) {
        setHistoryItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert('Failed to delete history item.');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear your entire scan history? This action cannot be undone.')) return;
    try {
      const res = await historyService.clearHistory();
      if (res.data.success) {
        setHistoryItems([]);
      }
    } catch (err) {
      alert('Failed to clear scan history.');
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* Banner Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>
              Digital Scan Logs & History
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
              Complete audit trail of all previous medicine scans performed by your account.
            </p>
          </div>

          {historyItems.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: '#ef4444', padding: '0.6rem 1.1rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
            >
              <Trash2 size={16} /> Clear All History
            </button>
          )}
        </div>

        {error && <Alert type="danger" message={error} />}

        {loading ? (
          <LoadingSpinner text="Fetching scan history records..." />
        ) : historyItems.length === 0 ? (
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '3.5rem 1.5rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <HistoryIcon size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>No History Records</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              You haven't scanned any medicine images yet.
            </p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Medicine Label</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Scan Date & Time</th>
                    <th style={{ padding: '1rem 1.5rem' }}>OCR Status</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Confidence</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyItems.map((item) => (
                    <tr key={item._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {item.identifiedMedicine?.name || item.imageName || 'Scanned Item'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>
                        {new Date(item.scanDate).toLocaleDateString()} at {new Date(item.scanDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '12px', background: item.status === 'identified' ? 'var(--success-bg)' : 'var(--danger-bg)', color: item.status === 'identified' ? 'var(--success-text)' : 'var(--danger-text)' }}>
                          {item.status === 'identified' ? 'Identified' : 'Unidentified'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {item.confidenceScore ? `${item.confidenceScore}%` : 'N/A'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setSelectedScan(item)}
                            style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #0284c7', background: 'var(--info-bg)', color: '#0284c7', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                          >
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid var(--danger-border)', background: 'var(--danger-bg)', color: '#ef4444', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Selected Scan Modal */}
        {selectedScan && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', maxWidth: '580px', width: '100%', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Scan Log Details
                </h3>
                <button onClick={() => setSelectedScan(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Medicine Name</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)', display: 'block', marginTop: '0.2rem' }}>
                    {selectedScan.identifiedMedicine?.name || 'Unidentified Item'}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Raw OCR Extracted Text</span>
                  <div style={{ background: 'var(--bg-main)', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-light)', marginTop: '0.35rem', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    {selectedScan.rawExtractedText || 'No text extracted.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default History;
