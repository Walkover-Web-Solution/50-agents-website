'use client';

import { Container } from '@mui/material';
import AnimatedSection from '../../../../components/AnimatedSection';
import EastIcon from '@mui/icons-material/East';

interface GetStartedSectionProps {
  serviceName: string;
}

export default function GetStartedSection({ serviceName }: GetStartedSectionProps) {
  const handleStartFree = () => {
    window.location.href = '/org';
  };

  return (
    <div className="w-full container">
      <AnimatedSection>
        <div className="cont border border-dark border-t-0 border-b-0 px-6 md:px-12">
          <div>
            <h2 className="h2">Get Started with the {serviceName} AI Agent</h2>

            <div className="mb-8">
              <p className="sub__h2">
                Your AI Agent is ready to help you work smarter and faster in {serviceName}. Start using it today and
                experience how effortless getting things done can be.
              </p>
            </div>

            <div>
              <button onClick={handleStartFree} className="transition-all duration-300 hover:scale-105 btn btn-primary group relative overflow-hidden">
                <span className="transition-transform duration-300 group-hover:-translate-x-3">Start Free</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
