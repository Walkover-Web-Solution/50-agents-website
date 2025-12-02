'use client';

import { Container } from '@mui/material';
import AnimatedSection from '../../../../components/AnimatedSection';

interface GetStartedSectionProps {
  serviceName: string;
}

export default function GetStartedSection({ serviceName }: GetStartedSectionProps) {
  const handleStartFree = () => {
    window.location.href = '/org';
  };

  return (
    <div className="w-full cont" style={{ backgroundColor: 'transparent' }}>
      <AnimatedSection>
        <Container maxWidth="xl" className="px-4 md:px-8">
          <div>
            <h2 className="h2">Get Started with the {serviceName} AI Agent</h2>

            <div className="mb-8">
              <p className="sub__h2">
                Your AI Agent is ready to help you work smarter and faster in {serviceName}. Start using it today and
                experience how effortless getting things done can be.
              </p>
            </div>

            <div>
              <button onClick={handleStartFree} className="transition-all duration-300 hover:scale-105 btn btn-primary">
                Start Free
              </button>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
