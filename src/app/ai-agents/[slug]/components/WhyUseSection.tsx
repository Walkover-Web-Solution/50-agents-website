import { CheckCircle } from '@mui/icons-material';
import { Container } from '@mui/material';
import AnimatedSection from './AnimatedSection';

interface WhyUseSectionProps {
  serviceName: string;
}

const benefits = ['No constant switching.', 'No wasted time.', `Just a simpler, faster way to use {serviceName}.`];

export default function WhyUseSection({ serviceName }: WhyUseSectionProps) {
  return (
    <div className="w-full cont backdrop-blur-sm" style={{ backgroundColor: 'transparent' }}>
      <Container maxWidth="xl" className="px-4 md:px-8">
        <div>
          <h2 className="h2">Why Use the {serviceName} AI Agent?</h2>

          <div className="mb-8">
            <p className="sub__h2 mb-4 max-w-3xl">
              The {serviceName} AI Agent helps you move past the repetitive, tiring parts of work. It takes care of
              actions that normally slow you down, so you can focus on the things that matter.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div
                  className="flex items-center p-1 w-fit"
                  // style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-dark font-medium text-base">
                    {benefit.replace('{serviceName}', serviceName)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
