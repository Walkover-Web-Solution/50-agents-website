'use client';

import React, { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Alert, AlertTitle, IconButton, Box, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Toast {
  id: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  open?: boolean;
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

class ToastManager {
  private toasts: Toast[] = [];
  private container: HTMLDivElement | null = null;
  private root: Root | null = null;

  constructor() {
    // Only initialize on the client side
    if (typeof document !== 'undefined') {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.root = createRoot(this.container);
    }
  }

  addToast(toast: Omit<Toast, 'id'>) {
    const id = new Date().getTime().toString() + Math.random().toString();
    this.toasts = [...this.toasts, { ...toast, id, open: true }];
    this.update();

    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration || 3000);
  }

  removeToast(id: string) {
    // Trigger close animation
    this.toasts = this.toasts.map(toast => (toast.id === id ? { ...toast, open: false } : toast));
    this.update();

    // Remove toast from list after animation
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.update();
    }, 300); // Match the animation duration
  }

  update() {
    if (this.root) {
      this.root.render(<ToastContainer toasts={this.toasts} removeToast={id => this.removeToast(id)} />);
    }
  }

  cleanup() {
    if (this.container && this.root) {
      this.root.unmount();
      document.body.removeChild(this.container);
      this.container = null;
      this.root = null;
    }
  }
}

const toastManager = new ToastManager();

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => (
  <Box
    className="flex flex-col fixed gap-1 "
    sx={{
      bottom: 16,
      left: 16,
      zIndex: 9999,
    }}
  >
    {toasts.map(toast => (
      <Slide
        key={toast.id}
        direction="right"
        in={toast.open}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 300, exit: 100 }}
      >
        <Alert
          variant="filled"
          severity={toast.severity}
          action={
            <IconButton color="inherit" size="small" onClick={() => removeToast(toast.id)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 1, minWidth: '300px' }}
        >
          <AlertTitle>{toast.severity}</AlertTitle>
          {toast.message}
        </Alert>
      </Slide>
    ))}
  </Box>
);

export function showSnackbar(alert: Omit<Toast, 'id'>) {
  toastManager.addToast(alert);
}

export function successToast(message: string) {
  showSnackbar({ severity: 'success', message });
}

export function errorToast(message: string) {
  showSnackbar({ severity: 'error', message });
}

export function warningToast(message: string) {
  showSnackbar({ severity: 'warning', message });
}

export function infoToast(message: string) {
  showSnackbar({ severity: 'info', message });
}

// Cleanup ToastManager when the component is unmounted
export const ToastManagerCleanup: React.FC = () => {
  useEffect(() => {
    return () => {
      toastManager.cleanup();
    };
  }, []);
  return null;
};
