import React from 'react';
import { Pill, Calendar, Building, Trash2, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';

const MedicineCard = ({ medicine, onView, onDelete }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'expired':
        return 'badge-expired';
      case 'expiring_soon':
        return 'badge-expiring_soon';
      default:
        return 'badge-valid';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'expired':
        return <AlertTriangle size={14} />;
      case 'expiring_soon':
        return <AlertTriangle size={14} />;
      default:
        return <CheckCircle2 size={14} />;
    }
  };

  const formatStatusText = (status) => {
    switch (status) {
      case 'expired':
        return 'Expired';
      case 'expiring_soon':
        return 'Expiring Soon';
      default:
        return 'Valid / Safe';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="flex-between" style={{ marginBottom: '0.8rem' }}>
        <div className="flex-gap-1" style={{ color: '#0284c7' }}>
          <Pill size={22} />
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>{medicine.name}</h3>
        </div>
        <span className={`badge ${getBadgeClass(medicine.status)}`}>
          {getStatusIcon(medicine.status)}
          {formatStatusText(medicine.status)}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
        <strong>Generic:</strong> {medicine.genericName || 'N/A'}
      </p>

      <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.5rem 0 1rem' }}>
        <div className="flex-gap-1">
          <Building size={15} color="#94a3b8" />
          <span>{medicine.manufacturer || 'Unknown Manufacturer'}</span>
        </div>
        <div className="flex-gap-1">
          <Calendar size={15} color="#94a3b8" />
          <span>Exp Date: <strong>{medicine.expDate ? new Date(medicine.expDate).toLocaleDateString() : 'N/A'}</strong></span>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onView(medicine)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          <Eye size={15} /> View Details
        </button>
        {onDelete && (
          <button onClick={() => onDelete(medicine._id)} className="btn btn-outline-danger btn-sm">
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
