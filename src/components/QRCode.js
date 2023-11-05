import React from 'react';

export default function QRCode({ qrUrl }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
      <img src={qrUrl} alt="QR Code" style={{ maxWidth: '80%', maxHeight: '80vh' }} />
    </div>
  );
}