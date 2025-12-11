'use client';

import { AutoAwesome, PlayArrow } from '@mui/icons-material';
import { Container } from '@mui/material';
import AnimatedSection from '../../../../components/AnimatedSection';

interface PluginIntegration {
  name: string;
  description: string;
  parameters?: any[];
  type?: string;
}

interface WhatYouCanDoSectionProps {
  serviceName: string;
  integrations: PluginIntegration[];
  iconUrl?: string;
}

const getActionIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'action':
      return <PlayArrow sx={{ fontSize: 18 }} />;
    default:
      return <AutoAwesome sx={{ fontSize: 18 }} />;
  }
};

export default function WhatYouCanDoSection({ serviceName, integrations, iconUrl = '' }: WhatYouCanDoSectionProps) {
  // Only show actions
  const actions = integrations.filter(integration => integration.type?.toLowerCase() === 'action' || !integration.type);

  const handleConnectService = () => {
    window.location.href = '/org';
  };

  return (
    <div className="w-full relative">
      <AnimatedSection>
        <div className="container">
          <div className="px-6 md:px-12 cont border border-dark border-t-0 border-b-0">
            <div className="text-center mb-12">
              <h2 className="h2">What You Can Do with the {serviceName} AI Agent</h2>
              <p className="sub__h2 max-w-3xl mx-auto">
                From simple operations to advanced tasks, it can handle every action the app supports — quickly,
                accurately, and on demand.
              </p>
            </div>

            {actions && actions.length > 0 && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="h3">Available Actions</h3>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {actions.map((integration, index) => (
                      <AnimatedSection key={index} delay={index * 20}>
                        <div className="group relative">
                          {/* Card */}
                          <div className="relative flex flex-col h-[180px] bg-gray-light border border-light rounded-xl p-5 backdrop-blur-sm transition-all duration-200 hover:!border-gray-400/50">
                            {/* Icon and badge */}
                            <div className="flex items-center justify-between mb-4">
                              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-black rounded-lg flex items-center justify-center shadow-lg">
                              {getActionIcon(integration.type || 'action')}
                            </div> */}
                              <img
                                src={iconUrl}
                                alt={`${serviceName} icon`}
                                className="w-8 h-8 rounded-md object-cover mr-4 shadow-sm"
                              />
                            </div>

                            {/* Content */}
                            <h4 className="font-bold text-black mb-1 text-base leading-tight group-hover:!text-gray-900 transition-colors duration-200">
                              {integration.name}
                            </h4>

                            <p className="line-clamp-3 text-gray-light text-sm leading-relaxed flex-grow group-hover:!text-gray-600 transition-colors duration-200">
                              {integration.description || `Intelligent ${integration.name} automation powered by AI`}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      <div className="divider" />

      {/* CTA Section */}
      <div className="container">
        <div className="text-center border border-t-0 border-b-0 border-dark py-20 px-6">
          <div className="max-w-3xl m-auto bg-base rounded-2xl p-6 md:p-12 border border-dark h-[300px] flex flex-col items-center justify-center">
            <p className="sub__h1 mb-6">
              Just connect your {serviceName} account, and your AI Agent is ready to perform actions instantly.
            </p>
            <div className="flex justify-center">
              <button
                className="btn btn-primary transition-all duration-300 hover:scale-105"
                data-tally-open="3NKeZl"
                data-tally-overlay="1"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
              >
                <span className="relative z-10">Connect your {serviceName}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
