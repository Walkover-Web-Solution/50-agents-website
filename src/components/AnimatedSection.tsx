'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Fade } from '@mui/material';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref}>
      <Fade in={inView} timeout={300} style={{ transitionDelay: `${delay}ms` }}>
        <Box>{children}</Box>
      </Fade>
    </Box>
  );
}
