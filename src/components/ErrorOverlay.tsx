"use client"

import React from 'react';
import { createRoot } from 'react-dom/client';

interface ErrorOverlayProps {
  status: number;
  onClose: () => void;
}

const ErrorOverlayComponent: React.FC<ErrorOverlayProps> = ({ status, onClose }) => {
  const handleBack = () => {
    onClose();
    history.back();
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  return (
    <div
      className="fixed inset-0 w-full h-screen flex flex-col items-start justify-center px-12 z-[9999]"
    >
      <h1 className="h1">{status} : RETURN TO HOMEPAGE.</h1>
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleBack}
          className="btn btn-primary transition-all duration-300 hover:scale-105"
        >
          ← Back
        </button>
        <button
          onClick={handleHome}
          className="btn btn-outline"
        >
          🏠 Go to home
        </button>
      </div>
    </div>
  );
};

export const showErrorOverlay = (status: number) => {
  if (typeof window === 'undefined') return;

  // Remove existing overlay if present
  const existing = document.getElementById('api-error-overlay');
  if (existing) existing.remove();

  // Create container for React component
  const container = document.createElement('div');
  container.id = 'api-error-overlay';
  document.body.appendChild(container);

  // Create React root and render component
  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  root.render(React.createElement(ErrorOverlayComponent, { status, onClose: handleClose }));
};
