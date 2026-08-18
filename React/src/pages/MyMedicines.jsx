import React, { useState, useEffect } from 'react';
import { medicineService } from '../services/api';
import MedicineCard from '../components/common/MedicineCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import Footer from '../components/common/Footer';
import { Search, Filter, Pill, X, ShieldAlert, AlertTriangle, PackageCheck } from 'lucide-react';

const MyMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await medicineService.getUserMedicines();
      if (res.data.success) {
        setMedicines(res.data.medicines || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch saved medicines.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine record?')) return;

    try {
      const res = await medicineService.deleteMedicine(id);
      if (res.data.success) {
        setMedicines((prev) => prev.filter((m) => m._id !== id));
        if (selectedMedicine && selectedMedicine._id === id) {
          setSelectedMedicine(null);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete medicine.');
    }
  };

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || med.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        
        {/* Title Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.5px' }}>
              My Home Medicine Cabinet
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
              Manage your saved medications, check safety indications, and filter by expiration status.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Total Items: <span style={{ color: '#0284c7' }}>{medicines.length}</span>
          </div>
        </div>

        {error && <Alert type="danger" message={error} />}

        {/* Filter and Search Bar */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: '20px', padding: '1.25rem 1.5rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, generic formula, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '2.6rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={18} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status:</span>
            {[
              { key: 'all', label: 'All Items' },
              { key: 'valid', label: 'Valid / Safe' },
              { key: 'expiring_soon', label: 'Expiring Soon' },
              { key: 'expired', label: 'Expired' }
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilterStatus(btn.key)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '10px',
                  border: filterStatus === btn.key ? '1px solid #0284c7' : '1px solid var(--border-light)',
                  background: filterStatus === btn.key ? 'var(--info-bg)' : 'var(--bg-main)',
                  color: filterStatus === btn.key ? '#0284c7' : 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        {loading ? (
          <LoadingSpinner text="Fetching medicine cabinet..." />
        ) : filteredMedicines.length === 0 ? (
          <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', padding: '3.5rem 1.5rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <Pill size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>No Medicines Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
              {searchTerm || filterStatus !== 'all' ? 'No items match your active search filter.' : 'Scan and save your home medicines to build your cabinet.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {filteredMedicines.map((med) => (
              <MedicineCard
                key={med._id}
                medicine={med}
                onDelete={handleDelete}
                onViewDetails={(m) => setSelectedMedicine(m)}
              />
            ))}
          </div>
        )}

        {/* Medicine Detail Modal */}
        {selectedMedicine && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', maxWidth: '640px', width: '100%', padding: '2rem', maxHeight: '85vh', overflowY: 'auto', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{selectedMedicine.name}</h3>
                  <span style={{ fontSize: '0.9rem', color: '#0d9488', fontWeight: 700 }}>Generic: {selectedMedicine.genericName}</span>
                </div>
                <button onClick={() => setSelectedMedicine(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7', margin: '0 0 0.35rem 0' }}>Strength & Dosage</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)' }}>{selectedMedicine.strength || 'N/A'}</p>
                </div>

                {selectedMedicine.problemsTreated && selectedMedicine.problemsTreated.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d9488', margin: '0 0 0.5rem 0' }}>All Treatable Problems & Conditions</h4>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {selectedMedicine.problemsTreated.map((pt, idx) => (
                        <div key={idx} style={{ background: 'var(--bg-main)', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                          <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>{pt.condition}</strong>
                          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pt.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7', margin: '0 0 0.35rem 0' }}>Primary Uses & Indications</h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    {selectedMedicine.uses?.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>

                {selectedMedicine.mechanism && (
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0284c7', margin: '0 0 0.35rem 0' }}>Mechanism of Action</h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{selectedMedicine.mechanism}</p>
                  </div>
                )}

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#d97706', margin: '0 0 0.35rem 0' }}>Side Effects</h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    {selectedMedicine.sideEffects?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d9488', margin: '0 0 0.35rem 0' }}>Precautions</h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    {selectedMedicine.precautions?.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 0.35rem 0' }}>Storage Instructions</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)' }}>{selectedMedicine.storage}</p>
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

export default MyMedicines;
