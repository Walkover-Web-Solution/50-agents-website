'use client';

import AnimatedSection from '../../../../components/AnimatedSection';
import WebsiteButton from './WebsiteButton';

interface AboutSectionProps {
  serviceName: string;
  description: string;
  iconUrl?: string;
  domain: string;
}

export default function AboutSection({ serviceName, description, iconUrl, domain }: AboutSectionProps) {
  if (!description) {
    return null;
  }
  return (
    <div className="w-full container">
      <AnimatedSection>
        <div className="px-6 md:px-12 cont border border-dark border-t-0 border-b-0">
          <div>
            <div className="text-center mb-8">
              <h2 className="h2">About {serviceName}</h2>
              <div className="w-20 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-base rounded-2xl p-6 md:p-12 border border-dark">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {iconUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={iconUrl}
                        alt={`${serviceName} icon`}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-xs"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="sub__h2 space-y-4">
                      {description ? (
                        <div>
                          {description.split('\n').map(
                            (paragraph, index) =>
                              paragraph.trim() && (
                                <p key={index} className="mb-4 last:mb-0">
                                  {paragraph.trim()}
                                </p>
                              )
                          )}
                        </div>
                      ) : (
                        <p className="italic text-gray-dark">No description available for {serviceName}.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Website Button */}
                <div className="pt-6 border-t border-light">
                  <div className="flex items-center justify-center">
                    <WebsiteButton domain={domain} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
