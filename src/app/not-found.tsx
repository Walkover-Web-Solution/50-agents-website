"use client"

import { useEffect } from 'react';
import { showErrorOverlay } from '@/components/ErrorOverlay';

export default function NotFound() {
  useEffect(() => {
    showErrorOverlay(404);
  }, []);

  return null;
}
